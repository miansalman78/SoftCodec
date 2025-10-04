// Portfolio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize grid layout
    const grid = document.querySelector('.masonry-grid');
    
    // We're using CSS Grid instead of Masonry
    // This is just for compatibility with existing code
    const masonry = {
        layout: function() {
            // Just a placeholder function
        }
    };
    
    // Make sure images are loaded before applying masonry
    imagesLoaded(grid).on('progress', function() {
        masonry.layout();
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Hide all items first with animation
                gsap.to(item, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    onComplete: function() {
                        item.style.display = 'none';
                        
                        // Show items that match the filter or show all if filter is 'all'
                        if (filterValue === 'all' || category === filterValue) {
                            item.style.display = 'block';
                            
                            // Animate items back in
                            gsap.to(item, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                delay: 0.1
                            });
                        }
                        
                        // Update masonry layout
                        masonry.layout();
                    }
                });
            });
        });
    });
    
    // Animate portfolio items on scroll
    portfolioItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                toggleActions: "play none none none"
            }
        });
    });
    
    // 3D tilt effect on portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const itemRect = item.getBoundingClientRect();
            const itemWidth = itemRect.width;
            const itemHeight = itemRect.height;
            
            // Calculate mouse position relative to item center
            const centerX = itemRect.left + itemWidth / 2;
            const centerY = itemRect.top + itemHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate rotation angles (limited for subtle effect)
            const rotateY = mouseX * 0.03;
            const rotateX = -mouseY * 0.03;
            
            // Apply the 3D transform
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // Reset transform on mouse leave
        item.addEventListener('mouseleave', function() {
            item.style.transform = '';
            
            // Smooth transition back to original state
            gsap.to(item, {
                rotateX: 0,
                rotateY: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});