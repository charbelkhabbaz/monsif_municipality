# Monsif e-Municipality

A complete responsive website for the municipality of Monsif, Lebanon, built with pure HTML, CSS, and JavaScript.

## 🏛️ Project Overview

**Monsif e-Municipality** is a digital platform designed to modernize municipal services in Lebanon. The website provides comprehensive digital services for citizens while offering administrative tools for municipal staff.

### Tagline
*A Digital Platform to Modernize Municipal Services in Lebanon*

## 🎨 Design Features

- **Elegant White Theme**: Clean, professional design with white as the dominant color
- **Modern Accents**: Soft green and blue accents for visual appeal
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- **Smooth Animations**: CSS transitions and JavaScript-powered animations
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Typography**: Clean fonts (Poppins, Inter, Open Sans) for optimal readability

## 📁 Project Structure

```
proj/
├── index.html          # Home page
├── citizen.html        # Citizen portal
├── admin.html          # Admin portal
├── dashboard.html      # Statistics dashboard
├── contact.html        # Contact page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── main.js        # Main JavaScript file
└── assets/            # Images and icons
```

## 🚀 Features

### Home Page (index.html)
- Hero section with animated content
- Mission and solution overview
- Service features showcase
- Impact statistics with animated counters
- Citizen testimonials
- Call-to-action sections

### Citizen Portal (citizen.html)
- **Online Requests**: Submit document requests and permits
- **Request Tracking**: Monitor application status with request ID
- **Online Payments**: Secure payment processing for municipal fees
- **Complaint System**: Report issues with photo uploads
- **Community Polls**: Participate in municipal decisions
- **News Portal**: Stay updated with municipal announcements
- **Interactive Chatbot**: AI-powered assistance widget

### Admin Portal (admin.html)
- Secure login system
- **Request Management**: View and update citizen requests
- **Complaint Management**: Handle and resolve complaints
- **Poll Management**: Create and manage community polls
- **News Management**: Publish municipal news and announcements
- Real-time statistics dashboard

### Dashboard (dashboard.html)
- **Interactive Charts**: Canvas-based data visualization
- **Key Performance Indicators**: Real-time metrics
- **Service Performance**: Processing times and satisfaction ratings
- **Monthly Trends**: Historical data analysis
- **Financial Overview**: Revenue and budget tracking

### Contact Page (contact.html)
- Multiple contact methods (phone, email, address)
- Interactive contact form
- Google Maps integration
- FAQ section with expandable answers
- Emergency contact information

## 🛠️ Technical Features

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No frameworks, pure JavaScript implementation
- **Canvas API**: Custom chart rendering
- **LocalStorage**: Data persistence for mock functionality

### Key JavaScript Features
- **Form Validation**: Real-time validation with visual feedback
- **Smooth Scrolling**: Animated navigation between sections
- **Intersection Observer**: Scroll-triggered animations
- **Modal System**: Dynamic popup windows
- **File Upload**: Drag-and-drop with preview functionality
- **Search Functionality**: Real-time content filtering
- **Keyboard Navigation**: Full keyboard accessibility
- **Theme Toggle**: Light/dark mode switching

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🎯 User Experience Features

### For Citizens
- Intuitive service navigation
- Step-by-step form guidance
- Real-time request tracking
- Interactive community participation
- Mobile-optimized interface

### For Administrators
- Comprehensive dashboard
- Efficient data management
- Real-time statistics
- User-friendly admin interface
- Secure authentication

## 🔧 Installation & Setup

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **No build process required** - pure HTML/CSS/JS

### Local Development
```bash
# Serve files locally (optional)
python -m http.server 8000
# or
npx serve .
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
Modify CSS custom properties in `css/style.css`:
```css
:root {
    --primary-white: #ffffff;
    --accent-blue: #007bff;
    --accent-green: #28a745;
    /* ... */
}
```

### Content
- Update municipality information in HTML files
- Modify mock data in `js/main.js`
- Customize contact information and office hours

## 🔒 Security Features

- Form validation and sanitization
- Secure file upload handling
- XSS prevention measures
- CSRF protection considerations

## 📊 Performance

- Optimized images and assets
- Minimal JavaScript footprint
- Efficient CSS with minimal redundancy
- Fast loading times
- Progressive enhancement

## 🌐 Deployment

### Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

### Web Server
Upload files to any web server supporting HTML/CSS/JS

## 📝 Mock Data

The application includes comprehensive mock data for demonstration:
- Sample requests and complaints
- Community polls with voting data
- Municipal news articles
- User statistics and metrics

## 🔮 Future Enhancements

- Backend API integration
- Real payment processing
- Advanced analytics
- Multi-language support (Arabic)
- Mobile app development
- Real-time notifications

## 📞 Support

For technical support or questions:
- Email: info@monsif.gov.lb
- Phone: +961-XX-XXXXXX
- Office Hours: Mon-Fri 8:00 AM - 4:00 PM

## 📄 License

© 2024 Monsif Municipality. All rights reserved.

---

**Built with ❤️ for the citizens of Monsif, Lebanon**
