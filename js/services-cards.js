// Services Cards 3D Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Select all service cards
    const serviceCards = document.querySelectorAll('.service-card-detailed');
    
    // Apply animations to each card
    serviceCards.forEach((card, index) => {
        // Staggered entrance animation
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
        
        // 3D tilt effect on mousemove
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    // Handle the 3D tilt effect
    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Calculate mouse position relative to card center
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation angles (limited to small values for subtle effect)
        const rotateY = mouseX * 0.05; // Horizontal rotation
        const rotateX = -mouseY * 0.05; // Vertical rotation (inverted)
        
        // Apply the 3D transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Add subtle shadow effect
        card.style.boxShadow = `
            0 15px 35px rgba(0, 0, 0, 0.1),
            ${-rotateY * 0.1}px ${-rotateX * 0.1}px 20px rgba(0, 0, 0, 0.05)
        `;
        
        // Create a light reflection effect
        const glareX = (mouseX / cardWidth) * 100 + 50;
        const glareY = (mouseY / cardHeight) * 100 + 50;
        card.style.background = `
            linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0) 50%
            ),
            rgba(255, 255, 255, 0.7)
        `;
    }
    
    // Reset the card to its original state
    function resetTilt() {
        const card = this;
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.background = '';
        
        // Smooth transition back to original state
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            duration: 0.5,
            ease: "power2.out"
        });
    }
    
    // Process section animation
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Staggered entrance animation for process steps
        gsap.from(step, {
            x: index % 2 === 0 ? -50 : 50,
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.process-steps',
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Technology icons animation
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        // Staggered entrance animation for tech icons
        gsap.from(icon, {
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: icon,
                start: "top bottom-=50",
                toggleActions: "play none none none"
            }
        });
    });
});