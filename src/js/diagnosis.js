// ===== AI Symptom Checker using Gemini =====
const diagnosis = {
    init() {
        const submitBtn = document.getElementById('ai-submit-btn');
        const input = document.getElementById('ai-input');
        const micBtn = document.getElementById('ai-mic-btn');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.analyze());
        }
        
        if (micBtn && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            
            micBtn.addEventListener('click', () => {
                micBtn.classList.add('bg-red-100', 'text-red-500', 'animate-pulse');
                const voiceLangs = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-IN' };
                recognition.lang = voiceLangs[app.state.language] || 'en-IN';
                recognition.start();
            });
            
            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                input.value += (input.value ? ' ' : '') + text;
                micBtn.classList.remove('bg-red-100', 'text-red-500', 'animate-pulse');
            };
            
            recognition.onerror = () => {
                micBtn.classList.remove('bg-red-100', 'text-red-500', 'animate-pulse');
            };
        }
    },
    
    async analyze() {
        const input = document.getElementById('ai-input').value.trim();
        if (!input) return;
        
        if (!app.state.isOnline) {
            alert('AI Analysis requires an internet connection.');
            return;
        }
        
        document.getElementById('ai-loading').classList.remove('hidden');
        document.getElementById('ai-results').classList.add('hidden');
        document.getElementById('ai-submit-btn').disabled = true;
        
        try {
            const result = await analyzeSymptoms(input, app.state.language);
            this.renderResults(result);
        } catch (err) {
            console.error("AI Error:", err);
            alert("Sorry, there was an error analyzing your symptoms. Please try again.");
            document.getElementById('ai-loading').classList.add('hidden');
            document.getElementById('ai-submit-btn').disabled = false;
        }
    },
    
    renderResults(data) {
        document.getElementById('ai-loading').classList.add('hidden');
        document.getElementById('ai-results').classList.remove('hidden');
        document.getElementById('ai-submit-btn').disabled = false;
        
        document.getElementById('ai-condition-title').innerText = data.condition || 'Unknown Condition';
        document.getElementById('ai-condition-desc').innerText = data.description || '';
        
        const urgencyLabel = document.getElementById('ai-urgency-label');
        const urgencyBar = document.getElementById('ai-urgency-bar');
        const urgencyCard = document.getElementById('ai-urgency-card');
        
        urgencyLabel.innerText = data.urgency_label || data.urgency || 'Consult Doctor';
        
        let color = '#F59E0B'; // amber
        let height = '60%';
        if (data.urgency === 'red') { color = '#EF4444'; height = '100%'; }
        else if (data.urgency === 'green') { color = '#10B981'; height = '30%'; }
        
        urgencyBar.style.backgroundColor = color;
        urgencyBar.style.height = height;
        urgencyLabel.style.color = color;
        
        const actionsList = document.getElementById('ai-actions-list');
        actionsList.innerHTML = '';
        
        if (data.actions && Array.isArray(data.actions)) {
            data.actions.forEach((action, idx) => {
                const li = document.createElement('li');
                li.className = 'flex items-start gap-4';
                li.innerHTML = `
                    <div class="w-6 h-6 rounded-full bg-[#EEF4FF] text-[#4F8EF7] flex items-center justify-center flex-shrink-0 text-xs font-bold">${idx + 1}</div>
                    <p class="text-slate-600">${action}</p>
                `;
                actionsList.appendChild(li);
            });
        }
        
        if (data.warning) {
            const warningLi = document.createElement('li');
            warningLi.className = 'flex items-start gap-4 mt-4 p-3 bg-red-50 rounded-lg';
            warningLi.innerHTML = `
                <span class="material-symbols-outlined text-red-500">warning</span>
                <p class="text-red-700 font-medium text-sm">${data.warning}</p>
            `;
            actionsList.appendChild(warningLi);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => diagnosis.init());
