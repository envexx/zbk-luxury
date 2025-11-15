# UI DESIGN DOCUMENTATION
## Luxury Car Rental Platform - Global Market Ready

---

## 1. DESIGN SYSTEM FOUNDATION

### 1.1 Color Palette

#### Primary Colors
- **Luxury Gold**: `#D4AF37` - CTA buttons, premium badges, accents
  - Hover: `#C9A227`
  - RGB: (212, 175, 55)
- **Deep Navy**: `#0F1419` - Header, footer, dark backgrounds
  - RGB: (15, 20, 25)
- **White**: `#FFFFFF` - Main content background, text
  - Off-white: `#F8F9FA` - Secondary backgrounds

#### Accent Colors
- **Charcoal**: `#2D3436` - Secondary text, subtle dividers
- **Light Gray**: `#ECEFF1` - Card backgrounds, borders
- **Success Green**: `#27AE60` - Confirmation, positive actions
- **Alert Red**: `#E74C3C` - Warnings, errors
- **Info Blue**: `#3498DB` - Information highlights

#### Gradient
- **Primary Gradient**: Gold to lighter gold (#D4AF37 → #E8C547) - For premium sections
- **Dark Gradient**: Navy to charcoal (#0F1419 → #2D3436) - For hero sections

### 1.2 Typography

#### Font Stack
- **Headings**: Inter, sans-serif (modern, clean, global-friendly)
  - Font weights: 700 (bold), 600 (semibold)
- **Body Text**: Inter, sans-serif
  - Font weights: 400 (regular), 500 (medium)
- **Alternative**: System fonts fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

#### Font Sizing Scale
- H1 (Hero/Page title): 48px / 56px (desktop/mobile)
- H2 (Section title): 36px / 32px
- H3 (Subsection): 24px / 20px
- H4 (Card title): 18px / 16px
- Body Large: 16px / 14px
- Body Regular: 14px / 12px
- Caption: 12px / 11px

#### Line Height
- Headings: 1.2
- Body text: 1.6
- Captions: 1.4

#### Letter Spacing
- Headings: -0.5px (tight, premium feel)
- Body text: 0px (normal)
- Uppercase labels: 1px (elegant spacing)

### 1.3 Spacing System (8px grid)

```
Base unit: 8px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px
```

### 1.4 Shadow & Elevation

- **Shadow-sm**: `0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)`
- **Shadow-md**: `0px 3px 6px rgba(0,0,0,0.15), 0px 2px 4px rgba(0,0,0,0.12)`
- **Shadow-lg**: `0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)`
- **Shadow-xl**: `0px 15px 25px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22)`

### 1.5 Border Radius

- **Minimal**: 2px (subtle, button corners)
- **Compact**: 4px (input fields, small elements)
- **Standard**: 8px (cards, moderate elements)
- **Large**: 12px (featured sections, spacious feel)
- **Full**: 9999px (pills, badges, circular elements)

### 1.6 Animation & Transitions

- **Micro-interaction**: 150ms cubic-bezier(0.4, 0, 0.2, 1)
- **Standard**: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- **Entrance**: 300ms cubic-bezier(0.34, 1.56, 0.64, 1)
- **Exit**: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)

---

## 2. COMPONENT LIBRARY

### 2.1 Buttons

#### Primary Button
```
State: Default
- Background: #D4AF37 (Luxury Gold)
- Text: #0F1419 (Deep Navy)
- Padding: 12px 32px
- Border radius: 4px
- Font weight: 600
- Font size: 14px

State: Hover
- Background: #C9A227
- Cursor: pointer
- Transition: 150ms

State: Active/Pressed
- Background: #B8931F
- Transform: scale(0.98)

State: Disabled
- Background: #ECEFF1
- Text: #2D3436
- Cursor: not-allowed
- Opacity: 0.6
```

#### Secondary Button
```
State: Default
- Background: transparent
- Border: 1.5px solid #D4AF37
- Text: #D4AF37
- Padding: 12px 32px
- Border radius: 4px

State: Hover
- Background: rgba(212, 175, 55, 0.1)
- Border color: #C9A227

State: Active
- Background: #D4AF37
- Text: #0F1419
```

#### Ghost Button
```
State: Default
- Background: transparent
- Text: #0F1419
- Border: 1px solid #2D3436
- Padding: 10px 20px
- Font size: 14px

State: Hover
- Background: #F8F9FA
- Border color: #0F1419
```

#### Icon Button (Minimal size)
```
Size: 40px × 40px
Border radius: 4px
Icon size: 20px
Background on hover: rgba(212, 175, 55, 0.1)
```

### 2.2 Input Fields & Forms

#### Text Input
```
Default state:
- Border: 1px solid #ECEFF1
- Border radius: 4px
- Padding: 12px 14px
- Font size: 14px
- Background: #FFFFFF

Focus state:
- Border: 2px solid #D4AF37
- Box shadow: 0 0 0 3px rgba(212, 175, 55, 0.1)
- Outline: none

Error state:
- Border: 2px solid #E74C3C
- Label text: #E74C3C
- Error message: 12px, color #E74C3C
```

#### Dropdown/Select
```
- Same border/focus styling as text input
- Arrow icon: #2D3436
- Option hover: #F8F9FA background
- Selected option: #D4AF37 background, #0F1419 text
```

#### Checkbox & Radio
```
Unchecked:
- Size: 18px × 18px
- Border: 1.5px solid #2D3436
- Border radius: 2px (checkbox) / 50% (radio)

Checked:
- Background: #D4AF37
- Border: 1.5px solid #D4AF37
- Icon: #0F1419

Focus:
- Box shadow: 0 0 0 3px rgba(212, 175, 55, 0.1)
```

#### Toggle Switch
```
Default (OFF):
- Width: 48px, Height: 24px
- Background: #ECEFF1
- Thumb: #FFFFFF, positioned left
- Border radius: 12px

Active (ON):
- Background: #D4AF37
- Thumb: positioned right
- Transition: 200ms
```

#### Date Picker
```
- Calendar grid: 7 columns
- Cell size: 32px × 32px
- Selected date: #D4AF37 background
- Today: #D4AF37 border, no background
- Disabled dates: opacity 0.5, color #2D3436
- Hover date: #F8F9FA background
```

### 2.3 Cards & Containers

#### Vehicle Card (Fleet Listing)
```
Layout:
- Card dimensions: responsive (300px fixed on desktop)
- Border radius: 8px
- Background: #FFFFFF
- Shadow: shadow-md
- Overflow: hidden (image clipped)

Image section:
- Aspect ratio: 16:10
- Image optimization: WebP with fallback
- Badge position: top-right absolute
  - Badge: luxury gold background, white text
  - Padding: 8px 12px
  - Border radius: full

Content section:
- Padding: 20px

Title:
- Font size: 18px (H4)
- Font weight: 600
- Color: #0F1419
- Margin bottom: 8px

Details:
- Font size: 13px
- Color: #2D3436
- Margin bottom: 12px

Price section:
- Font size: 16px bold, color #D4AF37
- Margin bottom: 16px

Button:
- Full width
- Primary button style
- Text: "Book Now" / "Learn More"

Hover effect:
- Shadow: shadow-lg
- Transform: translateY(-4px)
- Transition: 200ms
```

#### Service Card (Horizontal)
```
Layout:
- Display: flex (horizontal)
- Gap: 20px
- Padding: 24px
- Border radius: 8px
- Background: #F8F9FA
- Border: 1px solid #ECEFF1

Icon section:
- Size: 48px × 48px
- Icon: 24px
- Icon color: #D4AF37
- Background: rgba(212, 175, 55, 0.1)
- Border radius: 6px

Content section:
- Flex: 1

Title:
- Font size: 16px, weight 600
- Color: #0F1419

Description:
- Font size: 13px
- Color: #2D3436
- Line height: 1.6
- Margin top: 8px

Hover effect:
- Background: #ECEFF1
- Icon background darker: rgba(212, 175, 55, 0.2)
```

#### Testimonial Card
```
Layout:
- Max width: 320px
- Border radius: 8px
- Background: #F8F9FA
- Padding: 24px
- Border left: 3px solid #D4AF37

Rating (stars):
- Star size: 16px
- Color: #D4AF37
- Margin bottom: 12px

Quote text:
- Font size: 14px
- Color: #0F1419
- Font style: italic
- Line height: 1.6
- Margin bottom: 16px

Author section:
- Display: flex, gap: 12px

Avatar:
- Size: 40px × 40px
- Border radius: 50%
- Image: centered cover

Name & title:
- Name: 14px bold, #0F1419
- Title: 12px, #2D3436
```

### 2.4 Navigation

#### Header/Navbar
```
Layout:
- Height: 64px
- Background: #FFFFFF
- Shadow: shadow-sm
- Position: sticky
- Display: flex, space-between
- Padding: 0 32px (desktop) / 0 16px (mobile)
- Z-index: 100

Logo:
- Height: 40px
- Aspect ratio: auto
- Click: navigate to home

Nav menu (desktop):
- Display: flex, gap: 32px
- Font size: 14px
- Font weight: 500
- Link color: #0F1419

Link hover effect:
- Color: #D4AF37
- Transition: 150ms
- Border bottom: 2px solid #D4AF37 (active state)

CTA Button:
- Position: right
- Primary button style

Mobile menu (hamburger):
- Visible: < 768px
- Icon: 24px, #0F1419
- On click: open sidebar menu
```

#### Sidebar/Mobile Menu
```
Position: fixed left, overlay
- Width: 100vw max 280px
- Height: 100vh
- Background: #0F1419
- Z-index: 101
- Slide in animation: 300ms from left

Header:
- Display: flex, space-between
- Padding: 16px
- Logo: invert/white version

Menu items:
- Color: #FFFFFF
- Padding: 16px
- Border bottom: 1px solid rgba(255,255,255,0.1)
- Font size: 14px

Item active:
- Background: rgba(212, 175, 55, 0.2)
- Left border: 3px solid #D4AF37

Overlay (outside menu):
- Background: rgba(15, 20, 25, 0.5)
- Clickable to close
```

#### Breadcrumb
```
- Font size: 12px
- Color: #2D3436
- Separator: "/"
- Gap: 8px

Current item:
- Color: #0F1419
- Font weight: 500

Hover (non-current):
- Color: #D4AF37
- Cursor: pointer
```

### 2.5 Hero Section

```
Layout:
- Height: 600px (desktop) / 400px (mobile)
- Background: dark gradient (#0F1419 → #2D3436) with overlay
- Position: relative
- Display: flex, items center, justify center
- Text align: center

Background image:
- Absolute fill
- Opacity: 0.3 (with dark overlay)
- Object fit: cover
- Z-index: 0

Content (z-index: 1):
- Max width: 800px
- Padding: 32px

Headline:
- Font size: 56px (desktop) / 32px (mobile)
- Font weight: 700
- Color: #FFFFFF
- Margin bottom: 16px
- Line height: 1.2

Subheadline:
- Font size: 18px (desktop) / 14px (mobile)
- Color: #F8F9FA
- Margin bottom: 32px
- Line height: 1.6

CTA Button:
- Primary button style
- Size: large (16px text, 14px 40px padding)

Optional: Video background
- Autoplay, muted, loop
- Fallback image for mobile/slow connection
```

### 2.6 Grid & Listing Layouts

#### Fleet Grid
```
Desktop:
- Columns: 4 columns
- Gap: 24px
- Padding: 32px

Tablet (768px - 1024px):
- Columns: 3 columns
- Gap: 20px
- Padding: 24px

Mobile (< 768px):
- Columns: 1 column
- Gap: 16px
- Padding: 16px

Each item: Vehicle Card (see 2.3)
```

#### Services Grid
```
Desktop:
- Columns: 3 columns
- Gap: 32px
- Padding: 48px 32px

Tablet:
- Columns: 2 columns
- Gap: 24px

Mobile:
- Columns: 1 column
- Gap: 20px
- Padding: 20px

Each item: Service Card (see 2.3)
```

### 2.7 Modals & Dialogs

#### Modal Container
```
Overlay:
- Background: rgba(15, 20, 25, 0.5)
- Position: fixed, full screen
- Z-index: 102
- Fade in: 150ms

Modal box:
- Background: #FFFFFF
- Border radius: 8px
- Position: centered
- Max width: 500px
- Max height: 90vh
- Overflow-y: auto
- Shadow: shadow-xl
- Z-index: 103

Animation: scale-in, 200ms cubic-bezier(0.34, 1.56, 0.64, 1)

Header (optional):
- Border bottom: 1px solid #ECEFF1
- Padding: 24px
- Display: flex, space-between

Close button:
- Icon: 24px
- Position: top-right absolute
- Hover: background #F8F9FA

Content:
- Padding: 24px

Footer (if buttons):
- Border top: 1px solid #ECEFF1
- Padding: 16px 24px
- Display: flex, gap: 12px, justify-end
```

### 2.8 Forms & Complex Inputs

#### Multi-step Form
```
Progress indicator:
- Display: horizontal steps
- Step height: 4px
- Background: #ECEFF1
- Completed: #D4AF37
- Current: #D4AF37 with animation
- Gap: 8px between steps
- Percentage text: 12px

Form section:
- Padding: 32px
- Max width: 600px

Step title:
- Font size: 24px, weight 600
- Margin bottom: 24px

Navigation:
- Buttons: Previous (secondary), Next (primary)
- Display: flex, space-between
- Margin top: 32px

Validation:
- Show error on blur
- Error color: #E74C3C
- Error icon: 12px circle alert
```

#### Date Range Picker
```
Display: two calendars side-by-side (desktop) / stacked (mobile)
- Gap: 32px between calendars

Month/Year header:
- Font size: 14px bold
- Navigation arrows: clickable
- Color: #0F1419

Calendar:
- Cell size: 40px × 40px
- Border radius: 4px

Cell states:
- Out-of-range: opacity 0.3
- In-range: background #D4AF37 (if between dates), opacity 0.3
- Start/end date: background #D4AF37
- Hover (available): background #F8F9FA
- Today: border #D4AF37

Selected range:
- Start/end: filled #D4AF37
- Between: light gold background
```

---

## 3. PAGE LAYOUTS

### 3.1 Homepage

#### Section 1: Hero
- Background: luxury car image with dark overlay
- Headline: "Experience Luxury Travel in Sangpur"
- Subheading: "Premium car rentals for every occasion"
- CTA: "Book Your Luxury Ride" (prominent primary button)
- Search widget: Quick booking section (dates, location, car type)

#### Section 2: Quick Stats
- Layout: 4 columns (responsive)
- Items: "500+ Happy Customers", "200+ Fleet", "24/7 Support", "Best Price"
- Number: 32px bold gold
- Label: 14px dark text
- Background: light gray

#### Section 3: Featured Vehicles
- Grid: 4 vehicles (see Fleet Grid layout)
- Title: "Our Premium Fleet"
- Subtitle: "Handpicked luxury vehicles for your journey"
- View All button: secondary, centered below

#### Section 4: Services
- Grid: 3 services (horizontal cards)
- Title: "Why Choose Us?"
- Icons + descriptions
- Services: Daily Rental, Corporate Events, Airport Transfer

#### Section 5: Booking Process
- 4 steps with icons
- Step 1: Select vehicle
- Step 2: Choose dates
- Step 3: Confirm details
- Step 4: Enjoy your ride
- Animation: icons slide in on scroll

#### Section 6: Testimonials
- Carousel/slider (3-4 visible)
- Testimonial cards
- Autoplay: 5 seconds
- Navigation: prev/next buttons

#### Section 7: Special Offers
- Banner: Gold background gradient
- Headline: "Limited Time Offer"
- Description + discount percentage
- CTA button
- Countdown timer (if applicable)

#### Section 8: FAQ
- Accordion layout
- 6-8 common questions
- Question in gold, expandable
- Answer: smooth slide-down animation

#### Section 9: Newsletter Signup
- Title: "Stay Updated"
- Input: email
- Button: "Subscribe"
- Subtext: "Get latest offers & updates"

#### Section 10: Footer
- Background: #0F1419
- Text: white
- 4 columns:
  - Company info
  - Quick links
  - Contact info
  - Social media links
- Bottom: Copyright, Legal links

### 3.2 Fleet/Vehicle Listing Page

#### Header
- Breadcrumb: Home > Fleet
- Page title: "Our Fleet"
- Subtitle: "Explore our collection of premium vehicles"

#### Sidebar (Left, desktop only)
- **Filters**: 
  - Car type (sedan, SUV, sports car)
  - Price range (slider)
  - Seating capacity (checkboxes)
  - Transmission (manual/automatic)
  - Apply/Reset buttons

#### Main Content
- Sort dropdown: "Recommended", "Price: Low-High", "Newest"
- Grid: Fleet grid (see 2.6)
- Pagination or infinite scroll
- Loading state: skeleton cards during load

#### Mobile
- Filters in collapsible drawer (bottom sheet)
- Grid: 1 column responsive

### 3.3 Vehicle Detail Page

#### Hero Section
- Large image carousel (5+ images)
- Thumbnail strip below
- Next/Prev buttons
- Full screen button (optional)

#### Specs & Info (Two-column)
- Left column:
  - Car name + year model
  - Rating (5 stars)
  - Price (prominent gold)
  - Quick specs (seats, transmission, engine)
  
- Right column:
  - Key features (list)
  - Availability calendar
  - "Book Now" CTA (sticky on scroll mobile)

#### Booking Form
- Accordion or modal
- Fields: Start date, End date, Location, Passenger count
- Driver selection: with driver / self-drive
- Total price calculation
- Submit button

#### Details Section
- Tabs:
  - Overview (description)
  - Specifications (detailed table)
  - Amenities (grid icons)
  - Insurance (info cards)

#### Reviews Section
- Average rating display
- Filter by rating
- Review cards: avatar, name, rating, text
- Pagination
- "Write Review" button

#### Related Vehicles
- Grid: 4 vehicles same category
- Carousel on mobile

### 3.4 Services Page

#### Hero
- Headline: "Our Services"
- Subheading: "Tailored solutions for every need"

#### Service Categories
- Grid: 3 services
- Each service card with icon, title, description
- Click to expand or navigate

#### Service Detail Sections
- For each service (Daily Rental, Corporate, Airport Transfer, etc.):
  - Description paragraph
  - Benefits list (checkmarks)
  - Image/illustration
  - CTA button

#### Pricing Table
- Columns: Service, Duration, Price, CTA
- Highlight recommended option
- Mobile: scrollable table

### 3.5 Booking Confirmation Page

#### Success State
- Checkmark icon (large, green)
- "Booking Confirmed!" headline
- Confirmation details card:
  - Booking ID
  - Vehicle details
  - Dates & times
  - Total amount
  - Rental location
  
#### Action Buttons
- Download invoice (PDF)
- View booking
- Back to home

#### Contact Info
- "Need help?" section
- Phone, email, chat
- Support hours

### 3.6 User Account Page

#### Sidebar Navigation
- Dashboard
- My Bookings
- Profile
- Payment methods
- Settings
- Logout

#### Dashboard
- Welcome message
- Upcoming bookings (cards)
- Past bookings (table)
- Quick actions

#### Profile Section
- Form: Name, email, phone
- Profile picture upload
- Address details
- License details (optional)
- Save button

#### My Bookings
- Filter: Upcoming, past, cancelled
- Booking cards or table:
  - Vehicle name & image
  - Dates
  - Status (confirmed, pending, completed)
  - Actions: View details, cancel, reschedule

---

## 4. RESPONSIVE DESIGN BREAKPOINTS

```
Mobile:     < 640px (small phones)
Tablet:     640px - 1024px
Desktop:    1024px - 1440px
Large:      > 1440px

Key breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
```

### Responsive Rules

- **Header**: Full-width always, height 60px mobile / 64px desktop
- **Navigation**: Hamburger < md, full menu ≥ md
- **Grid columns**: 1 (mobile), 2 (tablet), 3-4 (desktop)
- **Padding**: 16px (mobile), 24px (tablet), 32px (desktop)
- **Font sizes**: Reduce by 2-4px on mobile
- **Modals**: Full width - 16px margin on mobile

---

## 5. INTERACTIVE ELEMENTS & MICRO-INTERACTIONS

### 5.1 Button Interactions
```
Click feedback:
- Scale: 0.98
- Duration: 100ms
- Spring: cubic-bezier(0.34, 1.56, 0.64, 1)

Hover glow (premium buttons):
- Box shadow: 0 0 20px rgba(212, 175, 55, 0.3)
- Duration: 200ms
```

### 5.2 Form Validation
```
Real-time feedback:
- On blur: show error (if invalid)
- Input focus: highlight in gold
- Success: green checkmark icon (right side)
- Error: red X icon + error message below

Animation: error message slide-in from top, 200ms
```

### 5.3 Page Transitions
```
Enter animation:
- Fade in: 300ms
- Stagger children: 50ms offset

Exit animation:
- Fade out: 200ms

Loading state:
- Skeleton screens (pulse animation)
- Pulse duration: 1.5s infinite
```

### 5.4 Scroll Animations
```
Reveal on scroll:
- Elements fade in + slide up (20px) as they enter viewport
- Duration: 400ms
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

Parallax effect (optional):
- Hero image moves slower than scroll (0.5x speed)
- Creates depth, premium feel
```

### 5.5 Image Carousel
```
Auto-advance: 5 seconds (if autoplay enabled)
Transition: fade/slide, 400ms
Dots navigation:
- Active dot: #D4AF37
- Inactive: #ECEFF1
- Click: jump to slide
```

---

## 6. ACCESSIBILITY (A11Y) STANDARDS

### 6.1 Color Contrast
- AA standard: 4.5:1 for normal text, 3:1 for large text
- All text on gold buttons: Navy text (212, 175, 55 bg vs 15, 20, 25 text) = 16.24:1 ✓
- All text on dark backgrounds: White/light text required

### 6.2 Focus States
```
All interactive elements must have visible focus:
- Outline: 2px solid #D4AF37
- Outline offset: 2px
- Border radius: inherit
- Never remove focus (no outline: none)
```

### 6.3 ARIA Labels
- Buttons: aria-label for icon-only buttons
- Forms: label associated with input (htmlFor)
- Modals: role="dialog", aria-labelledby, aria-modal="true"
- Nav: role="navigation" or <nav> element
- Images: alt text (descriptive)

### 6.4 Keyboard Navigation
- Tab order: logical, left-to-right
- Tab trap: prevent in sticky headers
- Escape key: close modals, menus
- Enter key: confirm forms, activate buttons
- Arrow keys: navigate carousels, date pickers

### 6.5 Screen Reader Optimization
- Use semantic HTML: <nav>, <header>, <footer>, <main>
- Skip link: "Skip to main content" (visible on focus)
- Heading hierarchy: H1 → H2 → H3 (never skip levels)
- Form labels: always associated
- Icon buttons: aria-label required

---

## 7. PERFORMANCE REQUIREMENTS

### 7.1 Image Optimization
- Format: WebP with JPEG fallback
- Responsive: srcSet for different screen sizes
- Lazy loading: intersection observer or loading="lazy"
- Compression: < 150KB for hero images, < 50KB for thumbnails

### 7.2 CSS & JS
- CSS: Critical CSS inlined, defer non-critical
- JS: Code splitting by page/component
- Bundle size: < 100KB gzipped initial
- Remove unused CSS: PurgeCSS/TailwindCSS

### 7.3 Fonts
- Font weight: limit to 400, 600, 700
- Font display: swap (for web fonts)
- Preload: @font-face with preload link
- System fonts as fallback

### 7.4 Core Web Vitals Targets
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## 8. DARK MODE (Optional Enhancement)

### Dark Mode Colors
- Background: `#0A0E12` (darker navy)
- Surface: `#1A1F28` (card background)
- Text: `#F5F7FA` (soft white)
- Accent: `#D4AF37` (same gold)
- Border: `#2D3436` (darker gray)

### Implementation
- Respect system preference (prefers-color-scheme)
- Toggle button in header (optional)
- Store preference in localStorage/CMS

---

## 9. COMPONENT USAGE EXAMPLES

### Example: Vehicle Card Component

```
<VehicleCard>
  <VehicleImage src={carImage} alt={carName} />
  <Badge>Luxury</Badge>
  <VehicleTitle>Mercedes-Benz S-Class</VehicleTitle>
  <VehicleDetails>4 Seats • Automatic • 2024</VehicleDetails>
  <PriceTag>$350/day</PriceTag>
  <Button variant="primary">Book Now</Button>
</VehicleCard>
```

### Example: Service Card Component

```
<ServiceCard>
  <ServiceIcon src={iconSrc} />
  <ServiceTitle>Airport Transfer</ServiceTitle>
  <ServiceDescription>
    Arrive in style with our dedicated airport 
    transfer service. Professional drivers ensure 
    punctuality and comfort.
  </ServiceDescription>
</ServiceCard>
```

### Example: Form Component

```
<Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label htmlFor="startDate">Start Date</Label>
    <DatePicker id="startDate" {...props} />
  </FormGroup>
  
  <FormGroup>
    <Label htmlFor="vehicle">Select Vehicle</Label>
    <Select id="vehicle" options={vehicles} />
  </FormGroup>
  
  <FormError>{error}</FormError>
  
  <Button type="submit" variant="primary">
    Continue Booking
  </Button>
</Form>
```

---

## 10. IMPLEMENTATION NOTES FOR AI AGENT

### Design Token Export
Export all design tokens as JSON for consistency:
```json
{
  "colors": {
    "primary": "#D4AF37",
    "dark": "#0F1419",
    ...
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    ...
  },
  "typography": {
    "h1": {
      "fontSize": "48px",
      "fontWeight": 700,
      ...
    }
  }
}
```

### Component Library Structure
Organize components in Storybook:
- Atoms (Button, Input, Icon, Badge, Label)
- Molecules (FormGroup, Card, SearchBar, Pagination)
- Organisms (Header, Hero, Fleet Grid, Testimonial Carousel)
- Templates (HomePage, ListingPage, DetailPage)
- Pages (Actual page implementations)

### File Structure
```
/components
  /atoms
    /Button.tsx
    /Input.tsx
    /Icon.tsx
    /Badge.tsx
  /molecules
    /Card.tsx
    /FormGroup.tsx
    /Carousel.tsx
  /organisms
    /Header.tsx
    /Hero.tsx
    /Footer.tsx
  /templates
    /Layout.tsx

/pages
  /index.tsx (homepage)
  /fleet.tsx
  /[vehicleId].tsx
  /services.tsx
  /booking.tsx

/styles
  /globals.css (global styles)
  /tokens.css (design tokens)

/hooks
  /useBooking.ts
  /useFilters.ts

/utils
  /formatPrice.ts
  /validateForm.ts
```

### CSS Architecture
Use CSS-in-JS (styled-components) or Tailwind CSS with custom config:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'luxury-gold': '#D4AF37',
        'deep-navy': '#0F1419',
        'charcoal': '#2D3436',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      fontSize: {
        'h1': '48px',
        'h2': '36px',
        'h3': '24px',
      }
    }
  }
}
```

---

## 11. SECTION-BY-SECTION DETAILED SPECS

### 11.1 Hero Section Deep Dive

#### Desktop Version
```
Viewport height: 600px
Content alignment: center, center
Content max-width: 800px

Background:
- Image: 1920x1200px luxury car (e.g., Mercedes in scenic location)
- Overlay: linear-gradient(135deg, rgba(15,20,25,0.6), rgba(15,20,25,0.4))

Headline layout:
- Margin bottom: 16px
- Animation on load: fade-in + slide-up (20px origin)
- Stagger delay: 0ms

Subheadline:
- Margin bottom: 32px
- Animation: fade-in + slide-up (stagger 100ms)
- Max width: 600px

CTA Button:
- Size: large (18px text, 16px 48px padding)
- Animation: fade-in (stagger 200ms)
- Glow on hover: box-shadow 0 0 30px rgba(212, 175, 55, 0.4)

Search widget below CTA (optional):
- Margin top: 32px
- Background: rgba(255, 255, 255, 0.95)
- Border radius: 4px
- Padding: 20px
- Form fields: inline flex
  - Select vehicle
  - Start date picker
  - End date picker
  - Location dropdown
  - Search button (gold)
- Mobile: stacked vertically
```

#### Mobile Version
```
Viewport height: 400px
Padding: 32px 16px
Content alignment: center

Font adjustments:
- Headline: 32px (from 56px)
- Subheading: 14px (from 18px)

Button: full width (minus padding)
Search widget: below, stacked
```

### 11.2 Fleet Grid Section

#### Container
```
Max width: 1400px
Margin: 0 auto
Padding: 64px 32px
Background: #FFFFFF
```

#### Section Header
```
Text align: center
Margin bottom: 48px

Title:
- Font size: 36px
- Font weight: 700
- Color: #0F1419
- Margin bottom: 12px

Subtitle:
- Font size: 16px
- Color: #2D3436
- Max width: 500px
- Margin: 0 auto

Divider (optional):
- Height: 3px
- Width: 60px
- Background: #D4AF37
- Margin: 12px auto
```

#### Grid Configuration
- Desktop: grid-template-columns: repeat(4, 1fr)
- Tablet (lg): repeat(3, 1fr)
- Tablet (md): repeat(2, 1fr)
- Mobile: repeat(1, 1fr)
- Gap: 24px

#### Vehicle Card Hover State
```
Elevation increase: shadow-lg
Y position: -8px (translateY)
Duration: 200ms
Image zoom: 1.05x scale
Transition: all 300ms ease-out
```

### 11.3 Services Section

#### Layout
```
Background: linear-gradient(135deg, #F8F9FA, #FFFFFF)
Padding: 80px 32px
Max width: 1400px
Margin: 0 auto
```

#### Cards
- Grid: 3 columns (responsive)
- Gap: 32px
- Card min-height: 320px

#### Service Card Detailed
```
Border radius: 8px
Background: #FFFFFF
Padding: 32px 24px
Border: 1px solid #ECEFF1
Position: relative
Overflow: hidden

Icon wrapper:
- Width: 56px
- Height: 56px
- Background: linear-gradient(135deg, #D4AF37, #E8C547)
- Border radius: 8px
- Display: flex
- Align items: center
- Justify content: center
- Icon color: #FFFFFF
- Icon size: 28px
- Margin bottom: 20px
- Box shadow: 0 8px 16px rgba(212, 175, 55, 0.2)

Title:
- Font size: 20px
- Font weight: 600
- Color: #0F1419
- Margin bottom: 12px

Description:
- Font size: 14px
- Color: #2D3436
- Line height: 1.8
- Margin bottom: 24px

Link/Button:
- Text: "Learn More →"
- Color: #D4AF37
- Font weight: 600
- Cursor: pointer
- Hover: text-decoration underline

Hover effect:
- Border color: #D4AF37
- Icon shadow stronger: 0 12px 24px rgba(212, 175, 55, 0.3)
- Icon scale: 1.05x
- Y position: -4px
- Transition: 300ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

### 11.4 Testimonials Carousel

#### Container
```
Background: #0F1419
Color: white
Padding: 80px 32px
```

#### Section Header (white text)
```
Text align: center
Margin bottom: 48px

Title: 36px bold white
Subtitle: 16px light gray
```

#### Carousel
```
Position: relative
Max width: 1200px
Margin: 0 auto

Visible cards: 3 (desktop), 2 (tablet), 1 (mobile)
Gap: 24px

Card styling:
- Background: rgba(255, 255, 255, 0.1)
- Border: 1px solid rgba(212, 175, 55, 0.3)
- Border radius: 8px
- Padding: 32px 24px
- Backdrop filter: blur(10px) (premium glass effect)
- Text color: #FFFFFF
- Min height: 280px
- Display: flex
- Flex direction: column
- Justify content: space-between

Stars:
- Size: 16px
- Color: #D4AF37
- Gap: 4px
- Margin bottom: 16px

Quote text:
- Font size: 15px
- Font style: italic
- Line height: 1.8
- Margin bottom: 24px

Author section:
- Display: flex
- Gap: 16px
- Align items: center

Avatar:
- Width: 48px
- Height: 48px
- Border radius: 50%
- Object fit: cover
- Border: 2px solid #D4AF37

Author info:
- Name: 14px bold
- Title: 12px gray
- Display: flex
- Flex direction: column
- Gap: 4px

Navigation:
- Prev/Next buttons: positioned absolute
- Position: top, outside carousel
- Size: 40x40px
- Icon: 20px chevron
- Background: rgba(212, 175, 55, 0.2)
- Color: #D4AF37
- Hover: background rgba(212, 175, 55, 0.4)
- Border radius: 4px

Dots:
- Position: bottom center
- Gap: 8px
- Active dot: background #D4AF37
- Inactive dot: background rgba(212, 175, 55, 0.3)
- Dot size: 8px circle
- Cursor: pointer on inactive

Autoplay:
- Speed: 5 seconds
- Pause on hover
```

### 11.5 Booking Form

#### Form Container
```
Max width: 600px
Margin: 0 auto
Padding: 40px
Background: #F8F9FA
Border radius: 8px
```

#### Progress Indicator (if multi-step)
```
Display: flex
Gap: 12px
Align items: center
Margin bottom: 32px

Step indicator:
- Circle: 32px diameter
- Number: 16px bold
- Background: #ECEFF1
- Color: #2D3436
- Completed step: background #D4AF37, color white
- Current step: background #D4AF37, color white, box-shadow with pulse

Line between steps:
- Height: 2px
- Background: #ECEFF1
- Completed: #D4AF37
- Flex: 1
```

#### Form Fields
```
Field wrapper:
- Margin bottom: 20px

Label:
- Font size: 13px
- Font weight: 600
- Color: #0F1419
- Display: block
- Margin bottom: 6px
- Required indicator: * (color #E74C3C)

Input field:
- Width: 100%
- Padding: 12px 14px
- Font size: 14px
- Border: 1px solid #ECEFF1
- Border radius: 4px
- Transition: all 150ms

Focus state:
- Border: 2px solid #D4AF37
- Box shadow: 0 0 0 3px rgba(212, 175, 55, 0.1)
- Outline: none

Error state:
- Border: 2px solid #E74C3C
- Background: rgba(231, 76, 60, 0.05)

Helper text:
- Font size: 12px
- Color: #2D3436
- Margin top: 4px

Error message:
- Font size: 12px
- Color: #E74C3C
- Margin top: 4px
- Icon: ⚠ (12px)
```

#### Date Picker Popup
```
Position: absolute below input
Background: #FFFFFF
Border: 1px solid #ECEFF1
Border radius: 4px
Shadow: shadow-lg
Z-index: 10
Min width: 300px

Calendar:
- Display: grid (7 columns for days)
- Gap: 4px
- Padding: 12px

Day cells:
- Aspect ratio: 1
- Display: flex
- Align items: center
- Justify content: center
- Border radius: 4px
- Cursor: pointer
- Font size: 14px

Cell states:
- Today: border 2px #D4AF37, no background
- Selected: background #D4AF37, color white
- In-range (between dates): background rgba(212, 175, 55, 0.2)
- Out-of-range: opacity 0.4, cursor not-allowed
- Hover (enabled): background #F8F9FA

Transition: all 100ms ease
```

#### Submit Button
```
Style: primary (gold)
Width: 100%
Height: 48px
Font size: 16px
Font weight: 600
Margin top: 24px
Border radius: 4px

Loading state:
- Content: spinner animation (24px, 2px stroke)
- Button disabled: cursor not-allowed
```

### 11.6 Vehicle Detail Page

#### Image Gallery

```
Container:
- Width: 100%
- Height: 600px (desktop), 400px (mobile)
- Background: #F8F9FA
- Position: relative

Main image:
- Width: 100%
- Height: 100%
- Object fit: cover
- Object position: center

Thumbnail strip:
- Position: absolute bottom
- Height: 80px
- Background: rgba(0, 0, 0, 0.3)
- Display: flex
- Gap: 8px
- Padding: 8px
- Overflow-x: auto
- Scrollbar style: hide/minimal

Thumbnail:
- Width: 60px
- Height: 60px
- Border radius: 4px
- Cursor: pointer
- Opacity: 0.7
- Border: 2px solid transparent

Active thumbnail:
- Opacity: 1
- Border: 2px solid #D4AF37

Navigation arrows:
- Position: absolute (left/right)
- Size: 48px
- Icon: 24px
- Background: rgba(0, 0, 0, 0.5)
- Color: white
- Border radius: 4px
- Hover: background rgba(0, 0, 0, 0.8)
- Cursor: pointer
- Top: 50%
- Transform: translateY(-50%)

Fullscreen button:
- Position: top-right absolute
- Size: 40px
- Icon: 20px
- Background: rgba(0, 0, 0, 0.5)
- Color: white
- Border radius: 4px
- Hover: background rgba(0, 0, 0, 0.8)
- Margin: 12px
```

#### Info Sidebar (Right column, desktop)

```
Width: 35%
Position: sticky
Top: 80px (below header)

Car title:
- Font size: 28px
- Font weight: 700
- Color: #0F1419

Rating:
- Stars: 5x16px, color #D4AF37
- Text: "4.8 (128 reviews)", 12px gray
- Margin: 8px 0

Separator line:
- Height: 1px
- Background: #ECEFF1
- Margin: 16px 0

Price section:
- Display: flex
- Align items: baseline
- Gap: 8px

Price tag:
- Font size: 32px
- Font weight: 700
- Color: #D4AF37
- Text: "/day" 14px after

Quick specs grid:
- Display: grid (2 columns)
- Gap: 12px
- Margin: 20px 0

Spec item:
- Background: #F8F9FA
- Padding: 12px
- Border radius: 4px
- Border left: 3px solid #D4AF37

Spec label: 12px gray
Spec value: 16px bold navy

Features list:
- Margin: 20px 0

Feature item:
- Display: flex
- Gap: 8px
- Align items: center
- Font size: 14px
- Margin bottom: 10px

Feature icon: 16px green checkmark

Separator:
- Height: 1px
- Background: #ECEFF1
- Margin: 20px 0

Booking section:
- Background: #F8F9FA
- Padding: 20px
- Border radius: 8px
- Margin: 20px 0

CTA button:
- Width: 100%
- Primary style
- Text: "Book This Vehicle"

Contact section:
- Font size: 13px
- Color: #2D3436
- Text align: center

Support link:
- Color: #D4AF37
- Text decoration: underline on hover
```

#### Details Tabs Section (Below gallery)

```
Tab navigation:
- Display: flex
- Gap: 0 (tabs touch)
- Border bottom: 2px solid #ECEFF1
- Margin bottom: 32px

Tab item:
- Padding: 16px 24px
- Font size: 14px
- Font weight: 600
- Color: #2D3436
- Cursor: pointer
- Border bottom: 3px solid transparent
- Position: relative

Tab hover:
- Color: #D4AF37

Tab active:
- Color: #D4AF37
- Border bottom: 3px solid #D4AF37
- Background: transparent

Tab content:
- Animation: fade-in + slide-up (200ms)

Overview tab:
- Description paragraph: 16px, line-height 1.8
- Images: responsive, max-width 100%
- Lists: bullet points with gold bullets

Specifications tab:
- Display: grid or table
- Columns: Specification | Value
- Row: padding 12px, border-bottom 1px #ECEFF1
- Striped: alternate #FFFFFF and #F8F9FA

Amenities tab:
- Grid: 3 columns (responsive)
- Gap: 16px

Amenity item:
- Display: flex
- Flex direction: column
- Gap: 8px
- Align items: center
- Text align: center

Icon: 40px, color #D4AF37
Label: 14px

Insurance tab:
- Display: cards or accordion

Insurance card:
- Background: #F8F9FA
- Padding: 20px
- Border radius: 8px
- Border left: 3px solid #D4AF37
- Margin bottom: 16px

Insurance title: 16px bold
Description: 14px
Price: 14px bold gold
```

#### Reviews Section

```
Container:
- Margin top: 60px
- Padding: 40px 0
- Border top: 2px solid #ECEFF1

Header:
- Display: flex
- Justify content: space-between
- Align items: center
- Margin bottom: 32px

Title: 28px bold navy

Rating summary:
- Display: flex
- Gap: 16px
- Align items: center

Average score: 32px bold gold
Star: 16px
Review count: 14px gray

Filter buttons:
- Display: flex
- Gap: 8px

Filter button (rating):
- Padding: 8px 16px
- Border: 1px solid #ECEFF1
- Background: white
- Border radius: 20px
- Font size: 13px
- Cursor: pointer

Active filter:
- Background: #D4AF37
- Border: 1px solid #D4AF37
- Color: white

Reviews list:
- Display: grid
- Gap: 20px

Review card:
- Background: #F8F9FA
- Padding: 24px
- Border radius: 8px
- Border: 1px solid #ECEFF1

Review header:
- Display: flex
- Justify content: space-between
- Align items: start
- Margin bottom: 12px

Author info (left):
- Display: flex
- Gap: 12px

Avatar: 40x40px, border-radius 50%

Author details:
- Name: 14px bold navy
- Date: 12px gray

Rating (right):
- Stars: 16px gold
- Verified badge: 11px, background #E8F5E9, color #27AE60

Review text:
- Font size: 14px
- Color: #0F1419
- Line height: 1.8
- Margin bottom: 12px

Review actions:
- Display: flex
- Gap: 16px
- Font size: 12px

Helpful button:
- Icon: thumbs up
- Text: "Helpful (12)"
- Color: #2D3436
- Cursor: pointer
- Hover: color #D4AF37

Report button:
- Icon: flag
- Text: "Report"
- Color: #2D3436

Pagination:
- Center aligned
- Numbers or dots
- Gap: 4px
- Active: background #D4AF37, color white
- Hover: background #F8F9FA
```

### 11.7 Footer Section

```
Background: #0F1419
Color: #FFFFFF
Padding: 60px 32px 20px
```

#### Footer Content Grid
```
Display: grid (4 columns desktop, responsive)
Gap: 40px
Max width: 1400px
Margin: 0 auto
Margin bottom: 40px

Column 1 - Company Info:
Logo: 40px height
Description: 14px, color rgba(255,255,255,0.7)
Social icons: 24px, gap 12px

Column 2 - Quick Links:
Title: 14px bold white
Links:
  - 14px, color rgba(255,255,255,0.7)
  - Hover: color #D4AF37
  - Underline on hover
  - Gap between: 12px

Column 3 - Support:
Title: 14px bold white
Links: same as column 2

Column 4 - Contact:
Title: 14px bold white
Phone: 16px bold, color #D4AF37
Email: 14px, color rgba(255,255,255,0.7)
Hours: 12px, color rgba(255,255,255,0.7)
```

#### Bottom Bar
```
Border top: 1px solid rgba(255,255,255,0.1)
Padding: 20px 0
Display: flex
Justify content: space-between
Align items: center

Left: Copyright text, 12px
Center: Payment methods icons (12 years old images/SVGs)
Right: Legal links (Privacy, Terms, etc.)
  - 12px
  - Color: rgba(255,255,255,0.7)
  - Hover: #D4AF37
  - Gap: 16px
  - Separator: " | " between links
```

---

## 12. STATE MANAGEMENT & DATA FLOW

### 12.1 Booking Flow States

```
States:
1. Browse → Select vehicle
2. Search → Set dates & location
3. Review → Confirm booking details
4. Payment → Process payment
5. Confirmation → Success screen

Data required:
- Vehicle ID
- Start date & time
- End date & time
- Pickup location
- Dropoff location
- Passenger count
- Insurance selection
- Driver option (with/without)
- Customer info (name, email, phone)
- Payment info
```

### 12.2 Component State Pattern (React)

```typescript
// Booking context
const [booking, setBooking] = useState({
  vehicleId: null,
  startDate: null,
  endDate: null,
  location: null,
  passengers: 1,
  insurance: 'basic',
  driver: 'without',
  totalPrice: 0,
});

// UI state
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [step, setStep] = useState(1); // 1-5

// Filter state (Fleet page)
const [filters, setFilters] = useState({
  vehicleType: [],
  priceRange: [0, 1000],
  seating: [],
  transmission: [],
});
```

---

## 13. SEO INTEGRATION POINTS (For AI Implementation)

### 13.1 Meta Tags in Components
```typescript
// useHead hook
useHead({
  title: 'Mercedes-Benz S-Class | Luxury Car Rental Sangpur',
  meta: [
    { name: 'description', content: '...' },
    { property: 'og:title', content: '...' },
    { property: 'og:image', content: imageUrl },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Mercedes-Benz S-Class',
    image: imageUrl,
    ...
  }
});
```

### 13.2 URL Structure (Already defined in SEO doc)
- Fleet: `/fleet/`
- Vehicle: `/fleet/[vehicleId]/` or `/fleet/[vehicleName]/`
- Blog: `/blog/[slug]/`
- Services: `/services/[serviceSlug]/`

### 13.3 Breadcrumb Schema
```typescript
<BreadcrumbSchema>
  <item position="1" name="Home" url="/" />
  <item position="2" name="Fleet" url="/fleet" />
  <item position="3" name="Mercedes-Benz S-Class" url="/fleet/mercedes-s-class" />
</BreadcrumbSchema>
```

---

## 14. ANIMATION LIBRARY RECOMMENDATIONS

### 14.1 For Next.js
- **Framer Motion**: Complex animations, page transitions
- **React Spring**: Fluid, physics-based animations
- **AOS (Animate On Scroll)**: Scroll-trigger animations

### 14.2 Key Animations
```javascript
// Page entrance
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Button hover
const buttonHoverVariants = {
  hover: {
    scale: 1.02,
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
  }
};
```

---

## 15. TESTING CHECKLIST FOR AI IMPLEMENTATION

### 15.1 Visual Testing
- [ ] All colors match design tokens
- [ ] Typography hierarchy correct (font sizes, weights)
- [ ] Spacing consistent (8px grid)
- [ ] Images optimized and responsive
- [ ] Shadows/elevation correct
- [ ] Borders and radius applied correctly

### 15.2 Responsive Testing
- [ ] Desktop (1440px): All sections display correctly
- [ ] Tablet (768px): Grid collapses, layout adjusts
- [ ] Mobile (375px): Single column, touch-friendly
- [ ] Navigation collapses to hamburger < 768px
- [ ] All images scale properly
- [ ] Forms are touch-friendly (48px min height)

### 15.3 Interaction Testing
- [ ] Button hover states work
- [ ] Form validation shows errors
- [ ] Modal opens/closes smoothly
- [ ] Carousel navigation works (prev/next + dots)
- [ ] Dropdown menus open/close
- [ ] Sticky header behavior correct
- [ ] Scroll animations trigger properly

### 15.4 Accessibility Testing
- [ ] WCAG AA contrast achieved
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader announces elements correctly
- [ ] Focus indicators visible
- [ ] No focus traps
- [ ] Images have alt text
- [ ] Forms labeled properly

### 15.5 Performance Testing
- [ ] LCP < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms
- [ ] Images lazy load
- [ ] CSS minified
- [ ] JS code split
- [ ] Bundle size appropriate

---

## 16. COLOR SPECIFICATIONS FOR DEVELOPERS

### Primary Gold (#D4AF37)
```
RGB: rgb(212, 175, 55)
HSL: hsl(45, 69%, 52%)
HEX: #D4AF37
Usage: Primary CTA, badges, borders, icons
```

### Deep Navy (#0F1419)
```
RGB: rgb(15, 20, 25)
HSL: hsl(210, 25%, 8%)
HEX: #0F1419
Usage: Headings, dark backgrounds, text
```

### Additional colors with RGB/HSL for consistency across platforms

---

## 17. FINALIZATION NOTES

This documentation covers:
✅ Complete design system with tokens
✅ Component specifications with all states
✅ Page-by-page layout details
✅ Responsive breakpoints
✅ Accessibility guidelines
✅ Performance requirements
✅ SEO integration points
✅ Animation specifications
✅ Implementation patterns
✅ Testing checklists

**For AI Agent**: Follow this documentation exactly. Each component must match the specified colors, spacing, typography, and states. All pages must be responsive according to breakpoints. Implement accessibility features (focus states, ARIA labels, semantic HTML). Optimize images with Next.js Image component and lazy loading.

**Questions for Clarification Before Development**:
- Confirmation on color preferences?
- Animation complexity level acceptable?
- Any existing brand guidelines to incorporate?
- Preferred animation library (Framer Motion vs alternatives)?
- CMS platform confirmed (Strapi, Sanity, etc.)?