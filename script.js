// ===================================
// Navigation & Scroll Handling
// ===================================

// Get navigation elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');

// Handle navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (currentScroll > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===================================
// Smooth Scrolling
// ===================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate metric bars when they come into view
            if (entry.target.classList.contains('metric-item')) {
                const fill = entry.target.querySelector('.metric-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll(
    '.competency-card, .experience-card, .skills-category, .contact-method-card, .metric-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Typing Effect for Hero Text
// ===================================

const typingEffect = (element, text, speed = 100) => {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Apply typing effect to hero subtitle on load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typingEffect(heroSubtitle, originalText, 50);
    }
});

// ===================================
// Skill Tags Interaction
// ===================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.transform = 'scale(1.1)';
        setTimeout(() => {
            tag.style.transform = '';
        }, 200);
    });
});

// ===================================
// Competency Cards Interaction
// ===================================

const competencyCards = document.querySelectorAll('.competency-card');

competencyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.competency-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
            icon.style.transition = 'transform 0.6s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.competency-icon');
        if (icon) {
            icon.style.transform = 'none';
        }
    });
});

// ===================================
// Dynamic Stats Counter
// ===================================

const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/\d+/);
                if (match) {
                    const number = parseInt(match[0]);
                    const suffix = text.replace(number.toString(), '');
                    stat.textContent = '0' + suffix;
                    setTimeout(() => {
                        const temp = { value: 0 };
                        const interval = setInterval(() => {
                            temp.value += 1;
                            stat.textContent = temp.value + suffix;
                            if (temp.value >= number) {
                                clearInterval(interval);
                                stat.textContent = text;
                            }
                        }, 50);
                    }, 500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// Contact Method Cards Interaction
// ===================================

const contactMethods = document.querySelectorAll('.contact-method-card');

contactMethods.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.method-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.method-icon');
        if (icon) {
            icon.style.transform = 'none';
        }
    });
});

// ===================================
// Cursor Trail Effect (Optional Enhancement)
// ===================================

let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only on larger screens
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// ===================================
// Parallax Effect for Hero Background
// ===================================

const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ===================================
// Form Validation (if contact form is added)
// ===================================

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// ===================================
// Print Resume Functionality
// ===================================

const createPrintButton = () => {
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-secondary';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Resume';
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '90px';
    printBtn.style.right = '20px';
    printBtn.style.zIndex = '998';
    printBtn.style.display = 'none';
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printBtn);
    
    // Show print button when scrolled
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            printBtn.style.display = 'flex';
        } else {
            printBtn.style.display = 'none';
        }
    });
};

// Uncomment to enable print button
// createPrintButton();

// ===================================
// Copy Contact Info to Clipboard
// ===================================

const copyToClipboard = (text, button) => {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
};

// Add copy functionality to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    const link = item.querySelector('a');
    if (link) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.style.cssText = `
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: 0.3s ease;
            margin-left: auto;
        `;
        
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.textContent || link.getAttribute('href').replace('tel:', '').replace('mailto:', '');
            copyToClipboard(text, copyBtn);
        });
        
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.appendChild(copyBtn);
    }
});

// ===================================
// Easter Egg: Konami Code
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===================================
// Performance Optimization: Lazy Loading
// ===================================

// Add loading="lazy" to any images (if added in the future)
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// ===================================
// Accessibility Enhancements
// ===================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// ===================================
// Console Message
// ===================================

console.log('%c👋 Welcome to Adrian Alasco\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in connecting? Reach out at adriand.alasco@outlook.com', 'font-size: 14px; color: #6b7280;');

// ===================================
// Initialize on Page Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Trigger initial highlight
    highlightNav();
    
    // Add subtle animation to hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
