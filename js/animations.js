/* ==========================================
   Ryotak.net Portfolio - Animations & Interactions
   ========================================= */

// Global animation utilities
const AnimationUtils = {
  /**
   * Get scroll position
   */
  getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  },

  /**
   * Get viewport dimensions
   */
  getViewportDimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight - offset) &&
      rect.bottom >= offset
    );
  },

  /**
   * Smooth scroll to element
   */
  smoothScrollTo(target, duration = 800) {
    const start = AnimationUtils.getScrollTop();
    const targetPosition = typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + AnimationUtils.getScrollTop();
    const distance = targetPosition - start;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentPosition = start + distance * easeProgress;

      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  },

  /**
   * Debounce function
   */
  debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Intersection Observer for scroll animations
class ScrollAnimator {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target);
        }
      });
    }, this.options);
  }

  observe(element) {
    if (element) {
      this.observer.observe(element);
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Navbar scroll effect
class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    const handleScroll = () => {
      const currentScroll = AnimationUtils.getScrollTop();

      if (currentScroll > 100) {
        this.navbar.style.background = 'rgba(15, 15, 26, 0.95)';
        this.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
      } else {
        this.navbar.style.background = 'rgba(15, 15, 26, 0.8)';
        this.navbar.style.boxShadow = 'none';
      }

      this.lastScroll = currentScroll;
    };

    this.handleScroll = AnimationUtils.debounce(handleScroll, 10);
    window.addEventListener('scroll', this.handleScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Parallax effect for shapes
class ParallaxEffect {
  constructor() {
    this.shapes = document.querySelectorAll('.shape');
    this.init();
  }

  init() {
    const handleScroll = () => {
      const scrollY = AnimationUtils.getScrollTop();

      this.shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    this.handleScroll = AnimationUtils.throttle(handleScroll, 16);
    window.addEventListener('scroll', this.handleScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Typing effect for hero section
class Typewriter {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typingSpeed: 50,
      deletingSpeed: 30,
      delayBetween: 2000,
      ...options
    };
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.type(), this.options.deletingSpeed);
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.type(), this.options.typingSpeed);
    }

    // Check if we need to start deleting or move to next text
    if (!this.isDeleting && this.charIndex === currentText.length) {
      setTimeout(() => {
        this.isDeleting = true;
        this.type();
      }, this.options.delayBetween);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      setTimeout(() => this.type(), this.options.delayBetween);
    }
  }

  destroy() {
    this.element.textContent = this.texts[0];
  }
}

// Counter animation for stats
class Counter {
  constructor(element, target, options = {}) {
    this.element = element;
    this.target = target;
    this.options = {
      duration: 2000,
      decimals: 0,
      prefix: '',
      suffix: '',
      ...options
    };
    this.current = 0;
    this.progress = 0;
    this.init();
  }

  init() {
    this.animate();
  }

  animate() {
    const startTime = performance.now();
    const startValue = this.current;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      this.progress = Math.min(elapsed / this.options.duration, 1);
      const easeProgress = 1 - Math.pow(1 - this.progress, 3);

      this.current = startValue + (this.target - startValue) * easeProgress;
      this.element.textContent = `${this.options.prefix}${this.current.toFixed(this.options.decimals)}${this.options.suffix}`;

      if (this.progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  destroy() {
    this.element.textContent = `${this.options.prefix}${this.target}${this.options.suffix}`;
  }
}

// Modal for project details
class Modal {
  constructor(options = {}) {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3></h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button class="btn btn-secondary close-modal">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.contentElement = this.modal.querySelector('.modal-body');
    this.closeButton = this.modal.querySelector('.modal-close');
    this.closeButtonInFooter = this.modal.querySelector('.close-modal');

    this.projectData = null;
    this.init();
  }

  init() {
    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close on close button
    this.closeButton.addEventListener('click', () => this.close());
    this.closeButtonInFooter.addEventListener('click', () => this.close());

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(projectData) {
    this.projectData = projectData;
    this.render();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  render() {
    if (!this.projectData) return;

    const { title, description, technologies, image, link, github } = this.projectData;

    this.contentElement.innerHTML = `
      <img src="${image}" alt="${title}" class="modal-image">
      <div class="modal-description">
        <h4>Description</h4>
        <p>${description}</p>
      </div>
      ${github ? `
        <div class="modal-description">
          <h4>GitHub</h4>
          <a href="${github}" target="_blank" class="btn btn-secondary" style="display:inline-flex; width:auto;">
            View on GitHub
          </a>
        </div>
      ` : ''}
      ${link ? `
        <div class="modal-description">
          <h4>Live Demo</h4>
          <a href="${link}" target="_blank" class="btn btn-primary" style="display:inline-flex; width:auto;">
            Visit Website
          </a>
        </div>
      ` : ''}
      <div class="modal-tech-stack">
        ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    `;
  }

  destroy() {
    this.close();
    document.body.removeChild(this.modal);
  }
}

// Lazy loading for images
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    this.handleScroll = AnimationUtils.throttle(() => this.loadVisible(), 100);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('load', () => this.loadAll());

    // Observe images for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px'
    });

    this.images.forEach(img => imageObserver.observe(img));
  }

  loadVisible() {
    this.images.forEach(img => {
      if (AnimationUtils.isInViewport(img, 100)) {
        this.loadImage(img);
      }
    });
  }

  loadAll() {
    this.images.forEach(img => this.loadImage(img));
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    img.src = src;
    img.removeAttribute('data-src');

    img.onload = () => {
      img.classList.add('loaded');
    };

    img.onerror = () => {
      img.style.display = 'none';
    };
  }

  destroy() {
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Scroll Animator
  const scrollAnimator = new ScrollAnimator();
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    scrollAnimator.observe(el);
  });

  // Initialize Navbar
  const navbar = new Navbar();

  // Initialize Parallax Effect
  const parallaxEffect = new ParallaxEffect();

  // Initialize Modal
  const modal = new Modal();

  // Initialize Lazy Loader
  const lazyLoader = new LazyLoader();

  // Initialize counter animations
  document.querySelectorAll('.stat-item h3').forEach(el => {
    const text = el.textContent;
    const match = text.match(/[\d.]+/);
    if (match) {
      const counter = new Counter(el, parseFloat(match[0]));
    }
  });

  // Store instances for cleanup
  window.portfolioAnimations = {
    scrollAnimator,
    navbar,
    parallaxEffect,
    modal,
    lazyLoader
  };
});

// Clean up animations when page unloads
window.addEventListener('beforeunload', () => {
  if (window.portfolioAnimations) {
    const { scrollAnimator, navbar, parallaxEffect, modal, lazyLoader } = window.portfolioAnimations;

    if (scrollAnimator) scrollAnimator.disconnect();
    if (navbar) navbar.destroy();
    if (parallaxEffect) parallaxEffect.destroy();
    if (lazyLoader) lazyLoader.destroy();
  }
});

// Utility: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Utility: Truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Utility: Get random color from gradient
function getRandomGradient() {
  const gradients = [
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

// Utility: Create gradient text
function createGradientText(text, options = {}) {
  const { colors = ['#6366f1', '#8b5cf6', '#ec4899'], size = '1.5rem' } = options;
  const gradient = colors.length > 1
    ? `linear-gradient(135deg, ${colors.join(', ')})`
    : colors[0];

  return `
    <span style="
      background: ${gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: ${size};
      font-weight: 700;
    ">${text}</span>
  `;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AnimationUtils,
    ScrollAnimator,
    Navbar,
    ParallaxEffect,
    Typewriter,
    Counter,
    Modal,
    LazyLoader
  };
}