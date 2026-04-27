// ===== JeevanAid Supabase Client =====
const SUPABASE_URL = 'https://uzfbjrpgpvawguyhngeg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6ZmJqcnBncHZhd2d1eWhuZ2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODU5MzYsImV4cCI6MjA5Mjg2MTkzNn0.LIwgn_rS2BlcG-28CGw4kG3gYigbJEdS_XEN5QBuKSw';
const GEMINI_API_KEY = 'AIzaSyDf38wLMZ_BxhSL2DznkJkldcXSw6ArkmI';

let _sbClient = null;

function initSupabase() {
  if (!_sbClient) {
    const sb = window.supabase;
    if (sb && sb.createClient) {
      _sbClient = sb.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
      console.error('Supabase CDN not loaded yet');
    }
  }
  return _sbClient;
}

// ===== AUTH =====
async function signUp(email, password, fullName) {
  const sb = initSupabase();
  if (!sb) throw new Error('Supabase not loaded. Please check your internet connection.');
  
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  
  if (error) throw error;
  
  // Check if email confirmation is required
  if (data.user && !data.session) {
    // Email confirmation might be enabled — try signing in directly
    // (Supabase may auto-confirm for development)
    console.warn('No session returned from signUp. Email confirmation may be required.');
  }
  
  // Create profile record (non-blocking — may fail if RLS blocks it before session)
  if (data.user && data.session) {
    try {
      await sb.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        language: 'en',
        created_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Profile upsert deferred:', e.message);
    }
  }
  
  return data;
}

async function signIn(email, password) {
  const sb = initSupabase();
  if (!sb) throw new Error('Supabase not loaded');
  
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signOut() {
  const sb = initSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}

async function getSession() {
  const sb = initSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session;
}

async function getUser() {
  const sb = initSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user;
}

// ===== PROFILE =====
async function getProfile(userId) {
  const sb = initSupabase();
  if (!sb) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', userId).single();
  return data;
}

async function updateProfile(userId, updates) {
  const sb = initSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('profiles').update(updates).eq('id', userId);
  if (error) throw error;
  return data;
}

// ===== FAMILY VAULT =====
async function getFamilyMembers(userId) {
  const sb = initSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('family_members').select('*').eq('user_id', userId).order('created_at');
  if (error) { console.error('Fetch family error:', error); return []; }
  return data || [];
}

async function addFamilyMember(userId, member) {
  const sb = initSupabase();
  if (!sb) throw new Error('Supabase not loaded');
  const { data, error } = await sb.from('family_members').insert({
    user_id: userId,
    name: member.name,
    relation: member.relation,
    blood_group: member.blood_group,
    conditions: member.conditions,
    allergies: member.allergies,
    created_at: new Date().toISOString()
  }).select();
  if (error) throw error;
  return data;
}

async function updateFamilyMember(memberId, updates) {
  const sb = initSupabase();
  if (!sb) throw new Error('Supabase not loaded');
  const { data, error } = await sb.from('family_members').update(updates).eq('id', memberId).select();
  if (error) throw error;
  return data;
}

async function deleteFamilyMember(memberId) {
  const sb = initSupabase();
  if (!sb) throw new Error('Supabase not loaded');
  const { error } = await sb.from('family_members').delete().eq('id', memberId);
  if (error) throw error;
}

// ===== GEMINI AI =====
async function askGemini(prompt, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      responseMimeType: "application/json"
    }
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${res.status} - ${errText}`);
  }
  
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from Gemini');
  
  try {
    return JSON.parse(text);
  } catch (e) {
    return { raw: text };
  }
}

async function analyzeSymptoms(symptoms, language) {
  const langMap = { hi: 'Hindi', kn: 'Kannada', en: 'English' };
  const lang = langMap[language] || 'English';
  const systemInstruction = `You are a medical first-aid AI assistant for the JeevanAid app in India. 
Analyze the user's symptoms and respond in ${lang}. 
Return JSON with this exact structure:
{
  "condition": "likely condition name",
  "urgency": "red" or "amber" or "green",
  "urgency_label": "URGENT" or "MODERATE" or "LOW RISK",
  "description": "brief description of the condition",
  "actions": ["action step 1", "action step 2", "action step 3"],
  "warning": "when to seek immediate help",
  "disclaimer": "This is AI-powered guidance only. Always consult a qualified doctor."
}
urgency red = life threatening, amber = needs attention, green = manageable at home.`;
  
  return await askGemini(`Patient symptoms: ${symptoms}`, systemInstruction);
}

async function identifyMedicine(imageBase64) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const body = {
    contents: [{
      parts: [
        { text: "Identify this medicine/tablet/strip. Return JSON: {\"name\": \"\", \"generic_name\": \"\", \"dosage\": \"\", \"purpose\": \"\", \"side_effects\": [\"\"], \"warnings\": \"\", \"disclaimer\": \"Always consult a doctor before taking any medication.\"}" },
        { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
      ]
    }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
      responseMimeType: "application/json"
    }
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) throw new Error(`Gemini Vision error: ${res.status}`);
  
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  try { return JSON.parse(text); } catch (e) { return { raw: text }; }
}
