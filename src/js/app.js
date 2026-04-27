// ===== Core App Logic & Routing =====
const app = {
    state: {
        user: null,
        language: 'en',
        isOnline: navigator.onLine,
        currentView: 'login'
    },
    
    async init() {
        // Setup network listeners
        window.addEventListener('online', () => this.updateNetworkStatus(true));
        window.addEventListener('offline', () => this.updateNetworkStatus(false));
        this.updateNetworkStatus(navigator.onLine);
        
        // Setup event listeners
        this.setupListeners();
        
        // Skip login — create default user and go to home
        try {
            // Try to restore cached user
            const cachedUser = await getCachedUser();
            if (cachedUser) {
                this.state.user = cachedUser;
                this.state.language = cachedUser.language || 'en';
            } else {
                // Create default local user
                this.state.user = { id: 'local_user', full_name: 'User', name: 'User', email: '', language: 'en' };
                await cacheUser(this.state.user);
            }
            
            // Try Supabase session silently
            try {
                const session = await getSession();
                if (session) {
                    this.state.user = session.user;
                    this.state.user.full_name = session.user.user_metadata?.full_name || 'User';
                }
            } catch(e) { /* ignore auth errors */ }
            
            // Check if language was chosen before
            const savedLang = localStorage.getItem('jeevanaid.lang');
            if (savedLang) {
                this.state.language = savedLang;
                this.navigate('home');
            } else {
                this.navigate('language');
            }
        } catch (e) {
            console.error("Init error:", e);
            this.state.user = { id: 'local_user', full_name: 'User', name: 'User' };
            this.navigate('home');
        }
    },
    
    updateNetworkStatus(online) {
        this.state.isOnline = online;
        document.body.classList.toggle('is-online', online);
        
        const icon = document.getElementById('connection-icon');
        const text = document.getElementById('connection-text');
        const pill = document.getElementById('connection-status');
        
        if (online) {
            icon.innerText = 'wifi';
            text.innerText = 'ONLINE';
            pill.className = 'bg-[#EEF4FF] px-3 py-1 rounded-full flex items-center gap-2 transition-colors duration-300';
            icon.className = 'material-symbols-outlined text-[16px] text-[#4F8EF7]';
            text.className = 'font-label-caps text-[12px] text-[#4F8EF7]';
        } else {
            icon.innerText = 'wifi_off';
            text.innerText = 'OFFLINE MODE';
            pill.className = 'bg-[#FFF9EE] px-3 py-1 rounded-full flex items-center gap-2 transition-colors duration-300';
            icon.className = 'material-symbols-outlined text-[16px] text-[#B47419]';
            text.className = 'font-label-caps text-[12px] text-[#B47419]';
        }
    },
    
    navigate(viewId, params = null) {
        // Hide all views
        document.querySelectorAll('.page').forEach(p => p.classList.add('page-hidden'));
        
        // Show target view
        const target = document.getElementById(`view-${viewId}`);
        if (target) {
            target.classList.remove('page-hidden');
            this.state.currentView = viewId;
        }
        
        // Update UI shell
        const header = document.getElementById('app-header');
        const bottomNav = document.getElementById('bottom-nav');
        const backBtn = document.getElementById('back-btn');
        
        if (viewId === 'login' || viewId === 'language') {
            header.classList.add('page-hidden');
            bottomNav.classList.add('page-hidden');
        } else {
            header.classList.remove('page-hidden');
            bottomNav.classList.remove('page-hidden');
        }
        
        // Back button logic
        if (['emergency', 'ai-diagnosis', 'tracker'].includes(viewId)) {
            backBtn.classList.remove('hidden');
            backBtn.onclick = () => this.navigate('home');
        } else {
            backBtn.classList.add('hidden');
        }
        
        // Update bottom nav active state
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.target === viewId) {
                item.classList.remove('text-slate-400');
                item.classList.add('text-[#4F8EF7]');
                item.querySelector('span').style.fontVariationSettings = "'FILL' 1";
            } else if (item.dataset.target) {
                item.classList.add('text-slate-400');
                item.classList.remove('text-[#4F8EF7]');
                item.querySelector('span').style.fontVariationSettings = "'FILL' 0";
            }
        });
        
        // View specific initializations
        if (viewId === 'home') this.renderHome();
        if (viewId === 'emergency' && params) this.renderEmergency(params);
        if (viewId === 'vault') if (window.vault) window.vault.init();
        if (viewId === 'tracker') if (window.tracker) window.tracker.init();
    },
    
    setupListeners() {
        // Login Form
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('login-name').value;
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;
            const errDiv = document.getElementById('login-error');
            
            try {
                errDiv.classList.add('hidden');
                const btn = e.target.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.innerText = 'Please wait...';
                
                let authRes = null;
                
                // Try sign in first
                try {
                    authRes = await signIn(email, pass);
                    console.log('Sign in success');
                } catch (signInErr) {
                    console.log('Sign in failed, trying sign up:', signInErr.message);
                    // Sign in failed — try sign up
                    try {
                        authRes = await signUp(email, pass, name);
                        console.log('Sign up result:', authRes);
                        
                        // If signup returned user but no session, try signing in
                        if (authRes && authRes.user && !authRes.session) {
                            console.log('No session after signup, attempting sign in...');
                            try {
                                authRes = await signIn(email, pass);
                            } catch (e2) {
                                console.warn('Post-signup sign-in failed:', e2.message);
                                // Still proceed with user data even without session
                            }
                        }
                    } catch (signUpErr) {
                        throw signUpErr;
                    }
                }
                
                if (authRes && authRes.user) {
                    this.state.user = authRes.user;
                    const userData = { 
                        id: authRes.user.id, 
                        full_name: name,
                        name, 
                        email, 
                        language: 'en' 
                    };
                    await cacheUser(userData);
                    btn.disabled = false;
                    btn.innerText = 'Get Started';
                    this.navigate('language');
                } else {
                    throw new Error('Authentication succeeded but no user data returned.');
                }
            } catch (err) {
                console.error('Auth error:', err);
                const btn = e.target.querySelector('button[type="submit"]');
                btn.disabled = false;
                btn.innerText = 'Get Started';
                
                if (!this.state.isOnline) {
                    // Offline fallback
                    const mockUser = { id: 'offline_' + Date.now(), full_name: name, name, email, language: 'en' };
                    this.state.user = mockUser;
                    await cacheUser(mockUser);
                    errDiv.classList.add('hidden');
                    this.navigate('language');
                } else {
                    errDiv.innerText = err.message || 'Authentication failed. Please try again.';
                    errDiv.classList.remove('hidden');
                }
            }
        });
        
        // Language Selection
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.lang-option').forEach(b => {
                    b.classList.remove('border-[#4F8EF7]', 'bg-[#EEF4FF]');
                    b.classList.add('border-transparent', 'bg-white');
                });
                btn.classList.remove('border-transparent', 'bg-white');
                btn.classList.add('border-[#4F8EF7]', 'bg-[#EEF4FF]');
                this.state.language = btn.dataset.lang;
            });
        });
        
        document.getElementById('lang-continue-btn').addEventListener('click', async () => {
            localStorage.setItem('jeevanaid.lang', this.state.language);
            if (this.state.user) {
                const cUser = await getCachedUser() || this.state.user;
                cUser.language = this.state.language;
                await cacheUser(cUser);
            }
            this.navigate('home');
        });
    },
    
    async signOut() {
        if (this.state.isOnline) {
            try { await window.signOut(); } catch(e){}
        }
        await dbClear('user');
        await dbClear('family');
        this.state.user = null;
        this.navigate('login');
    },
    
    renderHome() {
        const grid = document.getElementById('emergencies-grid');
        grid.innerHTML = '';
        
        const lang = this.state.language || 'en';
        
        EMERGENCIES.forEach(em => {
            const title = em.title[lang] || em.title.en;
            
            const btn = document.createElement('button');
            btn.className = 'flex flex-col items-center justify-center p-4 bg-white rounded-2xl ambient-shadow border border-[#E6EAF2] active:scale-95 transition-transform text-center';
            btn.onclick = () => this.navigate('emergency', em.id);
            
            btn.innerHTML = `
                <div class="w-12 h-12 rounded-full mb-3 flex items-center justify-center" style="background-color: ${em.bgColor}; color: ${em.iconColor}">
                    <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">${em.icon}</span>
                </div>
                <span class="font-bold text-[12px] leading-tight text-on-surface">${title}</span>
            `;
            grid.appendChild(btn);
        });
        
        // Set Avatar
        if (this.state.user) {
            const avatar = document.getElementById('user-avatar');
            avatar.classList.remove('hidden');
            const name = this.state.user.full_name || this.state.user.name || 'U';
            avatar.innerText = name.charAt(0).toUpperCase();
        }
    },
    
    // Emergency Detail Logic
    currentEmergency: null,
    currentStep: 0,
    
    renderEmergency(id) {
        this.currentEmergency = EMERGENCIES.find(e => e.id === id);
        this.currentStep = 0;
        this.updateEmergencyStep();
    },
    
    updateEmergencyStep() {
        const em = this.currentEmergency;
        const lang = this.state.language || 'en';
        const stepCount = em.steps.length;
        
        document.getElementById('header-title').innerText = em.title[lang] || em.title.en;
        document.getElementById('step-indicator').innerText = `Step ${this.currentStep + 1} of ${stepCount}`;
        
        // Progress bar
        const progContainer = document.getElementById('step-progress');
        progContainer.innerHTML = '';
        for (let i = 0; i < stepCount; i++) {
            const div = document.createElement('div');
            div.className = `h-full rounded-full flex-1 ${i <= this.currentStep ? 'bg-[#4F8EF7]' : 'bg-[#E6EAF2]'}`;
            progContainer.appendChild(div);
        }
        
        // Content
        const stepText = em.steps[this.currentStep][lang] || em.steps[this.currentStep].en;
        document.getElementById('emergency-step-title').innerText = `Step ${this.currentStep + 1}`;
        document.getElementById('emergency-step-desc').innerText = stepText;
        
        // Icon
        const iconBg = document.getElementById('emergency-icon-bg');
        const icon = document.getElementById('emergency-detail-icon');
        iconBg.style.backgroundColor = em.bgColor;
        icon.style.color = em.iconColor;
        icon.innerText = em.icon;
        
        // Warning (show on first step)
        const warning = document.getElementById('emergency-warning');
        if (this.currentStep === 0 && em.donts && em.donts.length > 0) {
            warning.classList.remove('hidden');
            document.getElementById('emergency-dont').innerText = em.donts[0][lang] || em.donts[0].en;
        } else {
            warning.classList.add('hidden');
        }
        
        // Buttons
        const prevBtn = document.getElementById('prev-step-btn');
        const nextBtn = document.getElementById('next-step-btn');
        
        prevBtn.style.visibility = this.currentStep > 0 ? 'visible' : 'hidden';
        prevBtn.onclick = () => {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.updateEmergencyStep();
            }
        };
        
        if (this.currentStep < stepCount - 1) {
            nextBtn.innerHTML = 'Next <span class="material-symbols-outlined">chevron_right</span>';
            nextBtn.onclick = () => {
                this.currentStep++;
                this.updateEmergencyStep();
            };
        } else {
            nextBtn.innerHTML = 'Done <span class="material-symbols-outlined">check</span>';
            nextBtn.onclick = () => this.navigate('home');
        }
        
        // Audio
        const audioBtn = document.getElementById('audio-btn');
        audioBtn.onclick = () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(stepText);
                utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
                window.speechSynthesis.speak(utterance);
            }
        };
    }
};

// Start app
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
