# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Add Project Images

1. Open `create-placeholders.html` in your browser
2. Click each button to download placeholder images
3. Save images to `assets/images/` folder

OR

1. Add your own images to `assets/images/` folder
2. Update image paths in `index.html`

### Step 2: Customize Content

Open `index.html` and modify:

- **Hero Section**: Update your name and tagline
- **About Section**: Add your bio
- **Projects**: Edit the `projects` array in the `<script>` section
- **Contact**: Update email and social links

### Step 3: Open in Browser

Simply open `index.html` in any modern browser.

## 📁 Required Files

Make sure you have these files in your project:

```
ryotak.net/
├── css/
│   ├── main.css          ✅ Created
│   └── components.css     ✅ Created
├── js/
│   └── animations.js      ✅ Created
├── index.html             ✅ Created
├── README.md              ✅ Created
├── SETUP.md               ✅ This file
└── assets/
    └── images/            📦 Add your images here
```

## 🎨 Customization Tips

### Change Colors

Edit CSS variables in `css/main.css`:

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
}
```

### Add More Projects

In `index.html`, add to the `projects` array:

```javascript
{
  id: 7,
  title: 'Your Project',
  description: 'Description here',
  technologies: ['Tech1', 'Tech2'],
  image: 'assets/images/your-image.jpg',
  link: '#',
  github: '#'
}
```

### Change Text

Search and replace in `index.html`:
- "Ryotak" → Your name
- "hello@ryotak.net" → Your email
- GitHub/LinkedIn/Twitter URLs → Your accounts

## 📱 Mobile Responsive

The portfolio is fully responsive and adapts to all screen sizes automatically.

## 🔍 Browser Support

Works on all modern browsers: Chrome, Firefox, Safari, Edge

## 🎯 Performance Tips

- Use compressed images (JPEG/WebP)
- Keep animations optimized
- Avoid too many large images

## ❓ Need Help?

- Check the main README.md for detailed documentation
- Edit the CSS to match your brand colors
- Modify animations.js to adjust timing effects

## ✨ Enjoy Your Portfolio!

Your modern portfolio website is ready to use. 🎉