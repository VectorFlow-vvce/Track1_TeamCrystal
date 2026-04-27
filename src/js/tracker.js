// ===== Ambulance Tracker Simulation (Leaflet Map) =====
const tracker = {
    map: null,
    ambMarker: null,
    userMarker: null,
    polyline: null,
    interval: null,
    
    init() {
        if (!this.map) {
            // Need a slight delay for container to be visible so Leaflet can calculate size
            setTimeout(() => {
                this.initMap();
                this.startSimulation();
            }, 300);
        } else {
            this.map.invalidateSize();
            this.startSimulation();
        }
    },
    
    initMap() {
        // Initialize map centered roughly on a generic city (Mumbai coords)
        this.map = L.map('tracker-map', {
            zoomControl: false,
            attributionControl: false
        }).setView([19.0760, 72.8777], 14);
        
        // CartoDB Positron theme (matches the clean white map look in designs)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(this.map);
        
        // Create custom icons
        const userIcon = L.divIcon({
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-12 h-12 bg-[#4F8EF7] rounded-full opacity-20 pulse-ring"></div>
                    <div class="w-6 h-6 bg-[#4F8EF7] rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
            `,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        const ambIcon = L.divIcon({
            html: `
                <div class="bg-white p-2 rounded-xl shadow-xl border-2 border-[#4F8EF7] animate-bounce text-center flex items-center justify-center">
                    <span class="material-symbols-outlined text-[#4F8EF7]" style="font-variation-settings: 'FILL' 1;">emergency</span>
                </div>
            `,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        // Start positions
        const userLatLng = [19.0760, 72.8777];
        const ambLatLng = [19.0600, 72.8600]; // Southwest of user
        
        this.userMarker = L.marker(userLatLng, { icon: userIcon }).addTo(this.map);
        this.ambMarker = L.marker(ambLatLng, { icon: ambIcon }).addTo(this.map);
        
        // Draw dashed route
        this.polyline = L.polyline([ambLatLng, userLatLng], {
            color: '#4F8EF7',
            weight: 4,
            dashArray: '8, 10',
            lineCap: 'round'
        }).addTo(this.map);
        
        this.map.fitBounds(this.polyline.getBounds(), { padding: [50, 50] });
    },
    
    startSimulation() {
        if (this.interval) clearInterval(this.interval);
        
        let eta = 8;
        document.getElementById('tracker-eta').innerText = eta;
        
        const userLatLng = this.userMarker.getLatLng();
        let ambLatLng = this.ambMarker.getLatLng();
        
        this.interval = setInterval(() => {
            // Move ambulance 10% closer to user
            const latDiff = userLatLng.lat - ambLatLng.lat;
            const lngDiff = userLatLng.lng - ambLatLng.lng;
            
            ambLatLng = L.latLng(
                ambLatLng.lat + (latDiff * 0.1),
                ambLatLng.lng + (lngDiff * 0.1)
            );
            
            this.ambMarker.setLatLng(ambLatLng);
            this.polyline.setLatLngs([ambLatLng, userLatLng]);
            
            // Update ETA
            eta = Math.max(1, eta - 1);
            document.getElementById('tracker-eta').innerText = eta;
            
            if (eta <= 1) {
                document.getElementById('tracker-status').innerText = 'Arriving Now';
                document.getElementById('tracker-status').classList.add('text-green-500');
                clearInterval(this.interval);
            }
            
        }, 3000); // Update every 3 seconds
    }
};

window.tracker = tracker;
