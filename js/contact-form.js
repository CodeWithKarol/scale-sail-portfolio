// ===================================
// Contact Form Handler
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearError(input));
    });
  }
});

// ===================================
// Form Submission
// ===================================
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  // Validate all fields
  if (!validateForm(form)) {
    showNotification("Please fill in all required fields correctly.", "error");
    return;
  }

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  submitButton.classList.add("loading");

  try {
    // Simulate API call (replace with actual endpoint)
    await simulateAPICall(data);

    // Success
    showNotification(
      "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.",
      "success"
    );
    form.reset();

    // Track form submission (Google Analytics, etc.)
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submission", {
        event_category: "Contact",
        event_label: data.service,
      });
    }
  } catch (error) {
    console.error("Form submission error:", error);
    showNotification(
      "Oops! Something went wrong. Please try again or email me directly.",
      "error"
    );
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.classList.remove("loading");
  }
}

// ===================================
// Form Validation
// ===================================
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = "";

  // Check if required field is empty
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  }

  // Email validation
  else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  // Message length validation
  else if (fieldName === "message" && value && value.length < 10) {
    isValid = false;
    errorMessage = "Please provide more details (minimum 10 characters)";
  }

  // Select validation
  else if (
    field.tagName === "SELECT" &&
    field.hasAttribute("required") &&
    value === ""
  ) {
    isValid = false;
    errorMessage = "Please select an option";
  }

  // Show or clear error
  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearError(field);
  }

  return isValid;
}

function showFieldError(field, message) {
  clearError(field);

  field.classList.add("error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.setAttribute("role", "alert");

  field.parentElement.appendChild(errorDiv);
}

function clearError(field) {
  field.classList.remove("error");
  const existingError = field.parentElement.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
}

// ===================================
// Notifications
// ===================================
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.setAttribute("role", "alert");
  notification.setAttribute("aria-live", "polite");

  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <p>${message}</p>
        </div>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add("show"), 10);

  // Close button
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      closeNotification(notification);
    });

  // Auto close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      closeNotification(notification);
    }
  }, 5000);
}

function closeNotification(notification) {
  notification.classList.remove("show");
  setTimeout(() => notification.remove(), 300);
}

// ===================================
// Simulate API Call
// ===================================
function simulateAPICall(data) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // In production, replace with actual API call
      console.log("Form data:", data);

      // Simulate success
      resolve({ success: true });

      // To simulate error, uncomment:
      // reject(new Error('API Error'));
    }, 1500);
  });
}

// ===================================
// Character Counter (Optional)
// ===================================
function addCharacterCounter(textarea, maxLength = 1000) {
  const counter = document.createElement("div");
  counter.className = "character-counter";
  counter.textContent = `0 / ${maxLength}`;

  textarea.parentElement.appendChild(counter);

  textarea.addEventListener("input", () => {
    const length = textarea.value.length;
    counter.textContent = `${length} / ${maxLength}`;

    if (length > maxLength) {
      counter.classList.add("exceeded");
    } else {
      counter.classList.remove("exceeded");
    }
  });
}

// Initialize character counter for message field
const messageField = document.getElementById("message");
if (messageField) {
  addCharacterCounter(messageField);
}

// ===================================
// Auto-save Form Data (localStorage)
// ===================================
function autoSaveForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const formId = "contactFormData";

  // Load saved data
  const savedData = localStorage.getItem(formId);
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach((key) => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && field.type !== "submit") {
          if (field.type === "checkbox") {
            field.checked = data[key];
          } else {
            field.value = data[key];
          }
        }
      });
    } catch (e) {
      console.error("Error loading saved form data:", e);
    }
  }

  // Save on input
  form.addEventListener(
    "input",
    debounce(() => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      localStorage.setItem(formId, JSON.stringify(data));
    }, 500)
  );

  // Clear on successful submit
  form.addEventListener("submit", () => {
    localStorage.removeItem(formId);
  });
}

// Initialize auto-save
autoSaveForm();

// ===================================
// Utility Functions
// ===================================
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

// ===================================
// Export for use in other modules
// ===================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateForm,
    validateField,
    showNotification,
  };
}
