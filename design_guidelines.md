# BloomNet – Design Guidelines

## Design Approach

**Reference-Based Hybrid Strategy**
Drawing inspiration from social impact platforms (DonorsChoose, ShareTheMeal) combined with modern mapping interfaces (Airbnb's location features, Uber's live tracking). The design must balance emotional connection with utilitarian efficiency—building trust while enabling quick action.

**Core Design Principles:**
1. Trust through transparency - Clear visual hierarchy showing real impact
2. Action-oriented - Every screen guides users toward donating or requesting
3. Empathy-driven aesthetics - Warm, human-centered without being manipulative
4. Mobile-first execution - Most donations happen on-the-go

## Typography

**Font System (Google Fonts):**
- Primary: Inter (headings, UI elements, buttons) - Modern, highly legible
- Secondary: Open Sans (body text, form labels) - Warm, accessible

**Type Scale:**
- Hero headline: text-5xl md:text-6xl font-bold
- Section headers: text-3xl md:text-4xl font-bold
- Subheadings: text-xl md:text-2xl font-semibold
- Body text: text-base md:text-lg
- Small text/labels: text-sm
- Buttons/CTAs: text-base md:text-lg font-semibold

## Layout System

**Spacing Primitives:** Limit to Tailwind units of **2, 4, 8, 12, 16, 20** for consistency
- Component padding: p-4, p-8
- Section spacing: py-12, py-16, py-20
- Element gaps: gap-4, gap-8
- Margins: m-2, m-4, m-8

**Grid Strategy:**
- Container: max-w-7xl mx-auto px-4
- Multi-column where appropriate (features, stats, dashboard cards)
- Map section: Full-width with contained controls

## Component Library

### Landing Page Structure

**Hero Section (80vh minimum):**
- Large hero image showing food distribution/volunteers in action
- Overlaid content: headline + mission statement + 3 primary CTAs
- Glass-morphism card containing main CTAs with blur backdrop
- Statistics ticker below hero (people fed, meals saved, active donors)

**Why This Matters Section:**
- Two-column layout (lg:grid-cols-2)
- Left: Compelling statistics in large typography
- Right: Problem statement with supporting visuals
- Card-based stat displays with icons

**How It Works:**
- Three-column grid (md:grid-cols-3) showing process flow
- Icon → Title → Description pattern
- Subtle connecting lines/arrows between steps

**Call-to-Action Section:**
- Full-width with subtle pattern background
- Centered content with primary and secondary actions
- Trust indicators (number of partners, meals distributed)

### Core Application Components

**Navigation:**
- Sticky header with logo left, nav center, "Donate Now" CTA right
- Mobile: Hamburger menu with slide-in drawer
- Secondary nav for dashboard tabs

**Live Map Interface:**
- Full-width map container (min-h-screen on dedicated page, min-h-[500px] when embedded)
- Floating control panel (top-right): filters, zoom, locate me
- Bottom sheet (mobile) or sidebar (desktop) showing matched NGOs/shelters
- Custom marker clustering for dense areas
- Route overlay with dashed line animation

**Forms (Donation & Request):**
- Single-column layout with max-w-2xl
- Grouped fields with card styling
- Auto-detect location with map preview
- Progress indicator for multi-step forms
- Large, accessible input fields (h-12)
- Prominent submit button (w-full on mobile, w-auto on desktop)

**Dashboard:**
- Three-column card grid (md:grid-cols-3) for stats overview
- Two-column layout for active lists (donors/requests)
- Status badges with clear visual states
- Tabbed interface for different views
- Card-based list items with hover states

**Modals:**
- Centered overlay with backdrop blur
- Success animations (checkmark with scale animation)
- Clear hierarchy: icon → message → action buttons

### Icons & Visual Elements

**Icon Library:** Heroicons (via CDN)
- Food/donation: cake, gift icons
- Location: map-pin, location-marker
- Status: check-circle, clock, x-circle
- Navigation: menu, chevrons, arrows

**Marker Design:**
- Donor markers: Heroicons map-pin with custom pulse animation
- NGO markers: Distinct shape (home or building icon)
- Size: w-8 h-8 base, w-12 h-12 on hover/active

### Interaction Patterns

**Animations (Minimal, Purposeful):**
- Map marker entry: Scale + fade-in (duration-300)
- Matching notification: Slide-in from top (duration-500)
- Form submission: Button loading state with spinner
- Dashboard updates: Subtle fade transitions
- NO scroll-triggered animations, NO parallax

**Hover States:**
- Cards: Subtle shadow elevation increase
- Buttons: Slight scale (scale-105)
- Map markers: Scale increase + z-index bump

## Images

**Hero Section:**
- Large, high-quality image showing food distribution, volunteers serving meals, or community gathering
- Warm, authentic photography (not stock-feeling)
- Image should convey human connection and impact
- Apply subtle overlay for text readability

**Supporting Images:**
- Process section: Simple illustrations or photos showing donation flow
- Statistics section: Real photos of beneficiaries (with dignity and respect)
- Footer: Optional background pattern or texture

**Image Placement:**
- Hero: Full-width, behind glass-morphism card with CTAs
- Why This Matters: Split layout with image on one side
- Avoid images in form sections (maintain focus)

## Accessibility & Responsive Behavior

**Mobile Priorities:**
- Stack all columns to single-column
- Full-width buttons and form inputs
- Bottom sheet for map results (not sidebar)
- Larger tap targets (min 44x44px)

**Desktop Enhancements:**
- Multi-column layouts reveal
- Sidebar navigation for dashboard
- Hover states become meaningful
- Increased whitespace and breathing room

**Consistent Implementation:**
- All form inputs: Same height, padding, border treatment
- All buttons: Consistent sizing within context (primary vs secondary)
- All cards: Unified shadow, border-radius, padding system

This design creates a trustworthy, action-oriented platform that balances emotional appeal with functional efficiency, ensuring users can quickly donate or request food while feeling connected to the mission.