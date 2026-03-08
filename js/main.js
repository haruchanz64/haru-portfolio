import {sendEmail} from './contact.js';

// Expose sendEmail to the global scope for use in the HTML form
window.sendEmail = sendEmail;

// Import any other scripts that need initializing
import './observer.js';
import './url-hash-manager.js';
import './blog-config.js';
import './github.js';
import './theme.js';
import './nav.js';
import './navbar-loader.js';
import './tabs.js';