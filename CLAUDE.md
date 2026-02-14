# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ryotak.net is a static, single-page portfolio website built with vanilla HTML, CSS, and JavaScript. No build process or external dependencies are required. The site uses modern CSS features and JavaScript for interactive animations.

## Development Commands

### Accessing the Site

The development server is already running on `http://localhost:8000/`. Access the portfolio there.

### Testing
- Access `http://localhost:8000/` to verify changes
- Check responsive behavior by resizing the browser window
- Use browser DevTools for debugging JavaScript and CSS issues

### Playwright MCP Debugging

You can use the Playwright MCP tool for automated testing and debugging:

```javascript
// Example: Navigate to the site and take a screenshot
browser_navigate({ url: "http://localhost:8000/" })

// Example: Take a full-page screenshot
browser_take_screenshot({ fullPage: true, filename: "screenshot.png" })

// Example: Get accessibility snapshot
browser_snapshot({ filename: "snapshot.md" })

// Example: Take an element screenshot (with ref from snapshot)
browser_take_screenshot({
  ref: "element-ref",
  element: "Project Card",
  filename: "card-screenshot.png"
})

// Example: Get console messages
browser_console_messages({ level: "error" })

// Example: Get network requests
browser_network_requests({ includeStatic: false })

// Example: Fill a form
browser_fill_form({
  fields: [
    { name: "Email", type: "textbox", ref: "email-input", value: "test@example.com" },
    { name: "Message", type: "textbox", ref: "message-input", value: "Test message" }
  ]
})

// Example: Click on an element
browser_click({ ref: "submit-button", element: "Submit Button" })

// Example: Run custom JavaScript
browser_run_code({
  code: `async (page) => { await page.getByRole('button', { name: 'View Projects' }).click(); return await page.title(); }`
})
```

## Architecture

### File Structure
```
ryotak.net/
├── index.html                 # Main application (507 lines)
├── css/
│   ├── main.css               # Global styles, typography, animations (516 lines)
│   └── components.css         # Component-specific styles (770 lines)
├── js/
│   └── animations.js          # Animation utilities and interactions (553 lines)
├── assets/
│   ├── favicon.svg            # Site favicon
│   └── images/                # Project images and assets
├── create-placeholders.html   # Tool to generate placeholder images
└── create-favicon.html        # Tool to customize favicon
```

### Key Design Patterns

**CSS Variables (Design Tokens)**
All styling is controlled through CSS variables in `css/main.css` (lines 6-61):
- Color palette: Primary (#6366f1), Secondary (#8b5cf6), Accent (#06b6d4), Pink (#ec4899), Teal (#14b8a6)
- Gradients: Multiple linear gradients for backgrounds and text effects
- Spacing: xs (0.5rem) through xl (8rem)
- Border radius: sm (8px) through full (9999px)
- Transitions: fast (0.2s), normal (0.3s), slow (0.5s)

**Animation System**
The animation logic is modularized in `js/animations.js`:
- `AnimationUtils` class provides viewport detection, smooth scrolling, and animation utilities
- Scroll-triggered animations using `IntersectionObserver` for `.reveal`, `.reveal-left`, `.reveal-right` classes
- Parallax floating shapes in the hero section
- Counter animations for statistics
- Modal system for project details

**Content Configuration**
All project data is stored in the `projects` array within `index.html` (around lines 150-200):
```javascript
const projects = [
  {
    id: 1,
    title: 'Project Name',
    description: 'Project description',
    technologies: ['React', 'Node.js'],
    image: 'assets/images/project.jpg',
    link: '#',
    github: '#'
  }
];
```

**Structured Data**
JSON-LD structured data is embedded in `<head>` (lines 38-52) for SEO and social sharing.

## Customization Guide

### Changing Colors
Edit CSS variables in `css/main.css` starting at line 6. Update any of the `--color-*` variables and all related gradients will automatically update.

### Adding/Editing Projects
In `index.html`, locate the `projects` array in the `<script>` section and add/update project objects with the required properties.

### Modifying Animations
- CSS animations: Edit `@keyframes` in `css/main.css`
- JS animation timing: Modify duration parameters in `js/animations.js` (e.g., `smoothScrollTo` default duration = 800ms)
- Scroll thresholds: Adjust offset values in the IntersectionObserver configuration

### Image Handling
- Add project images to `assets/images/` folder
- Use the `create-placeholders.html` tool to generate placeholder images
- Update image paths in the `projects` array

## Browser Support
Chrome (latest), Firefox (latest), Safari (latest), Edge (latest). Uses modern CSS features and ES6+ JavaScript.

## Performance Considerations
- Images use lazy loading via `loading="lazy"` attribute
- CSS animations are GPU-accelerated
- No external dependencies or heavy libraries
- Minimal JavaScript execution for smooth 60fps animations

## Accessibility
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Proper color contrast ratios
- Focus states for all interactive elements