// ===================================
// Main JavaScript - Core Functionality
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initNavigation();
  initAnimatedBackground();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initRippleEffect();
});

// ===================================
// Navigation
// ===================================
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const isExpanded = navMenu.classList.contains("active");
      navToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.backgroundColor = "rgba(10, 25, 41, 0.95)";
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
      navbar.style.backgroundColor = "rgba(10, 25, 41, 0.98)";
    }

    lastScroll = currentScroll;
  });
}

// ===================================
// Animated Background
// ===================================
function initAnimatedBackground() {
  const background = document.getElementById("animatedBg");
  if (!background) return;

  // Create code snippets
  const codeSnippets = [
    "const app = new Angular();",
    "component.subscribe()",
    "signal.set(value)",
    "router.navigate()",
    "http.get<Data>()",
    "async ngOnInit()",
    "@Input() data",
    "standalone: true",
    "providers: []",
    "changeDetection",
  ];

  // Create floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 191, 165, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
    background.appendChild(particle);
  }

  // Create code text elements
  for (let i = 0; i < 8; i++) {
    const code = document.createElement("div");
    code.className = "code-snippet";
    code.textContent =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    code.style.cssText = `
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 8 + 10}px;
            color: rgba(0, 191, 165, ${Math.random() * 0.3 + 0.1});
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 15}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            white-space: nowrap;
        `;
    background.appendChild(code);
  }

  // Create grid lines
  const gridContainer = document.createElement("div");
  gridContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(0, 191, 165, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 191, 165, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: pulse 5s infinite;
    `;
  background.appendChild(gridContainer);
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-scroll attribute
  document.querySelectorAll("[data-scroll]").forEach((element) => {
    observer.observe(element);
  });
}

// ===================================
// Counter Animation
// ===================================
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200; // Animation speed

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-count"));
        let count = 0;
        const increment = target / speed;

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===================================
// Ripple Effect on Buttons
// ===================================
function initRippleEffect() {
  const buttons = document.querySelectorAll(
    ".btn, .service-card, .project-featured"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

      ripple.className = "ripple-effect";

      if (
        this.style.position !== "absolute" &&
        this.style.position !== "relative"
      ) {
        this.style.position = "relative";
      }
      this.style.overflow = "hidden";

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===================================
// Parallax Effect
// ===================================
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ===================================
// Lazy Loading Images
// ===================================
function initLazyLoad() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape") {
    const navMenu = document.getElementById("navMenu");
    const navToggle = document.getElementById("navToggle");
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  }
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Export functions for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    debounce,
    throttle,
    isInViewport,
  };
}
