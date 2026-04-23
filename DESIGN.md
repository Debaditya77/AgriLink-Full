---
name: AgriLink AI
colors:
  surface: '#101414'
  surface-dim: '#101414'
  surface-bright: '#363a3a'
  surface-container-lowest: '#0b0f0f'
  surface-container-low: '#191c1c'
  surface-container: '#1d2020'
  surface-container-high: '#272b2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e3'
  on-surface-variant: '#bacbb5'
  inverse-surface: '#e1e3e3'
  inverse-on-surface: '#2e3131'
  outline: '#849580'
  outline-variant: '#3b4b39'
  surface-tint: '#00e54e'
  primary: '#f0ffe9'
  on-primary: '#00390d'
  primary-container: '#2dff5f'
  on-primary-container: '#007222'
  inverse-primary: '#006e21'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#f9fafb'
  on-tertiary: '#2e3132'
  tertiary-container: '#dcdedf'
  on-tertiary-container: '#5f6263'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6eff7c'
  primary-fixed-dim: '#00e54e'
  on-primary-fixed: '#002105'
  on-primary-fixed-variant: '#005317'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#444748'
  background: '#101414'
  on-background: '#e1e3e3'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 12px
  margin-mobile: 16px
---

## Brand & Style

This design system establishes a high-tech, authoritative atmosphere for the modern agricultural landscape. It positions the product not just as a tool, but as a sophisticated "AI Co-Pilot" that bridges the gap between raw earth and cutting-edge data science.

The brand personality is **Technical, Visionary, and Reliable**. The UI evokes the feeling of a premium cockpit or control center, utilizing **Dark Mode Dominance** to reduce eye strain for farmers operating in low-light environments (early mornings/late nights). 

The visual style is a fusion of **Glassmorphism** and **Bento Box** architecture. This creates a highly organized, modular interface where complex data streams—weather patterns, soil health, and machine telemetry—are segmented into legible, frosted-glass containers. The aesthetic is clean and futuristic, yet grounded by the rhythmic, structured layout of the grid.

## Colors

The palette is anchored in deep, obsidian tones to create a sense of infinite depth. 

- **Primary:** A vibrant Neon Agricultural Green (#2DFF5F). This is used sparingly for critical actions, active states, and data visualizations to ensure maximum "pop" against the dark background.
- **Surface & Background:** The base is a pure Black (#000000) for OLED optimization, with Deep Charcoal (#0F1111) used for the main canvas.
- **Alerts:** A high-visibility Bright Orange (#FF8C00) handles all warning states, machinery alerts, and urgent weather notifications.
- **Glass Shimmer:** Surfaces utilize a translucent white or primary-tinted stroke at very low opacities to simulate the edge of a glass pane.

## Typography

This design system uses a dual-typeface strategy to balance technical edge with functional readability.

- **Headlines & Labels:** **Space Grotesk** provides a geometric, futuristic feel. It is used for all "Bento" card titles and data points to emphasize the AI-driven nature of the platform. Bold weights are preferred for immediate hierarchy.
- **Body & Data:** **Inter** is utilized for its exceptional legibility in mobile contexts and long-form data logs. 
- **Formatting:** Use uppercase labels with increased tracking for category headers above glass containers to maintain the "control panel" aesthetic.

## Layout & Spacing

The layout follows a **Bento Box Grid** philosophy optimized for a **Mobile-First** experience. 

- **The Grid:** On mobile, components stack vertically into a single column. On larger displays, they expand into a multi-column fluid grid where cards occupy variable spans (e.g., 1x1, 2x1, 2x2).
- **Rhythm:** A 4px baseline grid ensures tight, mathematical precision. 
- **Bento Logic:** Each "cell" in the grid is a self-contained glass container. Use a 12px gutter between cards to allow the background depth to peek through, reinforcing the layered glass effect.

## Elevation & Depth

Hierarchy is achieved through **Glassmorphism and Tonal Layering** rather than traditional shadows.

1.  **Background (Level 0):** Pure black/charcoal canvas.
2.  **Bento Containers (Level 1):** Translucent background blur (Backdrop-filter: blur(20px)) with a 5% white fill. Borders are 1px solid white at 10% opacity, creating a "frosted edge" effect.
3.  **Active/Floating Elements (Level 2):** Higher opacity fills and subtle outer glows using the primary neon green to indicate focus or "system-on" states.
4.  **Interactive Elements:** Buttons and inputs should appear to sit "on top" of the glass panes, utilizing slightly more opaque backgrounds to distinguish them from the container.

## Shapes

The shape language is defined by **Rounded** geometry to soften the technical nature of the UI and make it feel more approachable.

- **Bento Cards:** Use a 1.5rem (24px) corner radius to create a distinct, modern "pod" look.
- **Buttons & Chips:** Use a full pill-shape (999px) or a 1rem radius to contrast against the larger containers.
- **Visual Continuity:** Ensure that the internal padding of a container is larger than its corner radius to maintain visual harmony (the "nested radius" rule).

## Components

- **Glass Cards:** The primary container. Must include a subtle top-left light leak (linear gradient) to simulate light hitting glass.
- **Primary Action Button:** High-contrast neon green background with black text. No transparency. High "tapability" with a 56px minimum height for mobile.
- **Status Chips:** Small, pill-shaped indicators. For "Online/Active," use a pulsing neon green dot. For "Alert," use a solid orange fill.
- **Data Bento Cells:** These feature a large Space Grotesk "Hero Number" (e.g., 88% Soil Moisture) centered within a glass card, with a label-caps header.
- **Inputs:** Darker than the card background, slightly recessed appearance, with a 2px neon green border appearing only on focus.
- **AI Co-Pilot Drawer:** A bottom-anchored sheet using a more intense backdrop blur, housing the AI chat interface and suggestions.