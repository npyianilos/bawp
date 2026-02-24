# Card Components

## Overview
Card components present high-level content details in modular, interactive containers. Apricot provides specialized card variants for events, resources, media, CTAs, and promos.

**Import:** `import { SimpleCard, EventCard, MediaCard, ResourceCard, CTACard, PromoCard } from "@cb/apricot-react";`

## Component Variants

### SimpleCard
Basic card container with optional shadow and border radius.

**Props:**
```typescript
interface ISimpleCardProps {
    id?: string;
    className?: string;
    boxShadow?: boolean;        // Default: true
    borderRadius?: boolean;     // Default: true
    disabled?: boolean;
    children?: React.ReactNode;
}
```

**Usage:**
```tsx
<SimpleCard>
    <h3>Card Title</h3>
    <p>Card content goes here</p>
</SimpleCard>

// No shadow or border radius
<SimpleCard boxShadow={false} borderRadius={false}>
    <p>Flat card</p>
</SimpleCard>
```

### EventCard
Display event details with date/time, buttons, and optional featured media.

**Props:**
```typescript
interface IEventCardProps {
    // Content
    title?: string | React.ReactElement;
    titleHeadingLevel?: number;         // Default: 3
    description?: string | React.ReactElement;
    cardLabel?: string;
    overline?: string;
    
    // Date/Time
    dateTime?: string[];                // Date/time tags
    
    // Buttons
    primary?: ICardBtnProps;            // Primary button
    secondary?: ICardBtnProps[];        // Secondary buttons
    
    // Featured card
    featured?: boolean;                 // Featured event card
    cardImage?: string;                 // Featured image
    
    // Event timeline
    eventYear?: number;                 // Year stamp
    yearHeadingLevel?: number;          // Default: 2
    repeatYear?: boolean;               // Same year as previous
    
    // Accessibility
    titleId?: string;
    descId?: string;
    overlineId?: string;
    dateTimeId?: string;
    cardRole?: string;
    ariaLabel?: string;
    ariaLabelledbyID?: string;
    
    // Styling
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    disabled?: boolean;
}

interface ICardBtnProps {
    buttonId?: string;
    label: string;
    href?: string;
    target?: string;
    buttonClass?: string;
}
```

**Usage:**
```tsx
// Basic event card
<EventCard
    dateTime={['APR 12, 2021', '11:59 PM ET']}
    cardLabel="LABEL"
    title="SAT Registration Deadline"
    description="Registration deadline for November 17 SAT Admin."
    primary={{ label: 'Primary', href: '/register' }}
    secondary={[
        { label: 'Secondary 1', href: '/info' },
        { label: 'Secondary 2', href: '/details' }
    ]}
/>

// Featured event card with image
<EventCard
    featured
    cardImage="/path/to/image.jpg"
    overline="FEATURED EVENT"
    title="Annual College Fair"
    description="Meet representatives from 100+ colleges"
    dateTime={['MARCH 15, 2026', '2:00 PM - 6:00 PM']}
    primary={{ label: 'Register Now', href: '/register' }}
/>

// Event timeline
<ul>
    <EventCard
        eventYear={2024}
        title="First Event"
        dateTime={['JAN 15']}
    />
    <EventCard
        eventYear={2024}
        repeatYear  // Same year as previous
        title="Second Event"
        dateTime={['FEB 20']}
    />
</ul>
```

**When to Use:**
- Surfacing dated events
- Event lists and timelines
- Event details requiring CTAs
- Showing event date, time, title, description, and buttons

### MediaCard
Video or media preview with modal playback.

**Props:**
```typescript
interface IMediaCardProps {
    // Content
    title?: string | React.ReactElement;
    titleHeadingLevel?: number;         // Default: 3
    description?: string | React.ReactElement;
    overline?: string;                  // Default: 'Video'
    cardImage?: string;                 // Thumbnail image
    mediaMetaInfo?: string[];           // Duration, size, etc. (ALL CAPS)
    
    // Video modal
    videoSrc: string;                   // Video URL
    videoTitle?: string;
    modalId?: string;
    headerId?: string;
    closeModalAriaLabel?: string;       // Default: 'Close Modal'
    
    // Modal behavior
    clickOverlayToClose?: boolean;      // Default: true
    escClose?: boolean;                 // Default: true
    onClose?: () => void;
    onShow?: () => void;
    role?: string;                      // Default: 'dialog'
    
    // Animation
    openAnimation?: boolean;            // Default: true
    closeAnimation?: boolean;           // Default: true
    awaitOpenAnimation?: boolean;       // Default: true
    awaitCloseAnimation?: boolean;      // Default: true
    
    // Accessibility
    disableHeightAdjustment?: boolean;
    disableHeightAdjustmentAria?: string;
    
    // Analytics
    analytics?: boolean;                // Default: false
    analyticsTitle?: string;
    analyticsOnClose?: boolean;         // Default: false
    
    // IDs
    videoCardId?: string;
    titleId?: string;
    descId?: string;
    overlineId?: string;
    cardRole?: string;
    ariaLabel?: string;
    ariaLabelledbyID?: string;
    
    // Styling
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    modalClassName?: string;
    classNameOverlay?: string;
    disabled?: boolean;
    
    customAttributes?: Record<string, any>;
    shadowRoot?: ShadowRoot;
}
```

**Usage:**
```tsx
<MediaCard
    title="Introduction to AP U.S. History"
    description="A comprehensive overview of the AP U.S. History course"
    cardImage="/thumbnails/ap-history.jpg"
    videoSrc="https://video.example.com/ap-history.mp4"
    mediaMetaInfo={['VIDEO', '12:45']}
    overline="VIDEO"
/>
```

**When to Use:**
- Video content previews
- Media resource galleries
- Interactive video cards with modal playback
- Showing video duration and file type

### ResourceCard
Document/file download cards with metadata.

**Props:**
```typescript
interface IResourceCardProps {
    // Content
    title?: string | React.ReactElement;
    titleHeadingLevel?: number;         // Default: 3
    description?: string | React.ReactElement;
    overline?: string;                  // Default: 'DOCUMENT'
    
    // Resource
    resourceURL: string;                // Download link (required)
    target?: string;
    resourceMetaInfo?: string[];        // File type, size, date (ALL CAPS)
    icon?: IconName;                    // Default: 'download'
    
    // IDs
    titleId?: string;
    descId?: string;
    overlineId?: string;
    cardRole?: string;
    ariaLabel?: string;
    ariaLabelledbyID?: string;
    
    // Styling
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    disabled?: boolean;
}
```

**Usage:**
```tsx
<ResourceCard
    overline="DOCUMENT"
    title="Introduction to AP U.S. History"
    description="The lesson plans presented here cover a range of periods and themes."
    resourceURL="/downloads/ap-history.pdf"
    resourceMetaInfo={['PDF', '486KB']}
    icon="download"
/>

// Article resource
<ResourceCard
    overline="ARTICLE"
    title="SAT Preparation Guide"
    description="Tips and strategies for SAT success"
    resourceURL="/articles/sat-prep"
    resourceMetaInfo={['8 MIN READ', 'FEB 15, 2026']}
    icon="article"
/>
```

**When to Use:**
- Document downloads (PDFs, Word docs)
- Article/content links
- Resource libraries
- Showing file type, size, and timestamp

### CTACard
Call-to-action cards with illustration and button.

**Props:**
```typescript
interface ICTACardProps {
    // Content
    title?: string | React.ReactElement;
    titleHeadingLevel?: number;         // Default: 3
    description?: string | React.ReactElement;
    
    // Illustration
    name: string;                       // Illustration name (required)
    circular?: boolean;                 // Default: false
    shadow?: boolean;                   // Default: false
    customCircular?: boolean;           // Default: false
    k12?: boolean;                      // K-12 theme
    higherEd?: boolean;                 // Higher Ed theme
    
    // Button
    buttonLabel?: string;
    href?: string;
    target?: string;
    buttonId?: string;
    buttonClass?: string;
    
    // IDs
    titleId?: string;
    cardRole?: string;
    ariaLabel?: string;
    ariaLabelledbyID?: string;
    
    // Styling
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    disabled?: boolean;
}
```

**Usage:**
```tsx
<CTACard
    name="college-search"
    title="Find Your Perfect College"
    description="Explore colleges that match your interests and goals"
    buttonLabel="Start Searching"
    href="/college-search"
    circular
    k12
/>

<CTACard
    name="sat-registration"
    title="Register for the SAT"
    description="Sign up for an upcoming test date"
    buttonLabel="Register Now"
    href="/sat/register"
    circular
    shadow
/>
```

**When to Use:**
- Primary call-to-action links
- Feature highlights with CTAs
- Navigation to important pages
- Series of related content/pages

### PromoCard
Promotional cards with optional icon and colored border.

**Props:**
```typescript
interface IPromoCardProps {
    // Content
    title: string | React.ReactElement;  // Required
    titleHeadingLevel?: number;          // Default: 2
    description?: string | React.ReactElement;
    
    // Meta
    metaInfo?: string[];                 // Author names, etc.
    author?: boolean;                    // Author styling
    
    // Visual
    border?: 'blue3' | 'blue5' | 'purple1';  // Left border color
    icon?: IconName;
    
    // Styling
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    disabled?: boolean;
}
```

**Usage:**
```tsx
<PromoCard
    title="Preparing Students for Success"
    description="Learn strategies to help your students excel on the SAT"
    border="blue5"
    icon="lightbulb"
/>

// With author info
<PromoCard
    title="Teaching AP in a Hybrid Environment"
    description="Best practices for teaching AP courses online and in-person"
    border="purple1"
    icon="book"
    author
    metaInfo={['Dr. Jane Smith', 'John Doe']}
/>

// No border
<PromoCard
    title="College Board Update"
    description="Latest news and announcements"
/>
```

**When to Use:**
- Promotional content
- Featured articles or stories
- Content with author attribution
- Highlighted announcements

## Common Props (All Cards)

All card variants support:

```typescript
interface ICommonCardProps {
    // Content
    title?: string | React.ReactElement;
    titleHeadingLevel?: number;
    description?: string | React.ReactElement;
    cardLabel?: string;
    overline?: string;
    cardImage?: string;
    
    // Accessibility
    titleId?: string;
    descId?: string;
    overlineId?: string;
    cardRole?: string;              // Use 'region' for landmarks
    ariaLabel?: string;
    ariaLabelledbyID?: string;      // Should reference titleId
    
    // Styling
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    disabled?: boolean;
    
    children?: React.ReactNode;
}
```

## Design Guidelines

### Mobile First
- Design cards for mobile screens first
- Consider brevity, touch targets, and gestures
- Optimize for larger breakpoints after mobile works

### Precision and Concision
- Show only essential data points
- Help users make quick decisions
- Avoid unnecessary information

### Use Imagery Functionally
- Use imagery to grab attention and convey subject
- Don't use imagery just for decoration
- Form follows function

### Make Cards Interactive
- Cards should feel clickable/tappable
- Use drop shadows and rounded corners
- Provide clear interaction states (hover, focus, pressed)
- Indicate if card has single or multiple interaction points

## Common Patterns

### Card Grid
```tsx
<div className="cb-row">
    <div className="cb-col-12 cb-col-md-6 cb-col-lg-4">
        <EventCard {...eventProps1} />
    </div>
    <div className="cb-col-12 cb-col-md-6 cb-col-lg-4">
        <EventCard {...eventProps2} />
    </div>
    <div className="cb-col-12 cb-col-md-6 cb-col-lg-4">
        <EventCard {...eventProps3} />
    </div>
</div>
```

### Card List
```tsx
<div className="cb-row">
    {events.map(event => (
        <div key={event.id} className="cb-col-12 cb-margin-bottom-24">
            <EventCard {...event} />
        </div>
    ))}
</div>
```

### Event Timeline
```tsx
<ul>
    {events.map((event, index) => (
        <EventCard
            key={event.id}
            eventYear={event.year}
            repeatYear={index > 0 && events[index - 1].year === event.year}
            title={event.title}
            dateTime={event.dateTime}
        />
    ))}
</ul>
```

### Featured Event with Regular Events
```tsx
<div className="cb-row">
    <div className="cb-col-12 cb-margin-bottom-48">
        <EventCard
            featured
            cardImage="/featured-event.jpg"
            overline="FEATURED"
            title="Annual College Fair"
            description="Meet representatives from 100+ colleges"
            dateTime={['MARCH 15, 2026', '2:00 PM - 6:00 PM']}
            primary={{ label: 'Register Now', href: '/register' }}
        />
    </div>
    
    <div className="cb-col-12 cb-col-md-6">
        <EventCard {...regularEvent1} />
    </div>
    <div className="cb-col-12 cb-col-md-6">
        <EventCard {...regularEvent2} />
    </div>
</div>
```

### Resource Library
```tsx
<div className="cb-row">
    {resources.map(resource => (
        <div key={resource.id} className="cb-col-12 cb-col-md-6 cb-col-lg-4">
            <ResourceCard
                title={resource.title}
                description={resource.description}
                resourceURL={resource.url}
                resourceMetaInfo={[resource.type, resource.size]}
            />
        </div>
    ))}
</div>
```

### CTA Card Section
```tsx
<div className="cb-row">
    <div className="cb-col-12 cb-col-md-4">
        <CTACard
            name="college-search"
            title="Find Your College"
            buttonLabel="Start Search"
            href="/search"
            circular
        />
    </div>
    <div className="cb-col-12 cb-col-md-4">
        <CTACard
            name="sat-prep"
            title="SAT Preparation"
            buttonLabel="Get Started"
            href="/sat-prep"
            circular
        />
    </div>
    <div className="cb-col-12 cb-col-md-4">
        <CTACard
            name="ap-courses"
            title="Browse AP Courses"
            buttonLabel="View Courses"
            href="/ap"
            circular
        />
    </div>
</div>
```

### Disabled Card
```tsx
<EventCard
    title="Past Event"
    dateTime={['DEC 1, 2025']}
    description="This event has already occurred"
    disabled
    primary={{ label: 'Register', href: '/register' }}
/>
```

### Custom Card Content
```tsx
<SimpleCard>
    <div className="cb-padding-24">
        <h3 className="cb-h3">Custom Card</h3>
        <p>Build your own card layout with SimpleCard</p>
        <button className="cb-btn cb-btn-primary">Action</button>
    </div>
</SimpleCard>
```

## Accessibility

1. **Heading Hierarchy:**
   - Set appropriate `titleHeadingLevel` (default: varies by card type)
   - EventCard, MediaCard, ResourceCard, CTACard: default H3
   - PromoCard: default H2

2. **ARIA Labels:**
   - Use `ariaLabel` or `ariaLabelledbyID` for card landmarks
   - Set `cardRole="region"` for major sections
   - Provide descriptive labels for screen readers

3. **Button/Link Labels:**
   - Ensure button labels are descriptive
   - Use `aria-describedby` to connect cards to context
   - Cards auto-generate IDs for associating labels

4. **Disabled State:**
   - Disabled cards have `aria-disabled="true"`
   - Links/buttons in disabled cards have `tabIndex={-1}`
   - Click events are prevented

5. **Keyboard Navigation:**
   - All interactive elements are keyboard accessible
   - Focus states are visible
   - Tab order is logical

6. **Meta Information:**
   - Use ALL CAPS for meta info (file type, size, etc.)
   - Provide context for icons with `aria-describedby`

## Important Notes

1. **Card Buttons:**
   - `primary` renders as primary button
   - `secondary` renders as array of secondary buttons
   - Button labels are required

2. **Event Timelines:**
   - Use `<ul>` wrapper for timeline lists
   - Set `eventYear` to render year stamp
   - Use `repeatYear={true}` to hide duplicate year stamps

3. **Featured Event Cards:**
   - Require `featured={true}` and `cardImage`
   - Use `overline` for category/label
   - Styled like MediaCard visually

4. **Resource Meta Info:**
   - Use ALL CAPS: `['PDF', '486KB']`
   - Video: `['VIDEO', '12:45']`
   - Article: `['8 MIN READ', 'FEB 15, 2026']`

5. **PromoCard Border Colors:**
   - `blue3` or `blue5`: applies `cb-blue2-tint-2` background
   - `purple1`: applies `cb-purple1-tint-1` background
   - No border: set border to undefined or omit

6. **CTACard Illustrations:**
   - Requires illustration `name` prop
   - Use `circular` for circular background
   - Use `k12` or `higherEd` for themed colors
   - See [Illustrations documentation](illustrations.md)

7. **MediaCard Modal:**
   - Opens video in modal overlay
   - Supports YouTube, Vimeo, or direct video URLs
   - Modal behavior controlled via props
   - See [Modals documentation](modals.md)

8. **Auto-Generated IDs:**
   - Cards generate unique IDs if not provided
   - Use `useId()` hook internally
   - Override with custom IDs if needed for testing

9. **Responsive Design:**
   - Cards fill container width
   - Use grid classes for layout control
   - Test on mobile first, then optimize for larger screens

10. **Interactive States:**
    - Cards have hover/focus states by default
    - Use `disabled` to prevent interaction
    - Drop shadows indicate interactivity

11. **Content Guidelines:**
    - Keep titles concise (1-2 lines)
    - Descriptions should be brief (2-3 sentences max)
    - Use buttons for primary actions
    - Use links for secondary/tertiary actions

12. **CSS Classes:**
    - All cards use `cb-card` base class
    - Variant classes: `cb-card-event`, `cb-card-media`, `cb-card-title-link`, `cb-card-cta`, `cb-card-promo`
    - See [Cards CSS documentation](https://uihub.collegeboard.org/stg/4.5.0/develop/cards) for styling details
