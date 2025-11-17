# Quick Start Guide

Welcome to your Scale & Sail Portfolio Website! This guide will help you get started quickly.

## 📋 Quick Setup Checklist

### 1. Personalize Content (15 minutes)

#### Update Personal Information

- [ ] Replace "Karol" with your name in all HTML files
- [ ] Update professional title and description
- [ ] Add your professional photo/avatar (replace placeholder)
- [ ] Update social media links (GitHub, LinkedIn, Twitter)
- [ ] Change email address in contact section

#### Update Projects

- [ ] Replace SubTrack with your actual project
- [ ] Replace ReviewMaster AI with your actual project
- [ ] Update project metrics and results
- [ ] Add your own project images
- [ ] Update technology stacks used

### 2. Customize Branding (10 minutes)

#### Colors

Edit `css/styles.css` lines 13-23:

```css
:root {
  --color-primary: #0066cc; /* Your primary color */
  --color-secondary: #00bfa5; /* Your accent color */
  --color-accent: #ff6b6b; /* Your highlight color */
}
```

#### Company Name

Find and replace "Scale & Sail" with your brand name:

- All HTML files (6 files)
- Footer sections
- Navigation brand

### 3. Configure Contact Form (10 minutes)

Edit `js/contact-form.js` line 87:

**Option A: Use EmailJS (Recommended)**

```javascript
// Sign up at https://www.emailjs.com/
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data).then((response) => {
  showNotification("Message sent!", "success");
});
```

**Option B: Use Formspree**

```javascript
fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
});
```

**Option C: Use Your Own API**

```javascript
fetch("https://your-api.com/contact", {
  method: "POST",
  body: JSON.stringify(data),
});
```

### 4. Add Your Images (15 minutes)

Create an `images` folder and add:

- `profile.jpg` - Your professional photo (400x400px recommended)
- `project1.jpg` - First project screenshot (1200x600px)
- `project2.jpg` - Second project screenshot (1200x600px)
- `logo.png` - Your logo (optional, 100x100px)

Then update the placeholder divs in HTML with:

```html
<img src="images/profile.jpg" alt="Your Name" />
```

### 5. Test Locally (5 minutes)

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: VS Code Live Server
# Right-click index.html → Open with Live Server
```

Visit `http://localhost:8000`

## 🎨 Customization Tips

### Change Fonts

Replace Google Fonts link in all HTML files:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600;700&display=swap"
  rel="stylesheet"
/>
```

Update CSS:

```css
--font-primary: "Roboto", sans-serif;
```

### Add Google Analytics

Before closing `</head>` tag in all pages:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Add Favicon

Add to `<head>` section of all pages:

```html
<link rel="icon" type="image/png" href="images/favicon.png" />
```

## 🚀 Deployment Options

### GitHub Pages (Free)

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Site will be live at `username.github.io/repo-name`

### Netlify (Free)

1. Sign up at netlify.com
2. Connect GitHub repository
3. Click "Deploy site"
4. Site live in minutes with custom domain option

### Vercel (Free)

1. Sign up at vercel.com
2. Import GitHub project
3. Deploy with one click
4. Get automatic HTTPS and CDN

## 📱 Mobile Testing

Test on multiple devices:

- Chrome DevTools (F12 → Toggle Device Toolbar)
- Actual mobile devices
- BrowserStack (for comprehensive testing)

## ✅ Pre-Launch Checklist

- [ ] All personal information updated
- [ ] Contact form working
- [ ] All links working (no 404s)
- [ ] Images optimized and loading
- [ ] Mobile responsive on all pages
- [ ] Forms validated and working
- [ ] Social media links correct
- [ ] Analytics configured
- [ ] Favicon added
- [ ] Meta descriptions optimized for SEO
- [ ] Tested in multiple browsers
- [ ] Accessibility checked (WAVE tool)
- [ ] Performance tested (Lighthouse)

## 🆘 Common Issues

### Links Not Working

- Check that all file paths are relative
- Ensure all HTML files are in root directory
- Verify CSS/JS paths start with correct folder name

### Animations Not Working

- Ensure `animations.css` is loaded
- Check browser console for JavaScript errors
- Verify data-scroll attributes are present

### Form Not Submitting

- Check console for errors
- Verify API endpoint is configured
- Ensure all required fields have validation

### Styles Not Applying

- Clear browser cache (Ctrl+Shift+R)
- Check CSS file paths
- Verify CSS file is loaded in browser DevTools

## 📞 Need Help?

- Check README.md for detailed documentation
- Review code comments in files
- Open GitHub issue for bugs
- Email: hello@scaleandsail.com

## 🎉 Next Steps

After launching:

1. Share on social media
2. Add to LinkedIn profile
3. Submit to web directories
4. Gather feedback
5. Iterate and improve
6. Monitor analytics
7. Update regularly with new projects

**Good luck with your portfolio! 🚀**
