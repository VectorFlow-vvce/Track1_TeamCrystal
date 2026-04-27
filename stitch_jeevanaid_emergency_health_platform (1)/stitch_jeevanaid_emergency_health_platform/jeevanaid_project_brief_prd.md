# JeevanAid: Project Brief & Product Requirements Document (PRD)

## 1. Project Overview
**Product Name:** JeevanAid
**Tagline:** Offline when you need it most. Intelligent when you have signal.
**Target Market:** Rural and semi-urban India.
**Core Mission:** To provide a premium, modern, and high-trust healthcare platform that bridges the gap between critical offline emergency assistance and advanced online AI-driven medical services.

---

## 2. Design Philosophy: "Serene Vitality"
The visual identity is designed to feel like a **premium healthcare startup**, moving away from the cold, clinical, or overly aggressive "emergency red" aesthetics often found in medical portals.

*   **Aesthetic:** Soft, minimal, calm, and intelligent.
*   **Color System:** 
    *   **Primary:** Soft Blue (#4F8EF7) for trust and professionalism.
    *   **Surface:** Near-white backgrounds (#FAFBFD) with high whitespace to reduce cognitive load during panic.
    *   **Accents:** Coral (#F26D6D) used *exclusively* for true emergency actions (e.g., Call 108).
*   **Typography:** High-readability system fonts (Manrope/Lexend) with large tap targets (min 56px) for high-stress usability.
*   **Components:** Rounded corners (18-20px), subtle shadows, and pastel-colored icon backgrounds.

---

## 3. Core Functionality & User Flows

### A. Hybrid Connectivity Model
The app operates in two distinct modes based on network availability:
1.  **Offline Mode (Low/No Signal):** Focuses on "Panic-Proof" emergency guides, first-aid instructions, and local medical vault access.
2.  **Online Mode (Signal Active):** Unlocks AI diagnostics, tele-consultation, live tracking, and real-time hospital data.

### B. Key Features
*   **Multi-Lingual Onboarding:** 2-column language selection (Hindi, Kannada, Tamil, Telugu, etc.) to ensure accessibility across diverse Indian regions.
*   **Offline Emergency Home:** A clear, icon-driven grid for immediate first-aid (Snake Bites, Seizures, etc.) and a persistent 108 emergency button.
*   **AI Symptom Checker:** A conversational AI assistant that analyzes user input and provides color-coded urgency assessments (Safe, Caution, Emergency).
*   **Medicine Identifier:** Camera-based scanner to identify medicine strips, provide dosage information, and warn about side effects.
*   **Tele-Health (Doctor On Call):** Real-time queue management for video/chat consultations with qualified physicians.
*   **Live Ambulance Tracker:** Reassuring map-based UI showing ETA, paramedic contact, and location sharing features.
*   **Family Health Vault:** Secure, profile-based management for medical records, allergies, and blood groups for the entire family.
*   **Nearest Clinic Finder:** Map integration with real-time bed availability (online) or cached clinic locations (offline).

---

## 4. Technical Constraints (PWA)
*   **Viewport:** Optimized for 390px mobile browsers (Android/iOS).
*   **Offline First:** Extensive use of local storage for first-aid guides and health vault data.
*   **Connectivity Indicator:** A persistent "Online/Offline" status badge with a visual pulse.
*   **UX Accessibility:** Large text, high contrast, and simplified navigation for elder-friendly use.

---

## 5. Success Metrics
*   **Time-to-Information:** Minimize the time it takes a user to reach a first-aid step during an emergency.
*   **Offline Reliability:** 100% availability of core first-aid content regardless of network state.
*   **User Trust:** Measured by high retention in the Family Health Vault and frequency of AI symptom checks before escalation.