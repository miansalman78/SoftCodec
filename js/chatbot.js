// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeButton = document.querySelector('.close-chatbot');
    const sendButton = document.querySelector('.send-button');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.querySelector('.chatbot-messages');
    
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
    
    // Get bot response based on user input
    function getBotResponse(userMessage) {
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
    }
});