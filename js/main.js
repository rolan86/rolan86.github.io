/**
 * Merryl D'Mello - Portfolio JavaScript
 * Waitlist form, smooth scrolling, and interactions
 */

// Waitlist Form Handler - Formspree AJAX
const waitlistForm = document.getElementById('waitlist-form');
const formSuccess = document.getElementById('form-success');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function(evt) {
        evt.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';

        const data = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success - hide form, show success message
                this.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            } else {
                // Error - show message and re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                alert('Something went wrong. Please try again.');
            }
        }).catch(error => {
            // Error - show message and re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            alert('Something went wrong. Please try again.');
        });
    });
}

// Smooth scroll for navigation links
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

// Scroll-triggered animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.case-study, .journey-item, .about-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
    lastScrollY = window.scrollY;
});

// Metric counter animation
const metrics = document.querySelectorAll('.metric-value');
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;

            // Only animate numeric values
            if (/^\d+/.test(finalValue)) {
                const numericValue = parseInt(finalValue);
                let currentValue = 0;
                const increment = numericValue / 30;
                const duration = 1500;
                const stepTime = duration / 30;

                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue);
                    }
                }, stepTime);
            }

            metricObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

metrics.forEach(metric => metricObserver.observe(metric));

// Console message for developers
console.log('%cMerryl D\'Mello', 'font-family: serif; font-size: 24px; color: #c45d08;');
console.log('%cProduct Leader & Technical Strategist', 'font-family: sans-serif; font-size: 14px; color: #1a1f2e;');
console.log('%c18 years bridging product strategy and technical execution.', 'font-family: sans-serif; color: #4a5568;');
console.log('%cJoin the waitlist to be notified when I launch in April 2026.', 'font-family: sans-serif; color: #94a3b8;');
