// ===================================
// Advanced Animations Controller
// ===================================

class AnimationController {
  constructor() {
    this.animations = new Map();
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupMouseFollower();
  }

  // ===================================
  // Intersection Observer Setup
  // ===================================
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    this.observers.set("main", observer);

    // Observe animated elements
    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });
  }

  // ===================================
  // Trigger Animation
  // ===================================
  triggerAnimation(element) {
    const animationType = element.getAttribute("data-animate");
    const delay = element.getAttribute("data-delay") || 0;

    setTimeout(() => {
      element.classList.add("animated");

      switch (animationType) {
        case "fade-in":
          this.fadeIn(element);
          break;
        case "slide-up":
          this.slideUp(element);
          break;
        case "slide-left":
          this.slideLeft(element);
          break;
        case "slide-right":
          this.slideRight(element);
          break;
        case "zoom-in":
          this.zoomIn(element);
          break;
        case "rotate-in":
          this.rotateIn(element);
          break;
        default:
          this.fadeIn(element);
      }
    }, delay);
  }

  // ===================================
  // Animation Types
  // ===================================
  fadeIn(element) {
    element.style.animation = "fadeIn 0.6s ease-out forwards";
  }

  slideUp(element) {
    element.style.animation = "slideUp 0.6s ease-out forwards";
  }

  slideLeft(element) {
    element.style.animation = "slideLeft 0.6s ease-out forwards";
  }

  slideRight(element) {
    element.style.animation = "slideRight 0.6s ease-out forwards";
  }

  zoomIn(element) {
    element.style.animation = "zoomIn 0.6s ease-out forwards";
  }

  rotateIn(element) {
    element.style.animation = "rotateIn 0.8s ease-out forwards";
  }

  // ===================================
  // Scroll-based Animations
  // ===================================
  setupScrollAnimations() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Parallax effect for backgrounds
    document.querySelectorAll("[data-parallax]").forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax")) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    // Progress bar on scroll
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = (scrolled / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Scale elements based on scroll position
    document.querySelectorAll("[data-scale]").forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(windowHeight / 2 - elementCenter);
      const maxDistance = windowHeight / 2;
      const scale = 1 + (1 - distanceFromCenter / maxDistance) * 0.2;

      element.style.transform = `scale(${Math.max(0.8, Math.min(1.2, scale))})`;
    });
  }

  // ===================================
  // Hover Effects
  // ===================================
  setupHoverEffects() {
    // 3D tilt effect on cards
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      });
    });

    // Magnetic effect on buttons
    document.querySelectorAll("[data-magnetic]").forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
      });
    });
  }

  // ===================================
  // Mouse Follower
  // ===================================
  setupMouseFollower() {
    const follower = document.createElement("div");
    follower.className = "mouse-follower";
    follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-secondary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
    document.body.appendChild(follower);

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      follower.style.display = "block";
    });

    const animateFollower = () => {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;

      followerX += dx * 0.1;
      followerY += dy * 0.1;

      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      requestAnimationFrame(animateFollower);
    };

    animateFollower();

    // Expand on hover over interactive elements
    document.querySelectorAll("a, button, .btn").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        follower.style.transform = "scale(1.5)";
        follower.style.backgroundColor = "rgba(0, 191, 165, 0.2)";
      });

      element.addEventListener("mouseleave", () => {
        follower.style.transform = "scale(1)";
        follower.style.backgroundColor = "transparent";
      });
    });
  }

  // ===================================
  // Text Animation
  // ===================================
  animateText(element, text, speed = 50) {
    let index = 0;
    element.textContent = "";

    const typeWriter = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  }

  // ===================================
  // Staggered Animation
  // ===================================
  staggerAnimation(elements, animationType, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.triggerAnimation(element);
      }, index * delay);
    });
  }

  // ===================================
  // Number Counter Animation
  // ===================================
  animateNumber(element, start, end, duration = 2000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const updateNumber = () => {
      current += increment;
      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        element.textContent = Math.round(end);
        return;
      }
      element.textContent = Math.round(current);
      requestAnimationFrame(updateNumber);
    };

    updateNumber();
  }

  // ===================================
  // Cleanup
  // ===================================
  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.animations.clear();
  }
}

// Initialize animation controller when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.animationController = new AnimationController();
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = AnimationController;
}
