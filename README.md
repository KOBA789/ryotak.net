:warn: この一文以外すべて GLM-4.7-Flash に書かせました :warn:

---

# Ryotak.net Portfolio

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features vibrant gradients, smooth animations, and a clean design system.

## Features

- 🎨 **Modern Design** - Vibrant color gradients and glass-morphism effects
- 📱 **Fully Responsive** - Works beautifully on all screen sizes
- ✨ **Smooth Animations** - Scroll-triggered animations and hover effects
- 🖼️ **Project Gallery** - Interactive project cards with modal details
- 🚀 **Performance Optimized** - Lazy loading and efficient animations
- 🎯 **Accessibility** - Semantic HTML and keyboard navigation support

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript (ES6+)** - Interactive features and animations
- **Google Fonts** - Space Grotesk and Inter fonts

## Project Structure

```
ryotak.net/
├── css/
│   ├── main.css           # Global styles and animations
│   └── components.css      # Component-specific styles
├── js/
│   └── animations.js      # Animation and interaction logic
├── assets/
│   ├── images/            # Project images and profile photos
│   ├── fonts/             # Custom fonts
│   └── favicon.svg        # Website favicon
├── index.html             # Main HTML file
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. Clone or download the repository
2. Open the `index.html` file in your browser

### Customization

#### Adding Projects

Edit the `projects` array in the `<script>` section of `index.html`:

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
  },
  // Add more projects
];
```

#### Changing Text

Update the content in the HTML sections:
- Hero section: Modify the `<h1>` and `<p>` elements in the hero section
- About section: Edit the `about-content` div
- Contact section: Update the contact form and information

#### Customizing Colors

Modify the CSS variables in `css/main.css`:

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
  /* ... more colors */
}
```

#### Adjusting Animations

The animation timing and effects are controlled in the CSS and JavaScript files:

- **CSS animations**: Edit the `@keyframes` in `css/main.css`
- **JavaScript animations**: Modify the options in `js/animations.js`

## Animations

### Scroll Animations
Elements with classes `.reveal`, `.reveal-left`, and `.reveal-right` will animate in when they enter the viewport.

### Hover Effects
- Project cards lift and glow on hover
- Buttons have smooth transitions and hover states
- Links show underlines on hover

### Background Effects
- Floating shapes with parallax scrolling
- Gradient backgrounds that animate subtly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Images use lazy loading
- Animations are optimized for smooth 60fps performance
- CSS animations use GPU acceleration

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Proper color contrast ratios
- ARIA labels for interactive elements

## License

This project is open source and available for personal and commercial use.

## Credits

Built with ❤️ by Ryotak

## Support

For inquiries and collaborations, please use the contact form or email: hello@ryotak.net
