---
name: Serene Vitality
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fc'
  surface-container: '#ecedf6'
  surface-container-high: '#e7e8f1'
  surface-container-highest: '#e1e2eb'
  on-surface: '#191c22'
  on-surface-variant: '#424753'
  inverse-surface: '#2e3037'
  inverse-on-surface: '#eff0f9'
  outline: '#727784'
  outline-variant: '#c2c6d5'
  surface-tint: '#005bbf'
  primary: '#0059ba'
  on-primary: '#ffffff'
  primary-container: '#2c72d9'
  on-primary-container: '#fefcff'
  inverse-primary: '#acc7ff'
  secondary: '#585f68'
  on-secondary: '#ffffff'
  secondary-container: '#dde3ee'
  on-secondary-container: '#5e656e'
  tertiary: '#a53437'
  on-tertiary: '#ffffff'
  tertiary-container: '#c54c4d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004492'
  secondary-fixed: '#dde3ee'
  secondary-fixed-dim: '#c1c7d1'
  on-secondary-fixed: '#161c24'
  on-secondary-fixed-variant: '#414750'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b0'
  on-tertiary-fixed: '#410006'
  on-tertiary-fixed-variant: '#871e24'
  background: '#f9f9ff'
  on-background: '#191c22'
  surface-variant: '#e1e2eb'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  action:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  tap_target_min: 56px
  container_padding: 24px
  gutter: 16px
  stack_gap: 20px
---

## Brand & Style

This design system embodies a "Premium Medical Concierge" aesthetic, merging the clinical precision of Google Health with the personal wellness warmth of Headspace. The personality is calm, authoritative yet accessible, and hyper-legible, specifically optimized for users who may be in high-stress or low-dexterity situations.

The visual style is **Corporate / Modern** with a lean toward **Minimalism**. It prioritizes clarity through massive amounts of whitespace ("Airy Layouts") and a soft, non-intimidating color palette. By utilizing high-quality system typography and generous padding, the interface evokes a sense of organized care and technological reliability.

## Colors

The color strategy focuses on a high-trust Blue core supported by a palette of functional pastels. 

- **Primary Blue:** Used for primary actions and brand presence.
- **Soft Blue Surface:** Utilized for secondary backgrounds and subtle grouping of information.
- **Emergency Coral:** Reserved exclusively for high-priority alerts and the emergency footer.
- **Semantic Accents:** Success Green and Warm Amber provide clear status feedback for health metrics.
- **Surface & Background:** A subtle distinction between the #FAFBFD page background and #FFFFFF cards creates soft depth without relying on heavy borders.

## Typography

This design system uses **Manrope** for its core structure to maintain a refined, professional health-tech feel. **Lexend** is introduced for labels and buttons to maximize accessibility and legibility—a crucial requirement for a healthcare startup. 

Typography is intentionally oversized. Body text never drops below 18px to ensure readability for a diverse age demographic. Headlines are bold and tight to create a clear information hierarchy amidst the whitespace.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with generous safe margins. Elements are organized in a vertical stack with significant breathing room to prevent cognitive overload.

- **Tap Targets:** Every interactive element must meet a minimum height of 56px to accommodate users with limited motor precision.
- **Margins:** A consistent 24px container margin ensures content never feels cramped against the screen edges.
- **Rhythm:** An 8px base grid is used, but layout gaps are pushed to 20px+ to achieve the "Airy" aesthetic requested.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers** rather than heavy lines.

- **Shadows:** Use a single, very soft shadow for cards: `0px 10px 30px rgba(79, 142, 247, 0.08)`. The slight blue tint in the shadow maintains the brand's cool, clean feel.
- **Layering:** Components sit on a #FAFBFD background. Elevated content lives on #FFFFFF cards. Use #EEF4FF for "sunken" or secondary areas like search bars or inactive progress tracks.
- **Connectivity Badges:** Use a subtle inner glow or a 1px #E6EAF2 border to distinguish small status indicators without adding bulk.

## Shapes

The shape language is overwhelmingly friendly and organic. 

- **Cards & Containers:** Use a 20px radius to emphasize a modern, non-clinical feel.
- **Interactive Elements:** Buttons utilize a slightly tighter 16px radius to appear distinct from the containers they sit within.
- **Icon Backgrounds:** Small icons sit on "pill-soft" 12px squares. These backgrounds use 10% opacity versions of the brand colors (e.g., 10% Success Green for a health icon).

## Components

- **Sticky Emergency Footer:** A permanent fixture at the bottom of the screen. Background: #F26D6D. Text: #FFFFFF (Lexend, Bold, 20px). It spans the full width with a 56px+ height and an immediate "CALL 108" action.
- **Buttons:** Primary buttons use #4F8EF7 with white text. Height is fixed at 56px. Secondary buttons use #EEF4FF with blue text.
- **Cards:** White (#FFFFFF) with a 20px radius and the ambient blue shadow. Internal padding should be a minimum of 24px.
- **Input Fields:** Use #FAFBFD background with a 1px #E6EAF2 border. On focus, the border transitions to Primary Blue.
- **Connectivity Badges:** Small capsules (Pill-shaped) with a Lexend 12px font, used to show "Device Syncing" or "Live" status.
- **Iconography:** Line-based icons with a 2px stroke weight, placed inside soft pastel circular or squircle backgrounds.