/* Monsif e-Municipality - Main JavaScript */

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let mockData = {
    requests: [],
    complaints: [],
    polls: [],
    news: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadMockData();
    setupEventListeners();
    initializeAnimations();
});

// ===== APP INITIALIZATION =====
function initializeApp() {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize form validations
    initializeFormValidation();
    
    // Initialize chatbot
    initializeChatbot();
    
    // Initialize modals
    initializeModals();
    
    console.log('Monsif e-Municipality initialized successfully');
}

// ===== MOCK DATA MANAGEMENT =====
function loadMockData() {
    // Load from localStorage or create default data
    const savedData = localStorage.getItem('municipalityData');
    if (savedData) {
        mockData = JSON.parse(savedData);
    } else {
        createDefaultMockData();
        saveMockData();
    }
}

function createDefaultMockData() {
    mockData = {
        requests: [
            { id: 'REQ001', type: 'Building Permit', status: 'Approved', date: '2024-01-15', citizen: 'Ahmad Khoury' },
            { id: 'REQ002', type: 'Business License', status: 'Pending', date: '2024-01-20', citizen: 'Fatima Mansour' },
            { id: 'REQ003', type: 'Marriage Certificate', status: 'Completed', date: '2024-01-10', citizen: 'Omar Saad' }
        ],
        complaints: [
            { id: 'COMP001', type: 'Road Maintenance', status: 'In Progress', date: '2024-01-18', citizen: 'Layla Fadel', description: 'Potholes on Main Street' },
            { id: 'COMP002', type: 'Water Supply', status: 'Resolved', date: '2024-01-12', citizen: 'Hassan Younes', description: 'Water pressure issues' }
        ],
        polls: [
            { id: 'POLL001', question: 'Should we build a new community center?', options: ['Yes', 'No'], votes: [45, 23], totalVotes: 68, active: true },
            { id: 'POLL002', question: 'What time should the municipal office close?', options: ['4 PM', '5 PM', '6 PM'], votes: [12, 35, 18], totalVotes: 65, active: false }
        ],
        news: [
            { id: 'NEWS001', title: 'New Road Construction Project', content: 'Starting next month, we will begin construction on the new bypass road...', date: '2024-01-22', author: 'Mayor Office' },
            { id: 'NEWS002', title: 'Community Cleanup Day', content: 'Join us this Saturday for our monthly community cleanup initiative...', date: '2024-01-20', author: 'Environmental Committee' }
        ]
    };
}

function saveMockData() {
    localStorage.setItem('municipalityData', JSON.stringify(mockData));
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Animate statistics counters
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                handleFormSubmission(this);
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(input.value)) {
                showFieldError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== FORM SUBMISSION HANDLING =====
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const formType = form.dataset.formType || 'general';
    
    showLoading(form);
    
    // Simulate API call
    setTimeout(() => {
        hideLoading(form);
        
        switch (formType) {
            case 'request':
                handleRequestSubmission(formData);
                break;
            case 'complaint':
                handleComplaintSubmission(formData);
                break;
            case 'contact':
                handleContactSubmission(formData);
                break;
            case 'admin-login':
                handleAdminLogin(formData);
                break;
            case 'news':
                handleNewsSubmission(formData);
                break;
            case 'poll':
                handlePollSubmission(formData);
                break;
            default:
                showSuccessMessage('Form submitted successfully!');
        }
        
        form.reset();
    }, 1500);
}

function handleRequestSubmission(formData) {
    const newRequest = {
        id: 'REQ' + String(mockData.requests.length + 1).padStart(3, '0'),
        type: formData.get('requestType'),
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        citizen: formData.get('citizenName'),
        description: formData.get('description')
    };
    
    mockData.requests.push(newRequest);
    saveMockData();
    
    showSuccessMessage(`Request submitted successfully! Your request ID is: ${newRequest.id}`);
}

function handleComplaintSubmission(formData) {
    const newComplaint = {
        id: 'COMP' + String(mockData.complaints.length + 1).padStart(3, '0'),
        type: formData.get('complaintType'),
        status: 'Submitted',
        date: new Date().toISOString().split('T')[0],
        citizen: formData.get('citizenName'),
        description: formData.get('description'),
        location: formData.get('location')
    };
    
    mockData.complaints.push(newComplaint);
    saveMockData();
    
    showSuccessMessage(`Complaint submitted successfully! Your complaint ID is: ${newComplaint.id}`);
}

function handleContactSubmission(formData) {
    showSuccessMessage('Thank you for your message! We will get back to you within 24 hours.');
}

function handleAdminLogin(formData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe') === 'on';
    
    // Mock authentication
    if (username === 'admin' && password === 'admin123') {
        currentUser = { username, role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('rememberMe', rememberMe.toString());
        
        showSuccessMessage('Login successful! Redirecting to admin dashboard...');
        
        setTimeout(() => {
            showAdminDashboard();
            loadAdminDashboard();
        }, 1500);
    } else {
        showErrorMessage('Invalid username or password');
    }
}

function handleNewsSubmission(formData) {
    const newNews = {
        id: 'NEWS' + String(mockData.news.length + 1).padStart(3, '0'),
        title: formData.get('title'),
        content: formData.get('content'),
        date: new Date().toISOString().split('T')[0],
        author: currentUser ? currentUser.username : 'Admin'
    };
    
    mockData.news.push(newNews);
    saveMockData();
    
    showSuccessMessage('News article published successfully!');
}

function handlePollSubmission(formData) {
    const newPoll = {
        id: 'POLL' + String(mockData.polls.length + 1).padStart(3, '0'),
        question: formData.get('question'),
        options: formData.get('options').split('\n').filter(opt => opt.trim()),
        votes: new Array(formData.get('options').split('\n').length).fill(0),
        totalVotes: 0,
        active: true
    };
    
    mockData.polls.push(newPoll);
    saveMockData();
    
    showSuccessMessage('Poll created successfully!');
}

// ===== REQUEST TRACKING =====
function trackRequest() {
    const requestId = document.getElementById('requestId')?.value;
    if (!requestId) {
        showErrorMessage('Please enter a request ID');
        return;
    }
    
    const request = mockData.requests.find(req => req.id === requestId);
    if (request) {
        showRequestStatus(request);
    } else {
        showErrorMessage('Request not found. Please check your request ID.');
    }
}

function showRequestStatus(request) {
    const statusColors = {
        'Pending': '#ffc107',
        'Approved': '#28a745',
        'Completed': '#007bff',
        'Rejected': '#dc3545'
    };
    
    const statusHtml = `
        <div class="request-status-card">
            <h3>Request Status</h3>
            <div class="status-info">
                <p><strong>Request ID:</strong> ${request.id}</p>
                <p><strong>Type:</strong> ${request.type}</p>
                <p><strong>Status:</strong> <span style="color: ${statusColors[request.status]}">${request.status}</span></p>
                <p><strong>Date Submitted:</strong> ${request.date}</p>
                <p><strong>Citizen:</strong> ${request.citizen}</p>
            </div>
        </div>
    `;
    
    showModal('Request Status', statusHtml);
}

// ===== POLL VOTING =====
function voteInPoll(pollId, optionIndex) {
    const poll = mockData.polls.find(p => p.id === pollId);
    if (!poll || !poll.active) {
        showErrorMessage('This poll is not active');
        return;
    }
    
    poll.votes[optionIndex]++;
    poll.totalVotes++;
    saveMockData();
    
    showSuccessMessage('Thank you for voting!');
    updatePollDisplay(pollId);
}

function updatePollDisplay(pollId) {
    const poll = mockData.polls.find(p => p.id === pollId);
    if (!poll) return;
    
    const pollElement = document.querySelector(`[data-poll-id="${pollId}"]`);
    if (!pollElement) return;
    
    const resultsHtml = poll.options.map((option, index) => {
        const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes * 100).toFixed(1) : 0;
        return `
            <div class="poll-option">
                <div class="poll-option-header">
                    <span>${option}</span>
                    <span>${poll.votes[index]} votes (${percentage}%)</span>
                </div>
                <div class="poll-progress-bar">
                    <div class="poll-progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
    
    const resultsContainer = pollElement.querySelector('.poll-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = resultsHtml;
    }
}

// ===== CHATBOT =====
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    if (!chatbotToggle || !chatbotContainer) return;
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
        }
    });
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
    
    // Add welcome message
    addChatbotMessage('bot', 'Hello! How can I help you today?');
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addChatbotMessage('user', message);
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = getChatbotResponse(message);
        addChatbotMessage('bot', response);
    }, 1000);
}

function addChatbotMessage(sender, message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    messageDiv.textContent = message;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatbotResponse(message) {
    const responses = {
        'request': 'You can submit a request using the form above. Just fill in your details and select the type of service you need.',
        'track': 'To track your request, enter your request ID in the tracking section above.',
        'payment': 'Online payments are available for various municipal services. You can pay using the payment section.',
        'complaint': 'You can submit a complaint using the complaint form. Please provide as much detail as possible.',
        'hours': 'Our office hours are Monday to Friday, 8:00 AM to 4:00 PM.',
        'contact': 'You can contact us at info@monsif.gov.lb or call +961-XX-XXXXXX.',
        'help': 'I can help you with information about requests, payments, complaints, and general municipal services.'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return 'I understand you need help. Could you be more specific about what you\'re looking for? I can help with requests, payments, complaints, or general information.';
}

// ===== MODAL MANAGEMENT =====
function initializeModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== UTILITY FUNCTIONS =====
function showLoading(element) {
    element.classList.add('loading');
    const submitBtn = element.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    }
}

function hideLoading(element) {
    element.classList.remove('loading');
    const submitBtn = element.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    body.classList.toggle('dark-mode', !isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
}

// ===== ADMIN DASHBOARD FUNCTIONS =====
function loadAdminDashboard() {
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    if (!currentUser) {
        window.location.href = 'admin.html';
        return;
    }
    
    loadRequestsTable();
    loadComplaintsTable();
    loadPollsTable();
    loadNewsTable();
}

function loadRequestsTable() {
    const tbody = document.getElementById('requests-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = mockData.requests.map(request => `
        <tr>
            <td>${request.id}</td>
            <td>${request.type}</td>
            <td>${request.citizen}</td>
            <td>${request.date}</td>
            <td><span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span></td>
            <td>
                <button onclick="updateRequestStatus('${request.id}')" class="btn btn-sm btn-primary">Update</button>
            </td>
        </tr>
    `).join('');
}

function loadComplaintsTable() {
    const tbody = document.getElementById('complaints-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = mockData.complaints.map(complaint => `
        <tr>
            <td>${complaint.id}</td>
            <td>${complaint.type}</td>
            <td>${complaint.citizen}</td>
            <td>${complaint.date}</td>
            <td><span class="status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}">${complaint.status}</span></td>
            <td>
                <button onclick="viewComplaint('${complaint.id}')" class="btn btn-sm btn-secondary">View</button>
            </td>
        </tr>
    `).join('');
}

function loadPollsTable() {
    const tbody = document.getElementById('polls-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = mockData.polls.map(poll => `
        <tr>
            <td>${poll.id}</td>
            <td>${poll.question}</td>
            <td>${poll.totalVotes}</td>
            <td><span class="status-badge status-${poll.active ? 'active' : 'inactive'}">${poll.active ? 'Active' : 'Inactive'}</span></td>
            <td>
                <button onclick="togglePoll('${poll.id}')" class="btn btn-sm btn-primary">${poll.active ? 'Deactivate' : 'Activate'}</button>
            </td>
        </tr>
    `).join('');
}

function loadNewsTable() {
    const container = document.getElementById('news-list');
    if (!container) return;
    
    container.innerHTML = mockData.news.map(news => `
        <div class="news-item">
            <h4>${news.title}</h4>
            <p>${news.content}</p>
            <div class="news-meta">
                <span>By ${news.author}</span>
                <span>${news.date}</span>
            </div>
        </div>
    `).join('');
}

function updateRequestStatus(requestId) {
    const request = mockData.requests.find(req => req.id === requestId);
    if (!request) return;
    
    const statuses = ['Pending', 'Approved', 'Completed', 'Rejected'];
    const currentIndex = statuses.indexOf(request.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    request.status = statuses[nextIndex];
    saveMockData();
    loadRequestsTable();
    
    showSuccessMessage(`Request ${requestId} status updated to ${request.status}`);
}

function viewComplaint(complaintId) {
    const complaint = mockData.complaints.find(comp => comp.id === complaintId);
    if (!complaint) return;
    
    const complaintHtml = `
        <div class="complaint-details">
            <h4>Complaint Details</h4>
            <p><strong>ID:</strong> ${complaint.id}</p>
            <p><strong>Type:</strong> ${complaint.type}</p>
            <p><strong>Citizen:</strong> ${complaint.citizen}</p>
            <p><strong>Date:</strong> ${complaint.date}</p>
            <p><strong>Status:</strong> ${complaint.status}</p>
            <p><strong>Description:</strong> ${complaint.description}</p>
            ${complaint.location ? `<p><strong>Location:</strong> ${complaint.location}</p>` : ''}
        </div>
    `;
    
    showModal('Complaint Details', complaintHtml);
}

function togglePoll(pollId) {
    const poll = mockData.polls.find(p => p.id === pollId);
    if (!poll) return;
    
    poll.active = !poll.active;
    saveMockData();
    loadPollsTable();
    
    showSuccessMessage(`Poll ${pollId} ${poll.active ? 'activated' : 'deactivated'} successfully`);
}

// ===== DASHBOARD CHARTS =====
function initializeDashboardCharts() {
    createRequestsChart();
    createComplaintsChart();
    createPollsChart();
    createFinancialChart();
}

function createRequestsChart() {
    const canvas = document.getElementById('requests-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = {
        pending: mockData.requests.filter(r => r.status === 'Pending').length,
        approved: mockData.requests.filter(r => r.status === 'Approved').length,
        completed: mockData.requests.filter(r => r.status === 'Completed').length,
        rejected: mockData.requests.filter(r => r.status === 'Rejected').length
    };
    
    drawPieChart(ctx, canvas, data, ['#ffc107', '#28a745', '#007bff', '#dc3545']);
}

function createComplaintsChart() {
    const canvas = document.getElementById('complaints-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = {
        submitted: mockData.complaints.filter(c => c.status === 'Submitted').length,
        'in-progress': mockData.complaints.filter(c => c.status === 'In Progress').length,
        resolved: mockData.complaints.filter(c => c.status === 'Resolved').length
    };
    
    drawBarChart(ctx, canvas, data, '#28a745');
}

function createPollsChart() {
    const canvas = document.getElementById('polls-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const activePolls = mockData.polls.filter(p => p.active);
    const totalVotes = activePolls.reduce((sum, poll) => sum + poll.totalVotes, 0);
    
    drawLineChart(ctx, canvas, { 'Total Votes': totalVotes }, '#007bff');
}

function createFinancialChart() {
    const canvas = document.getElementById('financial-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = {
        'Revenue': 150000,
        'Expenses': 120000,
        'Budget': 200000
    };
    
    drawBarChart(ctx, canvas, data, '#28a745');
}

function drawPieChart(ctx, canvas, data, colors) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    let currentAngle = 0;
    
    Object.entries(data).forEach(([label, value], index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(`${label}: ${value}`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

function drawBarChart(ctx, canvas, data, color) {
    const barWidth = canvas.width / Object.keys(data).length - 20;
    const maxValue = Math.max(...Object.values(data));
    
    Object.entries(data).forEach(([label, value], index) => {
        const barHeight = (value / maxValue) * (canvas.height - 60);
        const x = index * (barWidth + 20) + 10;
        const y = canvas.height - barHeight - 30;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, canvas.height - 10);
        ctx.fillText(value.toLocaleString(), x + barWidth / 2, y - 5);
    });
}

function drawLineChart(ctx, canvas, data, color) {
    const points = Object.entries(data);
    const maxValue = Math.max(...Object.values(data));
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    points.forEach(([label, value], index) => {
        const x = (index / (points.length - 1)) * (canvas.width - 40) + 20;
        const y = canvas.height - 30 - (value / maxValue) * (canvas.height - 60);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, canvas.height - 10);
        ctx.fillText(value.toLocaleString(), x, y - 10);
    });
    
    ctx.stroke();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Request tracking
    const trackBtn = document.getElementById('track-btn');
    if (trackBtn) {
        trackBtn.addEventListener('click', trackRequest);
    }
    
    // Payment simulation
    const paymentBtn = document.getElementById('payment-btn');
    if (paymentBtn) {
        paymentBtn.addEventListener('click', function() {
            showSuccessMessage('Payment processed successfully! (Simulation)');
        });
    }
    
    // File upload preview
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                showSuccessMessage(`File "${fileName}" uploaded successfully!`);
            }
        });
    });
}

// ===== PAGE-SPECIFIC INITIALIZATION =====
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'admin.html':
            loadAdminDashboard();
            break;
        case 'dashboard.html':
            initializeDashboardCharts();
            break;
        case 'citizen.html':
            loadPollsForVoting();
            break;
    }
}

function loadPollsForVoting() {
    const pollsContainer = document.getElementById('polls-container');
    if (!pollsContainer) return;
    
    const activePolls = mockData.polls.filter(poll => poll.active);
    
    pollsContainer.innerHTML = activePolls.map(poll => `
        <div class="poll-card" data-poll-id="${poll.id}">
            <h4>${poll.question}</h4>
            <div class="poll-options">
                ${poll.options.map((option, index) => `
                    <button class="poll-option-btn" onclick="voteInPoll('${poll.id}', ${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div class="poll-results">
                ${poll.options.map((option, index) => {
                    const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes * 100).toFixed(1) : 0;
                    return `
                        <div class="poll-option">
                            <div class="poll-option-header">
                                <span>${option}</span>
                                <span>${poll.votes[index]} votes (${percentage}%)</span>
                            </div>
                            <div class="poll-progress-bar">
                                <div class="poll-progress-fill" style="width: ${percentage}%"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', initializePage);

// ===== ADDITIONAL ENHANCEMENTS =====

// Service navigation for citizen portal
function initializeServiceNavigation() {
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    const sections = document.querySelectorAll('.section[id]');
    
    serviceNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            serviceNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target section
            const targetSection = this.dataset.section;
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav item on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        serviceNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === current) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced form validation with real-time feedback
function initializeRealTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field appearance
    if (isValid) {
        clearFieldError(field);
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        showFieldError(field, errorMessage);
        field.classList.remove('valid');
        field.classList.add('error');
    }
    
    return isValid;
}

// Enhanced scroll animations
function initializeAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
                siblings.forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        setTimeout(() => {
                            sibling.classList.add('visible');
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Enhanced counter animations with easing
function animateCounterAdvanced(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - (current / target), 4);
        const displayValue = Math.floor(target * easeOutQuart);
        
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = displayValue.toLocaleString();
        }
    }, 16);
}

// Enhanced notification system
function showNotificationAdvanced(message, type, duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 0;
        border-radius: 0.75rem;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Enhanced modal system
function showModalAdvanced(title, content, options = {}) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        
        // Add custom classes if provided
        if (options.className) {
            modal.classList.add(options.className);
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstInput = modal.querySelector('input, textarea, select, button');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Enhanced file upload with preview
function initializeFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const files = Array.from(this.files);
            
            if (files.length > 0) {
                // Show file preview
                showFilePreview(this, files);
                
                // Validate file size and type
                files.forEach(file => {
                    if (file.size > 10 * 1024 * 1024) { // 10MB limit
                        showNotificationAdvanced(`File "${file.name}" is too large. Maximum size is 10MB.`, 'error');
                        return;
                    }
                    
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    if (!allowedTypes.includes(file.type)) {
                        showNotificationAdvanced(`File "${file.name}" has an unsupported format.`, 'error');
                        return;
                    }
                });
            }
        });
    });
}

function showFilePreview(input, files) {
    // Remove existing preview
    const existingPreview = input.parentNode.querySelector('.file-preview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    preview.innerHTML = `
        <div class="file-preview-header">
            <span>Selected Files (${files.length})</span>
            <button type="button" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="file-preview-list">
            ${files.map(file => `
                <div class="file-preview-item">
                    <i class="fas ${getFileIcon(file.type)}"></i>
                    <span>${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    input.parentNode.appendChild(preview);
}

function getFileIcon(type) {
    if (type.startsWith('image/')) return 'fa-image';
    if (type === 'application/pdf') return 'fa-file-pdf';
    if (type.includes('word')) return 'fa-file-word';
    return 'fa-file';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Enhanced search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const targetElements = document.querySelectorAll(this.dataset.searchTarget || '.searchable');
            
            targetElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query)) {
                    element.style.display = '';
                    element.classList.add('search-match');
                } else {
                    element.style.display = 'none';
                    element.classList.remove('search-match');
                }
            });
        });
    });
}

// Enhanced keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal();
            }
        }
        
        // Enter key submits forms
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const form = e.target.closest('form');
            if (form) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

// Enhanced accessibility features
function initializeAccessibility() {
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Enhance focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-blue)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Enhanced initialization
function initializeAppEnhanced() {
    initializeApp();
    initializeServiceNavigation();
    initializeRealTimeValidation();
    initializeAdvancedAnimations();
    initializeFileUpload();
    initializeSearch();
    initializeKeyboardNavigation();
    initializeAccessibility();
}

// Override the original initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeAppEnhanced();
    loadMockData();
    setupEventListeners();
    initializeAnimations();
});
