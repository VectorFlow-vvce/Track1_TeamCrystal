// ===== Family Health Vault (Supabase + IndexedDB) =====
const vault = {
    members: [],
    
    async init() {
        try {
            if (app.state.isOnline && app.state.user && app.state.user.id) {
                this.members = await getFamilyMembers(app.state.user.id);
                await cacheFamilyMembers(this.members);
            } else {
                this.members = await getCachedFamilyMembers();
            }
        } catch (e) {
            console.error('Vault init error:', e);
            this.members = await getCachedFamilyMembers();
        }
        this.render();
    },
    
    render() {
        const grid = document.getElementById('vault-grid');
        if (!grid) return;
        grid.innerHTML = '';
        
        this.members.forEach(m => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-2xl p-6 ambient-shadow border border-[#E6EAF2] flex flex-col gap-4';
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex gap-4 items-center">
                        <div class="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#4F8EF7] font-bold text-xl">
                            ${(m.name || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 class="font-h2 text-lg text-on-surface">${m.name || 'Unknown'}</h3>
                            <span class="bg-[#EEF4FF] text-[#4F8EF7] font-label-caps text-[11px] px-2 py-1 rounded-full">${m.relation || ''}</span>
                        </div>
                    </div>
                    <button onclick="vault.deleteMember('${m.id}')" class="text-slate-300 hover:text-red-400 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between"><span class="text-secondary">Blood Group</span><span class="font-bold text-[#4F8EF7]">${m.blood_group || '—'}</span></div>
                    <div class="flex justify-between"><span class="text-secondary">Conditions</span><span class="font-medium">${m.conditions || 'None'}</span></div>
                    <div class="flex justify-between"><span class="text-secondary">Allergies</span><span class="font-medium ${m.allergies && m.allergies !== 'None' ? 'text-red-500' : ''}">${m.allergies || 'None'}</span></div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        // Add member placeholder card
        const addCard = document.createElement('div');
        addCard.className = 'border-2 border-dashed border-[#E6EAF2] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#4F8EF7] transition-colors min-h-[200px]';
        addCard.onclick = () => this.showAddModal();
        addCard.innerHTML = `
            <div class="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                <span class="material-symbols-outlined text-[#4F8EF7] text-2xl">person_add</span>
            </div>
            <span class="font-bold text-secondary">Add Family Member</span>
        `;
        grid.appendChild(addCard);
    },
    
    showAddModal() {
        document.getElementById('vault-modal').classList.remove('hidden');
        document.getElementById('vault-form').reset();
        
        // Remove old listener and add new one
        const form = document.getElementById('vault-form');
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        newForm.addEventListener('submit', (e) => { e.preventDefault(); this.addMember(); });
    },
    
    hideAddModal() {
        document.getElementById('vault-modal').classList.add('hidden');
    },
    
    async addMember() {
        const member = {
            name: document.getElementById('v-name').value,
            relation: document.getElementById('v-relation').value,
            blood_group: document.getElementById('v-blood').value,
            conditions: document.getElementById('v-conditions').value || 'None',
            allergies: document.getElementById('v-allergies').value || 'None'
        };
        
        try {
            if (app.state.isOnline && app.state.user && app.state.user.id && !app.state.user.id.startsWith('offline_')) {
                await addFamilyMember(app.state.user.id, member);
            } else {
                // Offline: save to IndexedDB only
                member.id = 'local_' + Date.now();
                await dbSet('family', member);
            }
            this.hideAddModal();
            await this.init();
        } catch (e) {
            console.error('Add member error:', e);
            alert('Failed to add member: ' + e.message);
        }
    },
    
    async deleteMember(id) {
        if (!confirm('Remove this family member?')) return;
        try {
            if (app.state.isOnline && !id.startsWith('local_')) {
                await deleteFamilyMember(id);
            }
            await dbDelete('family', id);
            await this.init();
        } catch (e) {
            console.error('Delete error:', e);
        }
    }
};

window.vault = vault;
