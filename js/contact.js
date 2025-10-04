// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    gsap.set(contactCards, { y: 50, opacity: 0 });
    
    gsap.to(contactCards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-cards',
            start: "top 80%"
        }
    });

    // Form animations
    const formElements = document.querySelectorAll('.form-group, .submit-btn');
    gsap.set(formElements, { y: 30, opacity: 0 });
    
    gsap.to(formElements, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 80%"
        }
    });

    // Social icons animation
    const socialIcons = document.querySelectorAll('.social-icon-large');
    gsap.set(socialIcons, { scale: 0, opacity: 0 });
    
    gsap.to(socialIcons, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.social-icons-large',
            start: "top 80%"
        }
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 3D button press effect
    const submitBtn = document.querySelector('.submit-btn');
    
    submitBtn.addEventListener('mousedown', function() {
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1
        });
    });
    
    submitBtn.addEventListener('mouseup', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: "elastic.out(1, 0.3)"
        });
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (valid) {
            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 3000);
            }, 1500);
        }
    });

    // Floating label functionality
    const formInputs = document.querySelectorAll('.floating-label input, .floating-label textarea');
    
    formInputs.forEach(input => {
        // Set initial state
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Add placeholder to make the :not(:placeholder-shown) selector work
        input.setAttribute('placeholder', ' ');
        
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
});