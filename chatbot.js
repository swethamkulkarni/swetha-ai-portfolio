// Dedicated chatbot functionality
class PortfolioChatbot {
    constructor(options = {}) {
        this.options = Object.assign({
            containerId: 'chatbot',
            toggleId: 'chat-toggle',
            messagesId: 'chat-messages',
            inputId: 'chat-input',
            sendBtnId: 'chat-send',
            botName: 'Portfolio Assistant',
            typingSpeed: 30,
            initialDelay: 1000,
            greetingDelay: 500,
            responseDelay: 800
        }, options);
        
        // Bot responses dictionary
        this.responses = {
            greetings: [
                "Hello! Welcome to my portfolio!",
                "Hi there! I'm the portfolio assistant. How can I help you?",
                "Welcome! I'm here to help you explore my work and skills."
            ],
            about: [
                "I'm a passionate web developer focused on creating seamless user experiences.",
                "I specialize in building responsive websites and interactive web applications.",
                "With experience in both front-end and back-end development, I create comprehensive solutions for diverse clients."
            ],
            skills: [
                "My technical skills include HTML, CSS, JavaScript, React, Node.js, MongoDB, and more!",
                "I'm proficient in responsive design, UI/UX principles, and modern JavaScript frameworks.",
                "My expertise spans front-end technologies, back-end development, database management, and deployment strategies."
            ],
            projects: [
                "Check out my Projects section to see my latest work!",
                "I've worked on e-commerce sites, portfolio websites, web applications, and various other projects.",
                "My portfolio showcases projects that demonstrate my skills in UI/UX design, API integration, and responsive development."
            ],
            education: [
                "I have a degree in Computer Science and continue learning through online courses and workshops.",
                "I constantly update my skills through self-learning and industry certifications.",
                "My education combines formal academics and practical experience in the tech industry."
            ],
            experience: [
                "I have professional experience working with diverse clients and projects.",
                "My work history includes freelance projects, agency work, and collaborative team environments.",
                "I've collaborated with startups, established businesses, and non-profit organizations."
            ],
            contact: [
                "You can reach me through the contact form or via email/social media links.",
                "I'm open to freelance opportunities, full-time positions, and collaborations!",
                "Feel free to connect with me on LinkedIn or send an email directly."
            ],
            services: [
                "I offer web development, UI/UX design, and consulting services.",
                "My services include custom website development, web application creation, and existing site optimization.",
                "I provide end-to-end solutions from concept to deployment and maintenance."
            ],
            default: [
                "I'm not sure I understand. Could you please rephrase that?",
                "That's an interesting question! Please check my portfolio sections for more information.",
                "I'm a simple bot. For more detailed information, please explore the portfolio or use the contact form."
            ]
        };
        
        // Elements
        this.chatbot = document.getElementById(this.options.containerId);
        this.chatToggle = document.getElementById(this.options.toggleId);
        this.chatMessages = document.getElementById(this.options.messagesId);
        this.chatInput = document.getElementById(this.options.inputId);
        this.sendBtn = document.getElementById(this.options.sendBtnId);
        
        // Initialize if elements exist
        if (this.chatbot && this.chatToggle) {
            this.init();
        }
    }
    
    init() {
        // Add event listeners
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Add close button if it doesn't exist
        if (!document.getElementById('chat-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.id = 'chat-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.className = 'chat-close-btn';
            closeBtn.addEventListener('click', () => this.toggleChat(false));
            this.chatbot.appendChild(closeBtn);
        }
        
        // Add typing indicator if it doesn't exist
        if (!document.getElementById('typing-indicator')) {
            const typingIndicator = document.createElement('div');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.className = 'typing-indicator hidden';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            this.chatMessages.appendChild(typingIndicator);
        }
        
        this.typingIndicator = document.getElementById('typing-indicator');
    }
    
    toggleChat(show = null) {
        // If show is explicitly set, use that value, otherwise toggle
        if (show !== null) {
            this.chatbot.classList.toggle('active', show);
        } else {
            this.chatbot.classList.toggle('active');
        }
        
        // Show greeting when opening chat for the first time
        if (this.chatbot.classList.contains('active') && this.chatMessages.children.length <= 1) {
            setTimeout(() => {
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addBotMessage(this.getRandomResponse('greetings'));
                    
                    setTimeout(() => {
                        this.showTypingIndicator();
                        setTimeout(() => {
                            this.hideTypingIndicator();
                            this.addBotMessage("How can I help you today? You can ask about my projects, skills, or anything else!");
                        }, 1500);
                    }, this.options.greetingDelay);
                }, 1500);
            }, this.options.initialDelay);
        }
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        this.addUserMessage(message);
        this.chatInput.value = '';
        
        // Process message and respond with typing effect
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addBotMessage(response);
        }, this.options.responseDelay);
    }
    
    addUserMessage(message) {
        const msgElement = document.createElement('div');
        msgElement.className = 'chat-message user-message';
        msgElement.textContent = message;
        this.chatMessages.appendChild(msgElement);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const msgElement = document.createElement('div');
        msgElement.className = 'chat-message bot-message';
        
        // Add bot name if configured
        if (this.options.botName) {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'bot-name';
            nameSpan.textContent = this.options.botName;
            msgElement.appendChild(nameSpan);
            msgElement.appendChild(document.createElement('br'));
        }
        
        // Use typing effect for message
        this.typeMessage(msgElement, message);
        
        this.chatMessages.appendChild(msgElement);
        this.scrollToBottom();
    }
    
    typeMessage(element, message, index = 0) {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            this.scrollToBottom();
            setTimeout(() => {
                this.typeMessage(element, message, index + 1);
            }, this.options.typingSpeed);
        }
    }
    
    showTypingIndicator() {
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.typingIndicator.classList.add('hidden');
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    processMessage(message) {
        message = message.toLowerCase();
        
        // Check for keywords and return appropriate response
        if (this.containsAny(message, ['hi', 'hello', 'hey', 'greetings', 'howdy'])) {
            return this.getRandomResponse('greetings');
        } else if (this.containsAny(message, ['about', 'who', 'background', 'yourself'])) {
            return this.getRandomResponse('about');
        } else if (this.containsAny(message, ['skill', 'abilities', 'know', 'expertise', 'tech', 'technologies'])) {
            return this.getRandomResponse('skills');
        } else if (this.containsAny(message, ['project', 'work', 'portfolio', 'created', 'built', 'showcase'])) {
            return this.getRandomResponse('projects');
        } else if (this.containsAny(message, ['education', 'study', 'degree', 'learning', 'school', 'university'])) {
            return this.getRandomResponse('education');
        } else if (this.containsAny(message, ['experience', 'history', 'worked', 'professional'])) {
            return this.getRandomResponse('experience');
        } else if (this.containsAny(message, ['contact', 'email', 'reach', 'hire', 'touch', 'connect'])) {
            return this.getRandomResponse('contact');
        } else if (this.containsAny(message, ['service', 'offer', 'provide', 'help with', 'assistance'])) {
            return this.getRandomResponse('services');
        } else {
            return this.getRandomResponse('default');
        }
    }
    
    containsAny(str, keywords) {
        return keywords.some(keyword => str.includes(keyword));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const portfolioChatbot = new PortfolioChatbot({
        typingSpeed: 20,  // Faster typing for better UX
        botName: 'PortfolioBot' // Custom name for the chatbot
    });
});