// ===================================
// HANDIE ANDIE PREMIUM - JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
// ===================================
    // OPTIMIZE IMAGE LOADING
    // ===================================
    const heroImg = document.querySelector('.hero-img');
    const heroBackground = document.querySelector('.hero-background');
    const aboutImg = document.querySelector('.about-img');
    
    // Add loading class for shimmer effect
    if (heroBackground && !heroImg.complete) {
        heroBackground.classList.add('loading');
    }
    
    // Remove loading class when hero image loads
    if (heroImg) {
        heroImg.addEventListener('load', function() {
            if (heroBackground) {
                heroBackground.classList.remove('loading');
            }
        });
        
        // If image is already cached, remove loading immediately
        if (heroImg.complete) {
            heroBackground.classList.remove('loading');
        }
    }
    
    // Lazy load about image for better performance
    if (aboutImg && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before entering viewport
        });
        
        imageObserver.observe(aboutImg);
    }

    // ===================================
    // MOBILE NAVIGATION TOGGLE
    // ===================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // SCROLL ANIMATIONS - INTERSECTION OBSERVER
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
        '.about-content, .about-image, .service-card, .feature, .testimonial-card'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });

    // ===================================
    // FORM VALIDATION
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    // Validation functions
    function validateName(name) {
        if (name.trim() === '') {
            return 'Please enter your name';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        return '';
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            return 'Please enter your email address';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        if (phone.trim() === '') {
            return 'Please enter your phone number';
        }
        if (!phoneRegex.test(phone)) {
            return 'Please enter a valid phone number';
        }
        return '';
    }

    function validateMessage(message) {
        if (message.trim() === '') {
            return 'Please enter your message';
        }
        if (message.trim().length < 10) {
            return 'Message must be at least 10 characters';
        }
        return '';
    }

    // Clear error message on input
    function clearError(input, errorElement) {
        input.addEventListener('input', function() {
            errorElement.textContent = '';
            input.style.borderColor = '#e0e0e0';
        });
    }

    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(phoneInput, phoneError);
    clearError(messageInput, messageError);

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const message = messageInput.value;

        // Validate all fields
        const nameValidation = validateName(name);
        const emailValidation = validateEmail(email);
        const phoneValidation = validatePhone(phone);
        const messageValidation = validateMessage(message);

        // Display errors
        let hasError = false;

        if (nameValidation) {
            nameError.textContent = nameValidation;
            nameInput.style.borderColor = '#e74c3c';
            hasError = true;
        }

        if (emailValidation) {
            emailError.textContent = emailValidation;
            emailInput.style.borderColor = '#e74c3c';
            hasError = true;
        }

        if (phoneValidation) {
            phoneError.textContent = phoneValidation;
            phoneInput.style.borderColor = '#e74c3c';
            hasError = true;
        }

        if (messageValidation) {
            messageError.textContent = messageValidation;
            messageInput.style.borderColor = '#e74c3c';
            hasError = true;
        }

        // If no errors, submit the form
        if (!hasError) {
            // Submit form to FormSubmit
            contactForm.submit();
            
            // Note: The success message and form reset will happen on the FormSubmit thank you page
            // Or if you want to stay on the same page, remove the line above and use AJAX instead
        }
    });

    // ===================================
    // STAGGER ANIMATIONS FOR SERVICE CARDS
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger by 100ms
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });

    // ===================================
    // STAGGER ANIMATIONS FOR FEATURES
    // ===================================
    const features = document.querySelectorAll('.feature');
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger by 100ms
                featureObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        featureObserver.observe(feature);
    });

    // ===================================
    // STAGGER ANIMATIONS FOR TESTIMONIALS
    // ===================================
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger by 150ms
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    testimonials.forEach(testimonial => {
        testimonialObserver.observe(testimonial);
    });

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    // Debounce scroll events for better performance
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

    // Apply debounce to scroll handler
    const debouncedScroll = debounce(function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // ===================================
    // SMOOTH SCROLL TO TOP ON LOGO CLICK
    // ===================================
    const logo = document.querySelector('.nav-logo');
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // INITIALIZE
    // ===================================
    console.log('Handie Andie Premium - Website Initialized');
});

