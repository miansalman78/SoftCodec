/**
 * SoftCodec Premium Website
 * Animations and effects - Optimized for performance
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Optimize animations with batch processing
    ScrollTrigger.batch('.section-header', {
        onEnter: batch => gsap.to(batch, {
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "power2.out"
        }),
        start: "top 85%",
        once: true
    });
    
    // Optimized service cards animation with 3D rotation
    const serviceCards = document.querySelectorAll('.services-snapshot .service-card');
    serviceCards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, rotationY: -30, transformPerspective: 800 });
        
        ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    rotationY: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });
    });
    
    // Optimized feature items animation with 3D flip effect
    const featureItems = document.querySelectorAll('.why-choose-us .feature-item');
    featureItems.forEach((item, index) => {
        gsap.set(item, { opacity: 0, rotationX: 90, transformPerspective: 800 });
        
        ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });
    });
    
    // Client testimonials 3D animation
    const testimonialCards = document.querySelectorAll('.testimonials .testimonial-card');
    testimonialCards.forEach((card, index) => {
        gsap.set(card, { 
            opacity: 0, 
            scale: 0.8, 
            rotationY: -15,
            transformPerspective: 1000 
        });
        
        ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });
    });
    
    // Optimized hero section animation
    const heroElements = document.querySelectorAll('.headline, .subheadline, .cta-buttons');
    gsap.to(heroElements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: function() {
            // Enable 3D effects only after initial animations complete
            initCardEffects();
        }
    });
    
    // Optimized 3D tilt effect for cards - only initialize when needed
    function initCardEffects() {
        // Use a lighter version of the 3D effect with debouncing
        const cards = document.querySelectorAll('.service-card, .testimonial-card');
        let tiltTimeout;
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                clearTimeout(tiltTimeout);
                
                tiltTimeout = setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const xPercent = x / rect.width;
                    const yPercent = y / rect.height;
                    
                    const maxRotate = 3; // Reduced maximum rotation
                    const rotateX = maxRotate - (yPercent * maxRotate * 2);
                    const rotateY = (xPercent * maxRotate * 2) - maxRotate;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                }, 10); // Small debounce for smoother performance
            });
            
            card.addEventListener('mouseleave', function() {
                clearTimeout(tiltTimeout);
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // Optimized parallax effect with throttling
    const heroSection = document.querySelector('.hero');
    let lastScrollTime = 0;
    
    window.addEventListener('scroll', function() {
        const now = Date.now();
        if (now - lastScrollTime > 20) { // Throttle to 50fps max
            lastScrollTime = now;
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const parallaxOffset = scrollPosition * 0.2; // Reduced parallax intensity
                heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
            }
        }
    }, {passive: true}); // Add passive flag for better scroll performance
    
    // Optimized button hover animation
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.03, // Reduced scale effect
                duration: 0.2 // Faster animation
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2 // Faster animation
            });
        });
    });
    
    // Optimized number animation
    const animateNumbers = () => {
        const numberElements = document.querySelectorAll('.stat-number');
        
        if (numberElements.length === 0) return;
        
        ScrollTrigger.batch('.stat-number', {
            onEnter: batch => {
                batch.forEach(element => {
                    const targetNumber = parseInt(element.getAttribute('data-target'));
                    const duration = 1; // Reduced duration
                    let startNumber = 0;
                    const increment = targetNumber / (duration * 30); // 30fps instead of 60fps
                    
                    const counter = setInterval(() => {
                        startNumber += increment;
                        
                        if (startNumber >= targetNumber) {
                            element.textContent = targetNumber.toLocaleString();
                            clearInterval(counter);
                        } else {
                            element.textContent = Math.floor(startNumber).toLocaleString();
                        }
                    }, 1000/30); // 30fps instead of 60fps for better performance
                });
            },
            start: "top 85%",
            once: true
        });
    };
    
    // Call the function if there are stat numbers on the page
    if (document.querySelector('.stat-number')) {
        animateNumbers();
    }
});