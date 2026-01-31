// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
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

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
        // Initialize with Public Key from config file
        if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        }
    }

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const submitBtnText = document.getElementById('submitBtnText');
            const submitBtnLoader = document.getElementById('submitBtnLoader');
            const formMessage = document.getElementById('formMessage');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtnText.style.display = 'none';
            submitBtnLoader.style.display = 'inline';
            formMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                phone: formData.get('phone') || 'Not provided',
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'info.nitish1997@gmail.com'
            };
            
            // Check if EmailJS is configured and available
            const isEmailJSConfigured = typeof emailjs !== 'undefined' && 
                                       typeof EMAILJS_CONFIG !== 'undefined' &&
                                       EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
                                       EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';
            
            if (isEmailJSConfigured && emailjs.send) {
                // Send email using EmailJS
                emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
                    to_email: EMAILJS_CONFIG.TO_EMAIL,
                    from_name: data.from_name,
                    from_email: data.from_email,
                    phone: data.phone,
                    subject: data.subject,
                    message: data.message,
                    reply_to: data.from_email
                })
                .then(function(response) {
                    // Success
                    showMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    // Error
                    console.error('EmailJS Error:', error);
                    showMessage('error', 'Sorry, there was an error sending your message. Please try again or contact us directly at info.nitish1997@gmail.com');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtnText.style.display = 'inline';
                    submitBtnLoader.style.display = 'none';
                });
            } else {
                // Fallback: Use mailto if EmailJS is not configured
                const mailtoLink = `mailto:info.nitish1997@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
                    `Name: ${data.from_name}\nEmail: ${data.from_email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`
                )}`;
                window.location.href = mailtoLink;
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtnText.style.display = 'inline';
                submitBtnLoader.style.display = 'none';
                
                showMessage('info', 'Opening your email client. Please send the message manually.');
            }
        });
    }
    
    // Function to show form messages
    function showMessage(type, text) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.className = 'form-message form-message-' + type;
            formMessage.textContent = text;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .service-card, .value-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
