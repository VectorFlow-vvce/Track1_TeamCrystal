# JeevanAid — Emergency Healthcare PWA

Offline-first emergency first-aid and AI health platform for India.

## Features

- 🏥 **12 Emergency First-Aid Guides** — Offline, bilingual (English/Hindi), step-by-step with audio
- 🤖 **AI Symptom Checker** — Powered by Google Gemini API
- 🚑 **Live Ambulance Tracker** — Real-time map with Leaflet + OpenStreetMap
- 👨‍👩‍👧‍👦 **Family Health Vault** — Store blood groups, conditions, allergies (Supabase + IndexedDB)
- 💊 **Medicine Identifier** — Camera-based pill identification via Gemini Vision
- 📍 **Nearest Clinic Finder** — OpenStreetMap Overpass API
- 📱 **PWA** — Installable, works offline after first load
- 🌐 **Bilingual** — English and Hindi support
- 📞 **One-Tap Emergency Call** — Persistent 108 emergency footer

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS + Tailwind CSS (CDN)
- **Design System**: Serene Vitality (Manrope + Lexend fonts, Material Symbols)
- **Auth & Database**: Supabase (auth + PostgreSQL)
- **AI**: Google Gemini 2.0 Flash API
- **Maps**: Leaflet.js + OpenStreetMap + CartoDB tiles
- **Offline**: Service Worker + IndexedDB
- **Voice**: Web Speech API (text-to-speech for emergency guides)

## Setup

1. Clone the repo
2. Run the SQL in `supabase_setup.sql` in your Supabase SQL Editor
3. Disable email confirmation: Supabase → Authentication → Settings → Email → uncheck "Confirm email"
4. Serve the `src/` folder:
   ```bash
   npx serve src -l 3000
   ```
5. Open http://localhost:3000

## Project Structure

```
src/
├── index.html          # Main SPA (all views)
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline caching)
├── css/
│   └── style.css       # Design system styles
├── js/
│   ├── app.js          # Core router, state, navigation
│   ├── supabase.js     # Auth, DB, Gemini AI client
│   ├── db.js           # IndexedDB offline storage
│   ├── emergencies.js  # 12 emergency types data
│   ├── diagnosis.js    # AI symptom checker UI
│   ├── tracker.js      # Ambulance tracker (Leaflet)
│   └── vault.js        # Family health vault CRUD
└── icons/
    ├── icon-192.png    # PWA icon
    └── icon-512.png    # PWA icon
```

## License

MIT
