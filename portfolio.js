// ===================================
// Portfolio Interactive Features
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCardAnimations();
    initScrollEffects();
});

// ===================================
// Tab Navigation System
// ===================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');

                // Animate cards when tab becomes active
                animateCards(targetPane);
            }
        });
    });
}

// ===================================
// Card Animations
// ===================================
function initCardAnimations() {
    const cards = document.querySelectorAll('.project-card');

    // Add entrance animation on page load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add click ripple effect
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only create ripple if not clicking the link directly
            if (!e.target.closest('.card-link')) {
                createRipple(e, card);
            }
        });

        // Add keyboard accessibility
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = card.querySelector('.card-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

function animateCards(pane) {
    const cards = pane.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Scroll Effects
// ===================================
function initScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');

    if (header) {
        // Parallax effect on header
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = Math.max(1 - scrolled / 500, 0);
    }

    // Animate cards on scroll into view
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const activeIndex = tabButtons.findIndex(btn => btn.classList.contains('active'));

    // Arrow key navigation for tabs
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        e.preventDefault();
        tabButtons[activeIndex - 1].click();
        tabButtons[activeIndex - 1].focus();
    } else if (e.key === 'ArrowRight' && activeIndex < tabButtons.length - 1) {
        e.preventDefault();
        tabButtons[activeIndex + 1].click();
        tabButtons[activeIndex + 1].focus();
    }
});

// ===================================
// Dynamic Project Counter
// ===================================
function updateProjectCount() {
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabPanes.forEach(pane => {
        const cards = pane.querySelectorAll('.project-card');
        const count = cards.length;

        // Add count badge to tab button if needed
        const tabId = pane.id;
        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);

        if (tabButton && !tabButton.querySelector('.count-badge')) {
            const badge = document.createElement('span');
            badge.className = 'count-badge';
            badge.textContent = count;
            badge.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 255, 255, 0.2);
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            `;
            tabButton.appendChild(badge);
        }
    });
}

// Call on load
updateProjectCount();

// ===================================
// Enhanced Accessibility
// ===================================
// Add ARIA live region for tab changes
const liveRegion = document.createElement('div');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.className = 'sr-only';
liveRegion.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;
document.body.appendChild(liveRegion);

// Update live region on tab change
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.querySelector('.tab-label').textContent;
        const activePane = document.querySelector('.tab-pane.active');
        const projectCount = activePane.querySelectorAll('.project-card').length;

        liveRegion.textContent = `${tabName} seleccionada, mostrando ${projectCount} proyecto${projectCount !== 1 ? 's' : ''}`;
    });
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🎨 Portafolio de Actividades', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cDesarrollo Web | HTML · CSS · JavaScript', 'color: #764ba2; font-size: 14px;');
console.log('%c✨ Diseñado con glassmorphism y animaciones modernas', 'color: #4facfe; font-size: 12px;');
