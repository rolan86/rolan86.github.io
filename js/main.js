/**
 * Merryl D'Mello - Portfolio JavaScript
 * Waitlist form, smooth scrolling, and interactions
 */

// Waitlist Form Handler
const waitlistForm = document.getElementById('waitlist-form');
const formSuccess = document.getElementById('form-success');

// Simulated waitlist count
let waitlistCount = Math.floor(Math.random() * 20) + 40;
const countElement = document.querySelector('.count-number');
if (countElement) {
    countElement.textContent = waitlistCount;
}

if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;

        // Validate email
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address');
            return;
        }

        // Disable submit button
        const submitBtn = waitlistForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';

        try {
            // TODO: Replace with actual form submission
            // Options:
            // 1. ConvertKit Form API
            // 2. Formspree (https://formspree.io)
            // 3. Google Sheets via Google Apps Script
            // 4. Custom backend endpoint

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store locally (remove in production)
            const submissions = JSON.parse(localStorage.getItem('waitlist') || '[]');
            submissions.push({ email, timestamp: new Date().toISOString() });
            localStorage.setItem('waitlist', JSON.stringify(submissions));

            // Increment and update counter
            waitlistCount++;
            if (countElement) {
                countElement.textContent = waitlistCount;
            }

            // Show success
            waitlistForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');

            console.log('Waitlist signup:', { email });

        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('Something went wrong. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    let errorEl = document.querySelector('.form-error');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-error';
        errorEl.style.cssText = 'color: #dc2626; font-size: 0.875rem; margin-top: 0.5rem;';
        waitlistForm.appendChild(errorEl);
    }
    errorEl.textContent = message;
    setTimeout(() => {
        errorEl.textContent = '';
    }, 5000);
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
console.log('%cSenior Automation Consultant', 'font-family: sans-serif; font-size: 14px; color: #1a1f2e;');
console.log('%c17 years helping companies eliminate repetitive work.', 'font-family: sans-serif; color: #4a5568;');
console.log('%cJoin the waitlist to be notified when I launch in April 2026.', 'font-family: sans-serif; color: #94a3b8;');
