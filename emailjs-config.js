/**
 * EmailJS Configuration File
 * 
 * To set up email functionality:
 * 1. Sign up for a free account at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Replace the placeholder values below with your actual EmailJS credentials
 * 5. Include this file in your HTML before the main script.js file
 */

// Replace these with your actual EmailJS credentials
// Follow the EMAIL_SETUP_GUIDE.md for detailed setup instructions
const EMAILJS_CONFIG = {
    publicKey: 'i7sHD_yS0fF8tD919',    // Your EmailJS public key (get from EmailJS dashboard)
    serviceID: 'service_5pxu4we',    // Your EmailJS service ID (e.g., 'service_gmail123')
    templateID: 'template_uzlaa5f'   // Your EmailJS template ID (e.g., 'template_contact456')
};

// Alternative configuration for when you get your actual credentials:
// const EMAILJS_CONFIG = {
//     publicKey: 'user_abc123def456',
//     serviceID: 'service_gmail123', 
//     templateID: 'template_contact456'
// };

/**
 * Sample EmailJS Template Structure:
 * 
 * Subject: New Contact Form Submission - {{subject}}
 * 
 * Body:
 * Hello,
 * 
 * You have received a new message from your API Hub website:
 * 
 * Name: {{from_name}}
 * Email: {{from_email}}
 * Subject: {{subject}}
 * Date: {{timestamp}}
 * 
 * Message:
 * {{message}}
 * 
 * ---
 * This message was sent from the API Hub contact form.
 * Reply to: {{reply_to}}
 */

// For production use, you can also set up environment-specific configs
const EMAILJS_PRODUCTION_CONFIG = {
    publicKey: 'i7sHD_yS0fF8tD919',    // Your EmailJS public key (get from EmailJS dashboard)
    serviceID: 'service_5pxu4we',    // Your EmailJS service ID (e.g., 'service_gmail123')
    templateID: 'template_uzlaa5f'
};

// Auto-detect environment and use appropriate config
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const EMAIL_CONFIG = isProduction ? EMAILJS_PRODUCTION_CONFIG : EMAILJS_CONFIG;

// Export configuration for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAILJS_CONFIG, EMAIL_CONFIG };
}