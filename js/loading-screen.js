document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
        }, 1000); // 1 second delay to ensure logo is visible
    });
});