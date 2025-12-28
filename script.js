// ============================================
// V4BS - FUTURISTIC WEBSITE INTERACTIONS
// ============================================

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initGalleryFilters();
    initSmoothScroll();
    initScrollEffects();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active link based on section in view
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value[data-count]');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, stepTime);
}

// ============================================
// GALLERY FILTERS
// ============================================
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// SCROLL EFFECTS (Parallax & 3D)
// ============================================
function initScrollEffects() {
    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;

        // Hero parallax effect
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }

        // Service cards tilt effect on scroll
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight && cardTop > -card.offsetHeight) {
                const tiltValue = ((windowHeight - cardTop) / windowHeight) * 5 - 2.5;
                card.style.transform = `perspective(1000px) rotateX(${tiltValue}deg)`;
            }
        });
    });
}

// ============================================
// SERVICE CARD HOVER EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ============================================
// TYPED TEXT EFFECT (Optional - Hero Subtitle)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect on hero subtitle
// window.addEventListener('load', function() {
//     const heroSubtitle = document.querySelector('.hero-subtitle');
//     if (heroSubtitle) {
//         const originalText = heroSubtitle.textContent;
//         typeWriter(heroSubtitle, originalText, 30);
//     }
// });

// ============================================
// GALLERY LIGHTBOX (Simple Implementation)
// ============================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-title')?.textContent || 'Project';

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${title}">
                    <h3>${title}</h3>
                </div>
            `;

            // Add styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;

            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;

            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 1rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            `;

            const lightboxClose = lightbox.querySelector('.lightbox-close');
            lightboxClose.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 3rem;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            const lightboxTitle = lightbox.querySelector('h3');
            lightboxTitle.style.cssText = `
                color: white;
                margin-top: 1rem;
                font-family: var(--font-heading);
            `;

            // Add to DOM
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close on click
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox || e.target === lightboxClose) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
}

// Initialize lightbox
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

// ============================================
// PERFORMANCE: Lazy Load Images
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// CONSOLE BRANDING (Fun Easter Egg)
// ============================================
console.log('%c🚀 V4 Building Solutions', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00f3ff 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cEngineering Tomorrow, Today', 'font-size: 14px; color: #00f3ff;');
console.log('%cWebsite crafted with cutting-edge web technologies', 'font-size: 12px; color: #666;');

// ============================================
// UTILITY: Debounce Function
// ============================================
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

// ============================================
// RESPONSIVE: Adjust on Resize
// ============================================
window.addEventListener('resize', debounce(function () {
    // Handle responsive adjustments if needed
    const navMenu = document.getElementById('navMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
}, 250));

// ============================================
// ACCESSIBILITY: Keyboard Navigation
// ============================================
document.addEventListener('keydown', function (e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// ============================================
// ANALYTICS & TRACKING (Placeholder)
// ============================================
function trackEvent(category, action, label) {
    // Implement your analytics tracking here
    // Example: Google Analytics, Mixpanel, etc.
    console.log(`Track: ${category} - ${action} - ${label}`);
}

// Track service card clicks
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function () {
            const service = this.getAttribute('data-service');
            trackEvent('Services', 'Click', service);
        });
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            trackEvent('CTA', 'Click', buttonText);
        });
    });
});
