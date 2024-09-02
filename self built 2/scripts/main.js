// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Product Gallery
    const galleryElements = document.querySelectorAll('.product-gallery');
    galleryElements.forEach(el => new ProductGallery(el));

    // Initialize Scroll Animations
    scrollAnimations.init();

    // Initialize Icon Animations
    const iconElements = document.querySelectorAll('.animated-icon');
    iconElements.forEach(el => new IconAnimator(el));

    // Initialize Visibility Toggle
    const toggleElements = document.querySelectorAll('.toggle-visibility');
    new VisibilityToggle(toggleElements);

    // Initialize Lazy Loading
    lazyLoadImages();

    // Initialize Scroll Progress Indicator
    scrollProgressIndicator.init();

    // Initialize Smooth Scrolling
    initSmoothScrolling();

    // Initialize Testimonial Slider
    initTestimonialSlider();

    // Initialize Dark Mode
    initDarkMode();

    // Initialize Mobile Menu
    initMobileMenu();
});

// Product Gallery with Zoom and Pan
class ProductGallery {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.mainImage = this.gallery.querySelector('.main-image');
        this.thumbnails = this.gallery.querySelectorAll('.thumbnail');
        this.zoomContainer = document.createElement('div');
        this.zoomContainer.classList.add('zoom-container');
        this.gallery.appendChild(this.zoomContainer);

        this.initThumbnails();
        this.initZoom();
    }

    initThumbnails() {
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                this.mainImage.src = thumb.getAttribute('data-src');
                this.mainImage.setAttribute('data-zoom', thumb.getAttribute('data-src'));
                this.thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    initZoom() {
        this.mainImage.addEventListener('mousemove', (e) => this.zoomImage(e));
        this.mainImage.addEventListener('mouseleave', () => this.resetZoom());
    }

    zoomImage(e) {
        const zoomImage = new Image();
        zoomImage.src = this.mainImage.getAttribute('data-zoom');
        const rect = this.mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / this.mainImage.offsetWidth) * 100;
        const yPercent = (y / this.mainImage.offsetHeight) * 100;

        this.zoomContainer.style.backgroundImage = `url(${zoomImage.src})`;
        this.zoomContainer.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        this.zoomContainer.style.display = 'block';
    }

    resetZoom() {
        this.zoomContainer.style.display = 'none';
    }
}

// Scroll-based Animations
const scrollAnimations = (() => {
    const elements = document.querySelectorAll('.scroll-animate');

    const isElementInViewport = (el, offset = 0) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    };

    const handleScroll = () => {
        elements.forEach(el => {
            if (isElementInViewport(el, 50)) {
                if (!el.classList.contains('in-view')) {
                    el.classList.remove('fade-out');
                    el.classList.add('in-view');
                }
            } else {
                if (el.classList.contains('in-view')) {
                    el.classList.remove('in-view');
                    el.classList.add('fade-out');
                    
                    // Remove the fade-out class after the animation completes
                    setTimeout(() => {
                        el.classList.remove('fade-out');
                    }, 400); // This should match the fade-out transition duration in CSS
                }
            }
        });
    };

    return {
        init: () => {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
            handleScroll(); // Initial check
        }
    };
})();

// Icon Animations
class IconAnimator {
    constructor(iconElement) {
        this.icon = iconElement;
        this.initAnimation();
    }

    initAnimation() {
        this.icon.addEventListener('mouseenter', () => this.animateIcon());
    }

    animateIcon() {
        this.icon.style.animation = 'none';
        this.icon.offsetHeight; // Trigger reflow
        this.icon.style.animation = 'iconPulse 0.5s ease-in-out';
    }
}

// Visibility Toggle with Intersection Observer
class VisibilityToggle {
    constructor(elements, options = {}) {
        this.elements = elements;
        this.options = {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0.1
        };
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.init();
    }

    init() {
        this.elements.forEach(el => this.observer.observe(el));
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.remove('visible');
                entry.target.classList.add('hidden');
            }
        });
    }
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll("img.lazy-image");

    if ("IntersectionObserver" in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy-image");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    } else {
        // Fallback for older browsers that do not support IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
        });
    }
}

function loadFeaturedProjectImages() {
    const featuredImages = document.querySelectorAll(".featured-project img.lazy-image");

    featuredImages.forEach(image => {
        image.src = image.dataset.src;
        image.classList.remove("lazy-image");
    });
}

// Smooth Scrolling Progress Indicator
const scrollProgressIndicator = (() => {
    const progressBar = document.querySelector('.scroll-progress');

    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    };

    return {
        init: () => {
            window.addEventListener('scroll', updateProgress);
            updateProgress(); // Initial update
        }
    };
})();

// Smooth Scrolling
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Testimonial Slider
class TestimonialSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.testimonials = this.slider.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }

    init() {
        // Check if navigation already exists
        if (!this.slider.querySelector('.testimonial-nav')) {
            this.createNavigation();
        }
        this.startAutoSlide();
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    createNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'testimonial-nav';
        
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&larr;';
        prevButton.addEventListener('click', () => this.slide('prev'));
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&rarr;';
        nextButton.addEventListener('click', () => this.slide('next'));
        
        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);
        this.slider.appendChild(navContainer);
    }

    slide(direction) {
        this.testimonials[this.currentIndex].classList.remove('active');
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        }
        this.testimonials[this.currentIndex].classList.add('active');
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.slide('next'), 5000);
    }

    stopAutoSlide() {
        clearInterval(this.interval);
    }
}

const initTestimonialSlider = () => {
    const sliderElement = document.querySelector('.testimonial-slider');
    if (sliderElement) {
        new TestimonialSlider(sliderElement);
    }
};

// Dark Mode Toggle
const initDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
};

// Mobile Menu
const initMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.menu-content');

    menuToggle.addEventListener('change', () => {
        if (menuToggle.checked) {
            mobileMenu.style.display = 'flex';
        } else {
            mobileMenu.style.display = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = mobileMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && menuToggle.checked) {
            menuToggle.checked = false;
            mobileMenu.style.display = 'none';
        }
    });
};

// Loading Animation
const showLoader = () => {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);
};

const hideLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
};

// Initialize loading animation
showLoader();
window.addEventListener('load', hideLoader);

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Product Gallery
    const galleryElements = document.querySelectorAll('.product-gallery');
    galleryElements.forEach(el => new ProductGallery(el));

    // Initialize Scroll Animations
    scrollAnimations.init();

    // Initialize Icon Animations
    const iconElements = document.querySelectorAll('.animated-icon');
    iconElements.forEach(el => new IconAnimator(el));

    // Initialize Visibility Toggle
    const toggleElements = document.querySelectorAll('.toggle-visibility');
    new VisibilityToggle(toggleElements);

   // Initialize all components
   initializeLazyLoading();

   //load featured project images
   loadFeaturedProjectImages();

    // Initialize Scroll Progress Indicator
    scrollProgressIndicator.init();

    // Initialize Smooth Scrolling
    initSmoothScrolling();

    // Initialize Testimonial Slider
    initTestimonialSlider();

    // Initialize Dark Mode
    initDarkMode();

    // Initialize Mobile Menu
    initMobileMenu();

    // Show initial content
    document.body.classList.add('loaded');
});

// Show loader
showLoader();

// Hide loader when everything is loaded
window.addEventListener('load', () => {
    hideLoader();
    document.body.classList.add('loaded');
});