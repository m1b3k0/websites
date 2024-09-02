// Advanced JavaScript Functions for Product Showcase and Interactions

// Image Gallery with Zoom and Pan
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
                this.mainImage.src = thumb.src;
                this.mainImage.setAttribute('data-zoom', thumb.getAttribute('data-zoom'));
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
            } else {
                el.classList.remove('in-view');
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
// const lazyLoadImages = () => {
//     const images = document.querySelectorAll('img[data-src]');
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 const src = img.dataset.src;
//                 if (src) {
//                     img.src = src;
//                     img.removeAttribute('data-src');
//                     img.classList.add('loaded');
//                 }
//                 imageObserver.unobserve(img);
//             }
//         });
//     }, {
//         rootMargin: '50px 0px',
//         threshold: 0.01
//     });

//     images.forEach(img => {
//         if (!img.src) {
//             // Create a canvas element to generate a placeholder
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             canvas.width = img.getAttribute('width') || 300;
//             canvas.height = img.getAttribute('height') || 200;
            
//             // Fill the canvas with a light gray color
//             ctx.fillStyle = '#E0E0E0';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
            
//             // Add some text to the canvas
//             ctx.fillStyle = '#888888';
//             ctx.font = '14px Arial';
//             ctx.textAlign = 'center';
//             ctx.textBaseline = 'middle';
//             ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
            
//             // Set the canvas data as the image source
//             img.src = canvas.toDataURL();
//         }
//         imageObserver.observe(img);
//     });
// };

// Smooth Scrolling Progress Indicator
const scrollProgressIndicator = (() => {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

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

// Initialize all functions
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
});

// Initialize Visibility Toggle
const toggleElements = document.querySelectorAll('.toggle-visibility');
new VisibilityToggle(toggleElements);

