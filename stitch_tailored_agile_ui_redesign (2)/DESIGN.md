# Design System: The Editorial Technicalist

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Atelier"**

This design system moves away from the "generic corporate tech" aesthetic toward a high-end, editorial-inspired digital experience. It treats the interface not as a series of boxes, but as a curated space where precision engineering meets human warmth. By leveraging **Space Grotesk’s** geometric personality against a backdrop of "warm tech" neutrals, we create an environment that feels both authoritative and approachable.

The system breaks the standard template look through **Intentional Asymmetry**. We utilize generous, purposeful white space and offset alignments to guide the eye. Overlapping elements—such as images bleeding across surface transitions—create a sense of physical depth and sophisticated motion, moving beyond the flat, static layouts typical of the industry.

---

## 2. Colors & Surface Philosophy

The palette is anchored in a sophisticated "Off-White" foundation (`surface`), contrasted by "Deep Slate Teal" (`primary`) and high-energy "Coral" (`secondary`) accents.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established solely through background color shifts. Use `surface-container-low` for secondary sections and `surface-container-high` for callouts. This creates a seamless, premium flow where content feels integrated into the environment.

### Surface Hierarchy & Nesting
Treat the UI as a series of layered, high-quality materials.
- **Base Layer:** `surface` (#fcf9f4) – The wide-open canvas.
- **The Inset:** Use `surface-container-low` (#f6f3ee) for large content areas like sidebars or secondary content blocks.
- **The Highlight:** Use `surface-container-lowest` (#ffffff) for primary interactive cards, creating a "lifted" effect against the warm background.

### The "Glass & Gradient" Rule
To add visual "soul," use subtle gradients on primary CTAs and Hero sections. Transition from `primary` (#004a56) to `primary_container` (#006473) at a 135-degree angle. For floating navigation or modal overlays, apply **Glassmorphism**: use `surface` at 80% opacity with a `20px` backdrop-blur to allow the content underneath to bleed through softly.

---

## 3. Typography: Precision & Character

The typographic system relies on the interplay between the avant-garde geometry of **Space Grotesk** and the hyper-legibility of **Inter**.

*   **Display & Headline (Space Grotesk):** These are our "Voice" tokens. Use `display-lg` through `headline-sm` to create impact. Space Grotesk should be used with tight letter-spacing (-0.02em) to emphasize its architectural structure.
*   **Body & Title (Inter):** Used for sustained reading and functional clarity. Inter provides the "Technical" counterbalance to the more expressive headers.
*   **The Editorial Ratio:** Ensure a dramatic scale difference between headlines and body text. A `display-lg` headline should often sit near a `body-md` description to create a sophisticated, high-contrast look common in premium magazines.

---

## 4. Elevation & Depth: Tonal Layering

We avoid traditional "material" shadows in favor of **Tonal Layering** and **Ambient Light.**

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a soft, natural lift without a single pixel of shadow.
*   **Ambient Shadows:** For high-priority floating elements (e.g., a main CTA button or a featured card), use a "Whisper Shadow":
    *   `X: 0, Y: 12px, Blur: 32px, Spread: -4px`
    *   Color: `on_surface` (#1c1c19) at **6% opacity**.
*   **The Ghost Border Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.
*   **Glassmorphism:** Apply to the Global Header. It should feel like a pane of frosted glass floating over the content, utilizing `surface_container_lowest` with 70% opacity and `blur(12px)`.

---

## 5. Components

### Buttons
*   **Primary:** A gradient-filled container (`primary` to `primary_container`) with `on_primary` text. Border radius set to `lg` (0.5rem).
*   **Secondary:** No background. A "Ghost Border" (`outline_variant` at 20%) with `primary` text.
*   **Tertiary:** Text-only in `primary` with a small `IBM Plex Mono` icon for technical flair.

### Cards
*   **Rules:** Forbid divider lines. Use `surface_container_highest` for a header background or simply rely on `title-lg` typography to define the start of a section.
*   **Interaction:** On hover, a card should shift from `surface_container_low` to `surface_container_lowest` and gain a Whisper Shadow.

### Input Fields
*   **Style:** Minimalist. No four-sided boxes. Use a bottom-only "Ghost Border" and a `surface-container-low` background fill. Labels use `label-md` in `on_surface_variant`.

### Technical Chips
*   Utilize `IBM Plex Mono` for chip labels to denote "Agile Methodology" or "Technical Specs." Use `secondary_container` (#f99188) with `on_secondary_container` (#732824) for a sophisticated pop of color.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, a headline might be indented further than the body text to create a modern, editorial rhythm.
*   **Do** use "Warm" white space. White space isn't just empty; it’s a container. Ensure it feels intentional by aligning elements to a 12-column grid but breaking that grid with large images.
*   **Do** prioritize `primary_container` (#006473) for large color blocks to maintain the "High-Tech Professional" vibe.

### Don't
*   **Don't** use 1px black or grey borders. They break the premium illusion.
*   **Don't** use standard 400ms easing. Use a "Slower, Heavier" transition (600ms, Cubic Bezier 0.22, 1, 0.36, 1) to make the UI feel expensive and deliberate.
*   **Don't** clutter. If a section feels "busy," increase the vertical spacing using the `xl` spacing scale rather than adding lines or boxes.