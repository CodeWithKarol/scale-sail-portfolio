# Scale & Sail Portfolio Website

A professional portfolio website for showcasing Angular development expertise and digital product strategy services. Built with modern HTML, CSS, and JavaScript featuring beautiful animations, responsive design, and accessibility-first approach.

## 🎯 Project Overview

This portfolio website is designed for tech-savvy entrepreneurs, startup founders, and SaaS companies seeking expert frontend development and digital product strategy. It showcases micro-SaaS projects, technical expertise, and provides an intuitive user experience.

## ✨ Features

### Core Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern Animations**: Scroll-triggered animations, micro-interactions, and animated backgrounds
- **Accessibility**: WCAG 2.1 compliant with ARIA attributes and keyboard navigation
- **Performance Optimized**: Fast loading times with optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure

### Pages

1. **Homepage** - Hero section with animated background, service preview, featured projects, testimonials
2. **About** - Personal narrative, technical expertise, professional journey, core values
3. **Services** - Detailed service offerings (Frontend Dev, Product Strategy, Micro-SaaS)
4. **Projects** - Case studies for SubTrack and ReviewMaster AI with measurable results
5. **Blog** - Technical articles and insights on Angular and product development
6. **Contact** - Contact form with validation, availability status, FAQ section

### Interactive Elements

- Animated code snippets background on hero section
- Scroll-triggered fade/slide animations
- Counter animations for statistics
- Smooth scrolling navigation
- Mobile-friendly hamburger menu
- Form validation with real-time feedback
- Loading states and notifications
- Ripple effects on interactive elements

## 🎨 Design System

### Color Palette

- **Primary**: Deep Blue (#0066CC)
- **Secondary**: Vibrant Teal (#00BFA5)
- **Dark**: Navy (#0A1929)
- **Accent**: Coral (#FF6B6B)
- **Light**: Clean White (#F8FAFC)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Heading Weights**: 600-700
- **Body Text**: 400-500
- **Code Font**: Courier New (monospace)

### Spacing System

- Uses CSS custom properties for consistent spacing
- 8px base unit scaling (0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem)

## 📁 Project Structure

```
scale-sail-portfolio/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── projects.html           # Projects showcase
├── blog.html               # Blog listing
├── contact.html            # Contact page
├── css/
│   ├── styles.css          # Main stylesheet with design system
│   ├── page-styles.css     # Page-specific styles
│   └── animations.css      # Animation utilities and keyframes
├── js/
│   ├── main.js             # Core functionality (nav, scroll, counters)
│   ├── animations.js       # Advanced animation controller
│   └── contact-form.js     # Form validation and submission
├── LICENSE                 # MIT License
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CodeWithKarol/scale-sail-portfolio.git
   cd scale-sail-portfolio
   ```

2. **Open in browser**

   - Simply open `index.html` in your web browser
   - Or use a local development server:

   **Using Python:**

   ```bash
   python -m http.server 8000
   ```

   **Using Node.js (http-server):**

   ```bash
   npx http-server
   ```

   **Using VS Code Live Server:**

   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

3. **View the website**
   - Navigate to `http://localhost:8000` (or the port shown)

## 🛠️ Customization

### Update Content

1. **Personal Information**

   - Edit HTML files to update text content
   - Replace placeholder icons with your own images
   - Update social media links in footer

2. **Colors**

   - Modify CSS custom properties in `css/styles.css`:

   ```css
   :root {
     --color-primary: #0066cc;
     --color-secondary: #00bfa5;
     /* ... other colors */
   }
   ```

3. **Projects**

   - Edit `projects.html` to add your own case studies
   - Update project details, technologies, and results

4. **Contact Form**
   - Replace form submission endpoint in `js/contact-form.js`
   - Configure email service (EmailJS, Formspree, etc.)

### Add New Features

1. **New Page**

   - Copy an existing HTML file
   - Update navigation links in all pages
   - Add page-specific styles to `css/page-styles.css`

2. **New Animation**
   - Add keyframes to `css/animations.css`
   - Apply animation classes or data attributes
   - Configure in `js/animations.js` if needed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Reduced motion support

## 🎯 Performance Optimizations

- Minimal external dependencies
- Optimized CSS with variables
- Efficient JavaScript (no frameworks)
- Lazy loading for images
- Debounced scroll handlers
- CSS animations over JavaScript
- Local font hosting option

## 📝 Code Quality

### Best Practices

- Clean, modular code structure
- Comprehensive inline comments
- Consistent naming conventions
- Separation of concerns (HTML/CSS/JS)
- DRY principles
- Reusable utility functions

### Code Style

- 4-space indentation
- Descriptive variable names
- Organized CSS with sections
- ES6+ JavaScript features
- BEM-inspired CSS naming

## 🚢 Deployment

### GitHub Pages

```bash
git push origin main
# Enable GitHub Pages in repository settings
```

### Netlify

1. Connect your GitHub repository
2. Build command: (none needed)
3. Publish directory: `/`

### Vercel

```bash
vercel
```

### Traditional Hosting

- Upload all files via FTP
- Ensure directory structure is maintained
- Configure domain and SSL

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Karol** - Scale & Sail

- Website: [Your Website]
- GitHub: [@CodeWithKarol](https://github.com/CodeWithKarol)
- LinkedIn: [Your LinkedIn]
- Twitter: [Your Twitter]

## 🙏 Acknowledgments

- Google Fonts for Inter typography
- Inspiration from modern SaaS landing pages
- Community feedback and suggestions

## 📞 Support

For questions or support:

- Email: hello@scaleandsail.com
- GitHub Issues: [Create an issue](https://github.com/CodeWithKarol/scale-sail-portfolio/issues)

## 🗺️ Roadmap

- [ ] Add dark mode toggle
- [ ] Implement blog CMS integration
- [ ] Add project filtering
- [ ] Integrate analytics
- [ ] Add email newsletter service
- [ ] Create downloadable resume/CV
- [ ] Add more case studies
- [ ] Implement search functionality

---

**Made with ❤️ and Angular expertise**
