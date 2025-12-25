/* ==========================================
   ENHANCED PORTFOLIO JAVASCRIPT V4
   With Typewriter Effect & Advanced Animations
   ========================================== */

'use strict';

// ==========================================
// TYPEWRITER EFFECT FOR ROLE TEXT
// ==========================================

const initTypewriter = () => {
    const roles = [
        'Frontend Developer',
        'AI Enthusiast',
        'Problem Solver',
        'Creative Coder',
        'UI Enthusiast',
        'Tech Explorer',
    ];
    
    const roleElement = document.querySelector('.role-text');
    if (!roleElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;
    
    const type = () => {
        const currentRole = roles[roleIndex];
        
        if (isPaused) {
            setTimeout(type, pauseDuration);
            isPaused = false;
            isDeleting = true;
            return;
        }
        
        if (isDeleting) {
            // Delete character
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
                return;
            }
        } else {
            // Type character
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isPaused = true;
            }
        }
        
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(type, speed);
    };
    
    // Start typing after a short delay
    setTimeout(() => {
        type();
    }, 1000);
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance
const debounce = (func, wait = 100) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ==========================================
// NAVIGATION - ENHANCED
// ==========================================

const initNavigation = () => {
    const nav = $('#nav');
    const navToggle = $('#navToggle');
    const navLinks = $('#navLinks');
    const menuBackdrop = $('#menuBackdrop');
    const links = $$('.nav-link');
    
    // Toggle mobile menu
    navToggle?.addEventListener('click', () => {
        const isActive = navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close menu on backdrop click
    menuBackdrop?.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
        menuBackdrop?.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
            menuBackdrop?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Scroll effect for navigation
    const handleScroll = () => {
        if (window.scrollY > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', throttle(handleScroll, 100));
    handleScroll();
    
    // Active link on scroll
    const updateActiveLink = () => {
        const sections = $$('section[id]');
        const scrollY = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    updateActiveLink();
};

// ==========================================
// SCROLL REVEAL ANIMATIONS - ENHANCED
// ==========================================

const initScrollReveal = () => {
    const reveals = $$('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
};

// ==========================================
// NUMBER COUNTER ANIMATION
// ==========================================

const initNumberCounters = () => {
    const counters = $$('.stat-number[data-count]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                const suffix = element.getAttribute('data-suffix') || '';
element.textContent = Math.floor(current) + suffix;

                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;

            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
};

// ==========================================
// PROJECT FILTERING - ENHANCED
// ==========================================

const initProjectFilters = () => {
    const filterBtns = $$('.filter-btn');
    const projectCards = $$('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects with staggered animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.classList.remove('hidden');
                    
                    // Stagger the animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
};

// ==========================================
// COPY EMAIL FUNCTIONALITY - ENHANCED
// ==========================================

const initCopyEmail = () => {
    const copyEmailBtn = $('#copy-email-btn');
    const copySuccessMsg = $('#copy-success');

    if (copyEmailBtn && copySuccessMsg) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'khanafzankhan79@gmail.com';
            const originalText = copyEmailBtn.innerHTML;

            try {
                await navigator.clipboard.writeText(email);
                showCopySuccess();
                
                // Change button text temporarily
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> <span class="btn-text">Copied!</span>';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                fallbackCopyEmail(email);
                showCopySuccess();
            }
        });
    }
    
    function showCopySuccess() {
        const copySuccessMsg = $('#copy-success');
        if (copySuccessMsg) {
            copySuccessMsg.classList.add('show');
            copySuccessMsg.style.display = 'block';
            
            setTimeout(() => {
                copySuccessMsg.classList.remove('show');
                setTimeout(() => {
                    copySuccessMsg.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }
    
    function fallbackCopyEmail(email) {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
};

// ==========================================
// SMOOTH SCROLLING - ENHANCED
// ==========================================

const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = $(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add highlight effect to target section
                target.style.transition = 'all 0.3s ease';
                target.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    target.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
};

// ==========================================
// TECH ICONS INTERACTION - ENHANCED
// ==========================================

const initTechIcons = () => {
    const techIcons = $$('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            // Pause the orbit rotation temporarily
            const orbitRing = icon.closest('.orbit-ring');
            if (orbitRing) {
                orbitRing.style.animationPlayState = 'paused';
            }
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid var(--color-accent);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            icon.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        icon.addEventListener('mouseleave', () => {
            // Resume the orbit rotation
            const orbitRing = icon.closest('.orbit-ring');
            if (orbitRing) {
                orbitRing.style.animationPlayState = 'running';
            }
        });
        
        // Add click event for mobile
        icon.addEventListener('click', () => {
            icon.style.animation = 'iconBounce 0.5s ease';
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        });
    });
    
    // Add ripple keyframe
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            @keyframes iconBounce {
                0%, 100% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.3); }
            }
        `;
        document.head.appendChild(style);
    }
};

// ==========================================
// SCROLL TO TOP BUTTON - ENHANCED
// ==========================================

const initScrollToTop = () => {
    const scrollBtn = $('#scrollToTop');
    
    if (!scrollBtn) return;
    
    // Show/hide button based on scroll position
    const toggleScrollBtn = () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };
    
    window.addEventListener('scroll', throttle(toggleScrollBtn, 100));
    toggleScrollBtn();
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add rotation animation
        scrollBtn.style.transform = 'scale(1) rotate(360deg)';
        setTimeout(() => {
            scrollBtn.style.transform = '';
        }, 600);
    });
};

// ==========================================
// KEYBOARD SHORTCUTS - ENHANCED
// ==========================================

const initKeyboardShortcuts = () => {
    const shortcuts = {
        'h': '#hero',
        'a': '#about',
        's': '#skills',
        'p': '#projects',
        'c': '#contact'
    };
    
    document.addEventListener('keydown', (e) => {
        // Don't trigger when typing in inputs
        if (e.target.matches('input, textarea, button')) return;
        
        const section = shortcuts[e.key.toLowerCase()];
        if (section) {
            e.preventDefault();
            const target = $(section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Flash effect
                target.style.boxShadow = '0 0 30px rgba(88, 101, 242, 0.5)';
                setTimeout(() => {
                    target.style.boxShadow = '';
                }, 500);
            }
        }
    });
    
    console.log('%c🎹 Keyboard Shortcuts', 'color: #5865f2; font-size: 14px; font-weight: bold;');
    console.log('H - Home | A - About | S - Skills | P - Projects | C - Contact');
};

// ==========================================
// EASTER EGG - KONAMI CODE - ENHANCED
// ==========================================

const initEasterEgg = () => {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    const activateEasterEgg = () => {
        // Create enhanced confetti effect
        const colors = ['#5865f2', '#7289ff', '#ffffff', '#9999a8', '#e8e8f0'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const size = Math.random() * 10 + 5;
                
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    z-index: 10000;
                    pointer-events: none;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                `;
                document.body.appendChild(confetti);
                
                const duration = Math.random() * 3000 + 2000;
                const rotation = Math.random() * 720 - 360;
                const drift = Math.random() * 200 - 100;
                
                confetti.animate([
                    {
                        transform: `translateY(0) translateX(0) rotate(0deg)`,
                        opacity: 1
                    },
                    {
                        transform: `translateY(${window.innerHeight + 20}px) translateX(${drift}px) rotate(${rotation}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: duration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => confetti.remove(), duration);
            }, i * 15);
        }
        
        // Show enhanced message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, rgba(18, 18, 26, 0.98), rgba(26, 26, 36, 0.98));
            backdrop-filter: blur(20px);
            padding: 3rem;
            border-radius: 1.5rem;
            border: 2px solid var(--color-accent);
            z-index: 10001;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 100px rgba(88, 101, 242, 0.5);
            opacity: 0;
        `;
        message.innerHTML = `
            <h2 style="color: #5865f2; margin-bottom: 1rem; font-size: 2.5rem; font-family: 'Syne', sans-serif;">🎮 Achievement Unlocked!</h2>
            <p style="color: #e8e8f0; font-size: 1.25rem; margin-bottom: 0.5rem;">You found the secret Konami Code!</p>
            <p style="color: #9999a8; font-size: 1rem;">A true developer of culture 🎉</p>
        `;
        document.body.appendChild(message);
        
        // Animate message entrance
        setTimeout(() => {
            message.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            message.style.opacity = '1';
            message.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        setTimeout(() => {
            message.style.transition = 'all 0.3s ease';
            message.style.opacity = '0';
            message.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 4000);
        
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #5865f2; font-size: 24px; font-weight: bold;');
        console.log('%c✨ Pure magic!', 'color: #7289ff; font-size: 16px;');
    };
};

// ==========================================
// LOADING ANIMATION
// ==========================================

const initLoadingAnimation = () => {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.opacity = '1';
        });
    });
};

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

const logPerformance = () => {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                
                console.log('%c⚡ Performance Metrics', 'color: #5865f2; font-size: 16px; font-weight: bold;');
                console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #7289ff;');
                console.log(`%cDOM Ready Time: ${domReadyTime}ms`, 'color: #7289ff;');
            }, 0);
        });
    }
};

// ==========================================
// INITIALIZE ALL
// ==========================================

const init = () => {
    console.log('%c👋 Welcome to Afzan\'s Portfolio!', 'color: #5865f2; font-size: 24px; font-weight: bold;');
    console.log('%c✨ Built with passion and modern web technologies', 'color: #7289ff; font-size: 14px;');
    console.log('%c🚀 Enhanced with advanced animations and typewriter effect', 'color: #9999a8; font-size: 12px;');
    
    // Initialize all features
    initTypewriter();
    initNavigation();
    initScrollReveal();
    initNumberCounters();
    initProjectFilters();
    initCopyEmail();
    initSmoothScroll();
    initScrollToTop();
    initTechIcons();
    initKeyboardShortcuts();
    initEasterEgg();
    initLoadingAnimation();
    logPerformance();
};

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', debounce(() => {
    console.log('%c📱 Window resized - layout adjusted', 'color: #9999a8;');
}, 250));

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('%c👋 See you soon!', 'color: #9999a8;');
    } else {
        console.log('%c👋 Welcome back!', 'color: #5865f2;');
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init };
}