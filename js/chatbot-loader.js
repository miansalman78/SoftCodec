// Chatbot Loader - Automatically injects chatbot into all pages
document.addEventListener('DOMContentLoaded', function() {
    // Only proceed if chatbot doesn't already exist on the page
    if (!document.querySelector('.chatbot-container')) {
        // Create chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'chatbot-container';
        
        // Set HTML content
        chatbotContainer.innerHTML = `
            <div class="chatbot-button">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chatbot-box">
                <div class="chatbot-header">
                    <h3>SoftCodec Assistant</h3>
                    <button class="close-chatbot">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chatbot-messages">
                    <div class="message bot-message">
                        Hello! Welcome to SoftCodec. How can I help you today?
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Type your message here..." id="user-input">
                    <button class="send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(chatbotContainer);
        
        // Add CSS if not already loaded
        if (!document.querySelector('link[href="css/chatbot.css"]')) {
            const chatbotCSS = document.createElement('link');
            chatbotCSS.rel = 'stylesheet';
            chatbotCSS.href = 'css/chatbot.css';
            document.head.appendChild(chatbotCSS);
        }
    }
    
    // Initialize chatbot directly
    setTimeout(initializeChatbot, 100);
    
    // Function to initialize chatbot functionality
    function initializeChatbot() {
        // Elements
        const chatbotButton = document.querySelector('.chatbot-button');
        const chatbotBox = document.querySelector('.chatbot-box');
        const closeButton = document.querySelector('.close-chatbot');
        const sendButton = document.querySelector('.send-button');
        const userInput = document.getElementById('user-input');
        const messagesContainer = document.querySelector('.chatbot-messages');
        
        if (!chatbotButton || !chatbotBox || !closeButton || !sendButton || !userInput || !messagesContainer) {
            console.error('Chatbot elements not found');
            return;
        }
        
        // Toggle chatbot visibility
        chatbotButton.addEventListener('click', function() {
            chatbotBox.classList.toggle('active');
        });
        
        // Close chatbot
        closeButton.addEventListener('click', function() {
            chatbotBox.classList.remove('active');
        });
        
        // Send message function
        function sendMessage() {
            const message = userInput.value.trim();
            if (message !== '') {
                // Add user message to chat
                addMessage(message, 'user');
                
                // Clear input
                userInput.value = '';
                
                // Get bot response after a short delay
                setTimeout(() => {
                    const response = getBotResponse(message);
                    addMessage(response, 'bot');
                    
                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 600);
            }
        }
        
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(sender + '-message');
            messageDiv.textContent = text;
            
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Get bot response based on user input
    window.getBotResponse = function(userMessage) {
        // Convert to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Simple response logic
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! How can I help you today?';
        } 
        else if (message.includes('services') || message.includes('what do you do')) {
            return 'We offer web development, mobile app development, AI solutions, and digital marketing services. Would you like to know more about any specific service?';
        }
        else if (message.includes('web') || message.includes('website')) {
            return 'Our web development team creates responsive, modern websites tailored to your business needs. Would you like to discuss a project?';
        }
        else if (message.includes('app') || message.includes('mobile')) {
            return 'We develop custom mobile applications for iOS and Android platforms. Our apps are designed with user experience in mind.';
        }
        else if (message.includes('ai') || message.includes('artificial intelligence')) {
            return 'Our AI solutions help businesses automate processes, gain insights from data, and enhance customer experiences.';
        }
        else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
            return 'Our pricing depends on the scope and requirements of your project. Would you like to get a free consultation?';
        }
        else if (message.includes('contact') || message.includes('talk') || message.includes('reach')) {
            return 'You can reach us through our contact form, email at info@softcodec.com, or call us at +1 (234) 567-890.';
        }
        else if (message.includes('location') || message.includes('address') || message.includes('office')) {
            return 'Our main office is located in Lahore, Pakistan. We also have remote teams working globally.';
        }
        else if (message.includes('portfolio') || message.includes('projects') || message.includes('work')) {
            return 'You can check our portfolio page to see our previous projects. Would you like me to direct you there?';
        }
        else if (message.includes('team') || message.includes('developers')) {
            return 'Our team consists of experienced developers, designers, and project managers dedicated to delivering high-quality solutions.';
        }
        else if (message.includes('thank')) {
            return 'You\'re welcome! Feel free to ask if you have any other questions.';
        }
        else if (message.includes('bye')) {
            return 'Thank you for chatting with us! Have a great day!';
        }
        else {
            return 'I\'m not sure I understand. Could you please rephrase or ask about our services, portfolio, or contact information?';
        }
    };
});