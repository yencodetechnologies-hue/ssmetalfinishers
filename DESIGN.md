---
name: Industrial Precision System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c6c5d1'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8f909b'
  outline-variant: '#454650'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#1c2c64'
  primary-container: '#071a52'
  on-primary-container: '#7584c1'
  inverse-primary: '#4c5b95'
  secondary: '#c2c7cf'
  on-secondary: '#2c3137'
  secondary-container: '#444a50'
  on-secondary-container: '#b4b9c1'
  tertiary: '#ffb77d'
  on-tertiary: '#4d2600'
  tertiary-container: '#341800'
  on-tertiary-container: '#cc6f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#02164e'
  on-primary-fixed-variant: '#34437c'
  secondary-fixed: '#dee3eb'
  secondary-fixed-dim: '#c2c7cf'
  on-secondary-fixed: '#171c22'
  on-secondary-fixed-variant: '#42474e'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  mono-data:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system is engineered to reflect the authority of a global leader in high-end manufacturing. It blends the structural rigidity of industrial engineering with a futuristic, premium digital layer. The aesthetic moves beyond standard corporate design into **Industrial Futurism**, utilizing glassmorphism and light-emitting accents to symbolize innovation within heavy industry.

The target audience consists of procurement executives, lead engineers, and Fortune 500 partners who demand reliability and cutting-edge performance. The UI should evoke a sense of "heavy-duty elegance"—where every pixel feels as precisely machined as a turbine component.

Key stylistic pillars include:
- **Glassmorphism:** Layers of depth created through frosted surfaces and high-refraction blurs to signify transparency and high-tech sophistication.
- **Metallic Accents:** The use of subtle gradients to mimic brushed aluminum and steel.
- **Luminescent Interaction:** An "ignition" metaphor where interactive elements glow with high-intensity orange, contrasting against the deep industrial blue foundation.

## Colors

The palette is anchored in a high-contrast dark mode to emphasize the "Glowing Orange" accents, mimicking a command center or a high-tech factory floor.

- **Primary (Deep Industrial Blue):** Used for the base canvas and deep structural layers. It provides more depth than pure black, suggesting a vast, organized infrastructure.
- **Secondary (Metallic Silver):** A cool-toned #A8ADB5 used for subtle borders, iconography, and secondary text to evoke raw material quality.
- **Tertiary (Glowing Orange):** Reserved strictly for calls to action, active states, and critical data points. It represents energy, precision, and "live" systems.
- **Neutral (Deep Charcoal & White):** Deep Charcoal (#121212) is used for container backgrounds to create separation from the primary blue. White is used for high-readability body text.

## Typography

The typography utilizes **Geist** for its technical precision and architectural structure. The typeface's geometric clarity mimics technical drawings and blueprints.

- **Headlines:** Use Bold and Black weights (700-800). Tighten letter-spacing slightly on larger sizes to create a "machined" look.
- **Body Text:** Use Regular weight (400) with a generous line height for readability against dark backgrounds. Increase tracking (letter-spacing) slightly to prevent "bleeding" on backlit screens.
- **Labels:** Small caps with 10% tracking are used for metadata, category labels, and technical specs to reinforce the industrial documentation aesthetic.

## Layout & Spacing

This design system employs a **12-column fixed-width grid** for desktop, centered within the viewport to maintain a premium, cinematic feel. 

- **Grid:** 24px gutters provide breathing room between complex technical data components.
- **Rhythm:** An 8px linear scale governs all padding and margins (8, 16, 24, 32, 48, 64, 80, 96).
- **Mobile:** Transition to a 4-column fluid grid with 20px side margins. 
- **White Space:** Generous vertical spacing (80px+) between sections is mandatory to separate distinct product categories and maintain the "high-end" positioning. Avoid cramped layouts; let the engineering speak for itself.

## Elevation & Depth

Depth is achieved through **Glassmorphism** rather than traditional drop shadows.

- **The Glass Layer:** Surfaces use a semi-transparent Deep Charcoal (#121212) at 60-80% opacity with a `backdrop-filter: blur(20px)`.
- **Borders as Light:** Instead of shadows, use 1px "inner-glow" borders. Use a linear gradient for borders (Top-Left: White @ 20% to Bottom-Right: White @ 5%) to simulate light hitting a physical edge.
- **Floating States:** For higher elevation (modals), increase the backdrop blur to 40px and add a subtle, large-radius outer glow in the Primary Blue color to suggest the element is hovering over a light source.

## Shapes

The shape language is "Soft-Industrial." While the brand is precise, 0px corners feel dated and aggressive. 

- **Primary Radius:** A consistent 0.25rem (4px) radius is applied to buttons, input fields, and small components to mimic precision-milled edges.
- **Large Components:** Cards and sections use a 0.75rem (12px) radius to soften the overall technical layout and make the glass effect feel more modern.
- **Iconography:** Use thick, 2px stroke-based icons with "sharp-rounded" terminals—avoiding perfect circles in favor of squi-circles where possible.

## Components

### Buttons
- **Primary:** Solid Glowing Orange background. On hover, add an external glow (`box-shadow: 0 0 15px #FF8C00`). Text is Deep Industrial Blue.
- **Secondary (Metallic):** A subtle silver-to-grey gradient background with a 1px white-transparent border. 
- **Ghost:** Transparent background with a 1px Silver border.

### Glass Cards
The signature component. Must feature a `backdrop-filter: blur(20px)`, a semi-transparent background, and the "machined edge" 1px gradient border. Content inside cards should have 32px padding.

### Input Fields
Dark backgrounds (#050E2B) with 1px Silver borders. On focus, the border transitions to Glowing Orange with a subtle inner glow, indicating the system is "active."

### Progress & Status
- **Gauges/Bars:** Use thin, neon-accented lines. 
- **Status Pills:** High-saturation colors for "Optimal" (Emerald), "Warning" (Orange), and "Critical" (Red), but always paired with the Metallic Silver text to maintain the industrial tone.

### Data Visualization
Charts should use "Glow-Lines"—thin 2px lines with a subtle outer glow of the same color, set against a dark grid pattern of 8px squares.