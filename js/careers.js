// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Animate benefits cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    gsap.set(benefitCards, { y: 50, opacity: 0 });
    
    gsap.to(benefitCards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.benefits-grid',
            start: "top 80%"
        }
    });

    // Animate job cards
    const jobCards = document.querySelectorAll('.job-card');
    gsap.set(jobCards, { y: 50, opacity: 0 });
    
    gsap.to(jobCards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.job-cards',
            start: "top 80%"
        }
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const xOffset = window.innerWidth > 992 ? 50 * direction : 50;
        
        gsap.set(item.querySelector('.timeline-content'), { 
            x: xOffset, 
            opacity: 0 
        });
        
        gsap.to(item.querySelector('.timeline-content'), {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            }
        });
    });

    // 3D tilt effect for job cards
    jobCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateY = mouseX * 0.05;
            const rotateX = -mouseY * 0.05;
            
            // Apply the transform
            gsap.to(card, {
                rotationY: rotateY,
                rotationX: rotateX,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
            
            // Add a subtle shadow effect
            gsap.to(card, {
                boxShadow: `${-mouseX * 0.05}px ${-mouseY * 0.05}px 20px rgba(0, 0, 0, 0.15)`,
                duration: 0.4
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset the transform when mouse leaves
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    // Apply button animation
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1
            });
        });
        
        button.addEventListener('mouseup', function() {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: "elastic.out(1, 0.3)"
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(button, {
                scale: 1,
                duration: 0.2
            });
        });
    });

    // Job filtering functionality
    const filterButtons = document.querySelectorAll('.job-filter-btn');
    const jobs = document.querySelectorAll('.job-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter jobs
            jobs.forEach(job => {
                if (filter === 'all' || job.getAttribute('data-category') === filter) {
                    gsap.to(job, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        display: 'flex'
                    });
                } else {
                    gsap.to(job, {
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: function() {
                            job.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
});