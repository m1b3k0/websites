// advanced-functions.js

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

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScroll = () => {
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('in-view');
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

// Lazy Loading Images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img.lazy-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-image');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

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
        this.createNavigation();
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

// Initialize Testimonial Slider
const initTestimonialSlider = () => {
    const sliderElement = document.querySelector('.testimonial-slider');
    if (sliderElement) {
        new TestimonialSlider(sliderElement);
    }
};

// Run initializations
document.addEventListener('DOMContentLoaded', () => {
    // ... (previous initializations)

    // Initialize Testimonial Slider
    initTestimonialSlider();
});