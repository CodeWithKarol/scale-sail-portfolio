// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function to limit the rate at which a function can fire
 */
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= offset
  );
}

// ========================================
// Header Scroll Effect
// ========================================

const header = document.getElementById("header");
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset;

  // Add scrolled class for backdrop blur effect
  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
}

window.addEventListener("scroll", debounce(handleScroll, 10));

// ========================================
// Mobile Navigation Toggle
// ========================================

let navToggle, navMobile, closeMenu;

document.addEventListener("DOMContentLoaded", function () {
  navToggle = document.getElementById("nav-toggle");
  navMobile = document.getElementById("nav-mobile");

  console.log("DOM loaded. Elements:", {
    toggle: !!navToggle,
    mobile: !!navMobile,
  });

  if (!navToggle || !navMobile) {
    console.error("Mobile menu elements not found!");
    return;
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const isActive = navMobile.classList.contains("active");

    if (isActive) {
      navToggle.classList.remove("active");
      navMobile.classList.remove("active");
      document.body.style.overflow = "";
      console.log("Menu closed");
    } else {
      navToggle.classList.add("active");
      navMobile.classList.add("active");
      document.body.style.overflow = "hidden";
      console.log("Menu opened");
    }

    // Debug: check computed styles
    const styles = window.getComputedStyle(navMobile);
    console.log("Current state:", {
      hasActiveClass: navMobile.classList.contains("active"),
      opacity: styles.opacity,
      visibility: styles.visibility,
      display: styles.display,
      zIndex: styles.zIndex,
    });
  }

  closeMenu = function () {
    if (!navToggle || !navMobile) return;

    navToggle.classList.remove("active");
    navMobile.classList.remove("active");
    document.body.style.overflow = "";
    console.log("Menu force closed");
  };

  navToggle.addEventListener("click", toggleMenu);

  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav__link, .nav__mobile-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMobile &&
      navMobile.classList.contains("active") &&
      !navMobile.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  console.log("Mobile menu initialized successfully");
});

// Prevent body scroll when mobile menu is open
window.addEventListener("resize", () => {
  if (
    navMobile &&
    window.innerWidth >= 1024 &&
    navMobile.classList.contains("active")
  ) {
    closeMenu();
  }
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Don't prevent default for empty anchors
    if (href === "#" || href === "#cta" || href === "#demo") {
      return;
    }

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const headerOffset = window.innerWidth >= 768 ? 80 : 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// Scroll Reveal Animation
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Optionally unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate on scroll
const revealElements = document.querySelectorAll(
  ".feature-card, .step, .testimonial-card, .stats__item"
);
revealElements.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ========================================
// Form Handling
// ========================================

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const submitBtn = this.querySelector('button[type="submit"]');
    const email = emailInput.value;

    // Basic email validation
    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address", "error");
      return;
    }

    // Disable button and show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Processing...</span>";

    // Simulate API call (replace with your actual API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      showFormMessage("Success! Check your email to get started.", "success");
      emailInput.value = "";

      // Track conversion (integrate with your analytics)
      if (typeof gtag !== "undefined") {
        gtag("event", "sign_up", {
          method: "Email",
        });
      }
    } catch (error) {
      showFormMessage("Something went wrong. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormMessage(message, type = "success") {
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageEl = document.createElement("div");
  messageEl.className = `form-message form-message--${type}`;
  messageEl.textContent = message;

  const form = document.getElementById("signup-form");
  form.appendChild(messageEl);

  // Add styles dynamically
  messageEl.style.cssText = `
        padding: 12px 20px;
        border-radius: 8px;
        margin-top: 16px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

  if (type === "success") {
    messageEl.style.background = "#10B981";
    messageEl.style.color = "white";
  } else {
    messageEl.style.background = "#EF4444";
    messageEl.style.color = "white";
  }

  setTimeout(() => {
    messageEl.style.opacity = "0";
    messageEl.style.transition = "opacity 0.3s ease";
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

// ========================================
// Mockup Card Animation
// ========================================

const mockupCards = document.querySelectorAll(".mockup-card");

mockupCards.forEach((card, index) => {
  // Add entrance animation with delay
  setTimeout(() => {
    card.style.animation = `fadeIn 0.8s ease forwards`;
  }, index * 200);

  // Add parallax effect on mouse move (desktop only)
  if (window.innerWidth > 1024) {
    document.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

      card.style.transform = `
                translateX(calc(-50% + ${xAxis * (index + 1)}px)) 
                translateY(${yAxis * (index + 1)}px) 
                rotate(${index === 1 ? 0 : index === 0 ? -6 : 6}deg)
            `;
    });
  }
});

// ========================================
// Stats Counter Animation
// ========================================

const statsSection = document.querySelector(".stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".stats__number").forEach((stat, index) => {
            const target = parseInt(stat.getAttribute("data-target"));
            const suffix = stat.closest('[data-stat="2"]')
              ? "x"
              : stat.closest('[data-stat="3"]')
              ? "%"
              : "+";

            let current = 0;
            const increment = target / 50;
            const duration = 1500 + index * 300;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(current);
              }
            }, duration / 50);
          });

          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  statsObserver.observe(statsSection);
}

// ========================================
// Testimonials Rotation (Optional)
// ========================================

// Uncomment if you want auto-rotating testimonials
/*
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = index === currentTestimonial ? '1' : '0.5';
        testimonial.style.transform = index === currentTestimonial ? 
            'scale(1.05)' : 'scale(1)';
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

if (testimonials.length > 0) {
    setInterval(rotateTestimonials, 5000);
}
*/

// ========================================
// Performance Optimization
// ========================================

// Lazy load images (if you add real images)
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// ========================================
// Accessibility Enhancements
// ========================================

// Keyboard navigation for buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      button.click();
    }
  });
});

// Focus visible for better accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});

// Add focus styles
const style = document.createElement("style");
style.textContent = `
    body.keyboard-nav *:focus {
        outline: 3px solid #3B82F6 !important;
        outline-offset: 2px !important;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Initialize on DOM Content Loaded
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("ScaleSail landing page loaded successfully! 🚀");

  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded");

  // Initialize AOS or other animation libraries if needed
  // Example: AOS.init({ duration: 800, once: true });
});

// ========================================
// Handle Window Resize
// ========================================

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (
      navMobile &&
      window.innerWidth >= 1024 &&
      navMobile.classList.contains("active")
    ) {
      closeMenu();
    }
  }, 250);
});

// ========================================
// Demo & CTA Click Tracking
// ========================================

// Track CTA clicks for analytics
document.querySelectorAll('a[href="#cta"], a[href="#demo"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const action =
      link.getAttribute("href") === "#demo" ? "demo_click" : "cta_click";

    // Google Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: "engagement",
        event_label: link.textContent.trim(),
      });
    }

    // For demo links, you might want to open a modal or redirect
    if (link.getAttribute("href") === "#demo") {
      e.preventDefault();
      // Add your demo logic here
      alert("Demo modal would open here. Integrate with your demo platform!");
    }
  });
});

// ========================================
// Error Handling
// ========================================

window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
  // You can send this to your error tracking service
});

// ========================================
// Service Worker Registration (PWA ready)
// ========================================

if ("serviceWorker" in navigator) {
  // Uncomment when you add a service worker
  /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
    */
}
