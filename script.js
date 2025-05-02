// Main JavaScript file for portfolio

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize skills progress bars
    initSkillsBars();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize chatbot
    initChatbot();
    
    // Initialize page transition animations
    initPageTransitions();
    
    // Initialize typing effect for the header
    new TypeEffect(document.querySelector('.hero-title'), {
        strings: ["Web Developer", "Designer", "Problem Solver", "Creative Thinker"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
});

// Handle animations based on scroll
function initAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Uncomment below if you want animations to replay when scrolling back up
                // entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Handle theme toggling (light/dark mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the OS preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    updateThemeToggleIcon(currentTheme === 'dark');
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleIcon(isDark);
        
        // Add animation class
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    });
    
    function updateThemeToggleIcon(isDark) {
        themeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    }
}

// Mobile navigation functionality
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Initialize skill progress bars with animation
function initSkillsBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const percentage = progressBar.getAttribute('data-progress');
                progressBar.style.width = percentage + '%';
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Here you would normally send data to a server
            // For demo, we'll simulate a successful submission after 1.5 seconds
            setTimeout(() => {
                showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormMessage(message, type) {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = 'form-message';
            messageDiv.classList.add(type);
            messageDiv.style.opacity = '1';
            
            setTimeout(() => {
                messageDiv.style.opacity = '0';
            }, 5000);
        }
    }
}

// Simple typing effect class
class TypeEffect {
    constructor(element, options) {
        this.element = element;
        this.options = Object.assign({
            strings: ['Default text'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: false
        }, options);
        
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.pause = false;
        
        this.type();
    }
    
    type() {
        const currentString = this.options.strings[this.currentStringIndex];
        let text = '';
        
        if (this.isDeleting) {
            text = currentString.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            text = currentString.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        this.element.textContent = text;
        
        let typeSpeed = this.isDeleting ? this.options.backSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentString.length) {
            typeSpeed = this.options.backDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentStringIndex++;
            
            if (this.currentStringIndex === this.options.strings.length) {
                if (this.options.loop) {
                    this.currentStringIndex = 0;
                } else {
                    return;
                }
            }
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Page transitions
function initPageTransitions() {
    // Handle internal links for smooth transitions between pages
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links within your site
        if (link.href.includes(window.location.origin) && 
            !link.getAttribute('href').startsWith('#') && 
            link.target !== '_blank') {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetHref = this.getAttribute('href');
                
                // Add exit animation
                document.body.classList.add('page-exit');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500);
            });
        }
    });
    
    // Add entry animation when page loads
    window.addEventListener('pageshow', function() {
        document.body.classList.add('page-enter');
        setTimeout(() => {
            document.body.classList.remove('page-enter');
        }, 1000);
    });
}

// Chatbot functionality
function initChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatToggle = document.getElementById('chat-toggle');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    
    if (!chatbot || !chatToggle) return;
    
    // Predefined responses for the chatbot
    const botResponses = {
        greetings: [
            "Hello! Welcome to my portfolio!",
            "Hi there! How can I help you explore my work?",
            "Welcome! I'm the portfolio assistant. What would you like to know?"
        ],
        about: [
            "I'm a passionate web developer with expertise in front-end and back-end technologies.",
            "I love creating responsive and user-friendly websites using modern technologies.",
            "My goal is to build beautiful and functional websites that solve real problems."
        ],
        skills: [
            "I specialize in HTML, CSS, JavaScript, React, Node.js, and more!",
            "My technical skills include front-end development, back-end development, and UI/UX design.",
            "I'm proficient in various frameworks and libraries including React, Vue, Express, and MongoDB."
        ],
        projects: [
            "Check out the Projects section to see my latest work!",
            "I've worked on various projects including e-commerce sites, portfolios, and web applications.",
            "My projects demonstrate my skills in responsive design, API integration, and clean code."
        ],
        contact: [
            "You can reach me through the contact form or via email/social media links.",
            "I'm always open to new opportunities and collaborations!",
            "Feel free to send me a message through any of the contact methods provided."
        ],
        default: [
            "I'm not sure I understand. Could you please rephrase?",
            "That's an interesting question! Please check my portfolio for more information.",
            "I'm a simple bot. For detailed information, please browse through the portfolio sections."
        ]
    };
    
    // Toggle chatbot visibility
    chatToggle.addEventListener('click', function() {
        chatbot.classList.toggle('active');
        
        // If opening the chat, show greeting
        if (chatbot.classList.contains('active') && chatMessages.children.length === 0) {
            setTimeout(() => {
                addBotMessage(getRandomResponse('greetings'));
                setTimeout(() => {
                    addBotMessage("How can I help you today?");
                }, 1000);
            }, 500);
        }
    });
    
    // Send message when button is clicked
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addUserMessage(message);
        chatInput.value = '';
        
        // Process message and respond
        setTimeout(() => {
            const response = processMessage(message);
            addBotMessage(response);
        }, 500);
    }
    
    function addUserMessage(message) {
        const msgElement = document.createElement('div');
        msgElement.className = 'chat-message user-message';
        msgElement.textContent = message;
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addBotMessage(message) {
        const msgElement = document.createElement('div');
        msgElement.className = 'chat-message bot-message';
        msgElement.textContent = message;
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function processMessage(message) {
        message = message.toLowerCase();
        
        // Check for keywords and return appropriate response
        if (containsAny(message, ['hi', 'hello', 'hey', 'greetings', 'howdy'])) {
            return getRandomResponse('greetings');
        } else if (containsAny(message, ['about', 'who', 'background', 'yourself'])) {
            return getRandomResponse('about');
        } else if (containsAny(message, ['skill', 'abilities', 'know', 'expertise', 'tech'])) {
            return getRandomResponse('skills');
        } else if (containsAny(message, ['project', 'work', 'portfolio', 'created', 'built'])) {
            return getRandomResponse('projects');
        } else if (containsAny(message, ['contact', 'email', 'reach', 'hire', 'touch'])) {
            return getRandomResponse('contact');
        } else {
            return getRandomResponse('default');
        }
    }
    
    function containsAny(str, keywords) {
        return keywords.some(keyword => str.includes(keyword));
    }
    
    function getRandomResponse(category) {
        const responses = botResponses[category] || botResponses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
}