// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Initialize dark mode
    initDarkMode();
    
    // GDPR Compliance
    initGDPR();
    
    // FAQ accordion
    initFAQ();
    
    // Contact form
    initContactForm();
});

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = themeToggle ? themeToggle.querySelector('.fa-moon') : null;
    const sunIcon = themeToggle ? themeToggle.querySelector('.fa-sun') : null;
    
    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        enableDarkMode(moonIcon, sunIcon);
    } else {
        disableDarkMode(moonIcon, sunIcon);
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode(moonIcon, sunIcon);
            } else {
                enableDarkMode(moonIcon, sunIcon);
            }
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode(moonIcon, sunIcon);
            } else {
                disableDarkMode(moonIcon, sunIcon);
            }
        }
    });
}

function enableDarkMode(moonIcon, sunIcon) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    
    if (moonIcon && sunIcon) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
}

function disableDarkMode(moonIcon, sunIcon) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    
    if (moonIcon && sunIcon) {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

// GDPR Compliance
function initGDPR() {
    const gdprBanner = document.getElementById('gdpr-consent');
    const gdprAccept = document.getElementById('gdpr-accept');
    const gdprReject = document.getElementById('gdpr-reject');
    const gdprPreferences = document.getElementById('gdpr-preferences');
    
    // Check if consent was already given
    const consentGiven = localStorage.getItem('gdpr-consent');
    
    // If no consent stored, show banner
    if (!consentGiven && gdprBanner) {
        setTimeout(() => {
            gdprBanner.style.display = 'block';
        }, 1000);
    }
    
    // Accept all cookies
    if (gdprAccept) {
        gdprAccept.addEventListener('click', () => {
            localStorage.setItem('gdpr-consent', 'true');
            localStorage.setItem('gdpr-cart-consent', 'true');
            localStorage.setItem('gdpr-analytics', 'true');
            localStorage.setItem('gdpr-marketing', 'true');
            
            if (gdprBanner) {
                gdprBanner.style.display = 'none';
            }
            
            showNotification('Preferences saved successfully!', 'success');
        });
    }
    
    // Reject non-essential cookies
    if (gdprReject) {
        gdprReject.addEventListener('click', () => {
            localStorage.setItem('gdpr-consent', 'true');
            localStorage.setItem('gdpr-cart-consent', 'true');
            localStorage.setItem('gdpr-analytics', 'false');
            localStorage.setItem('gdpr-marketing', 'false');
            
            if (gdprBanner) {
                gdprBanner.style.display = 'none';
            }
            
            showNotification('Preferences saved. Only essential cookies enabled.', 'info');
        });
    }
    
    // Show preferences modal
    if (gdprPreferences) {
        gdprPreferences.addEventListener('click', () => {
            showGDPRPreferences();
        });
    }
}

// Show GDPR preferences modal
function showGDPRPreferences() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="background: var(--card-bg); padding: 30px; border-radius: 8px; max-width: 500px; width: 90%; border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 20px; color: var(--primary-color);">Cookie Preferences</h3>
            
            <div class="preference-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: var(--text-color);">Essential Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" id="essential-cookies" checked disabled>
                        <span class="slider round"></span>
                    </label>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                    Required for the website to function properly. Cannot be disabled.
                </p>
            </div>
            
            <div class="preference-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: var(--text-color);">Cart & Session Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" id="cart-cookies" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                    Remember your shopping cart items and session information.
                </p>
            </div>
            
            <div class="preference-item" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: var(--text-color);">Analytics Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" id="analytics-cookies">
                        <span class="slider round"></span>
                    </label>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                    Help us understand how visitors interact with our website.
                </p>
            </div>
            
            <div class="preference-item" style="margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: var(--text-color);">Marketing Cookies</h4>
                    <label class="switch">
                        <input type="checkbox" id="marketing-cookies">
                        <span class="slider round"></span>
                    </label>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                    Used to deliver relevant advertisements and measure ad performance.
                </p>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button id="cancel-preferences" class="btn btn-secondary">Cancel</button>
                <button id="save-preferences" class="btn btn-primary">Save Preferences</button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1002;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--border-color);
            transition: .4s;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }
        input:checked + .slider {
            background-color: var(--primary-color);
        }
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        .slider.round {
            border-radius: 34px;
        }
        .slider.round:before {
            border-radius: 50%;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Load current preferences
    document.getElementById('cart-cookies').checked = localStorage.getItem('gdpr-cart-consent') === 'true';
    document.getElementById('analytics-cookies').checked = localStorage.getItem('gdpr-analytics') === 'true';
    document.getElementById('marketing-cookies').checked = localStorage.getItem('gdpr-marketing') === 'true';
    
    // Save preferences
    document.getElementById('save-preferences').addEventListener('click', () => {
        localStorage.setItem('gdpr-consent', 'true');
        localStorage.setItem('gdpr-cart-consent', document.getElementById('cart-cookies').checked);
        localStorage.setItem('gdpr-analytics', document.getElementById('analytics-cookies').checked);
        localStorage.setItem('gdpr-marketing', document.getElementById('marketing-cookies').checked);
        
        modal.remove();
        style.remove();
        
        if (document.getElementById('gdpr-consent')) {
            document.getElementById('gdpr-consent').style.display = 'none';
        }
        
        showNotification('Preferences saved successfully!', 'success');
    });
    
    // Cancel
    document.getElementById('cancel-preferences').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// // Product details page
// function loadProductDetails() {
//     if (!window.location.pathname.includes('product.html')) return;
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = parseInt(urlParams.get('id'));
    
//     if (!productId) {
//         window.location.href = 'index.html';
//         return;
//     }
    
//     const product = getProductById(productId);
    
//     if (!product) {
//         window.location.href = 'index.html';
//         return;
//     }
    
//     // Update page title
//     document.title = `${product.name} - Digital Store`;
    
//     // Check if product is in cart
//     const cart = window.cart || { isProductInCart: () => false };
//     const isInCart = cart.isProductInCart ? cart.isProductInCart(productId) : false;
    
//     // Update product details
//     const productDetails = document.querySelector('.product-details');
//     if (productDetails) {
//         productDetails.innerHTML = `
//             <div class="product-gallery">
//                 <div class="main-image">
//                     <img src="${product.image}" alt="${product.name}">
//                 </div>
//             </div>
//             <div class="product-info-details">
//                 <h1 style="color: var(--text-color);">${product.name}</h1>
//                 <div class="product-meta">
//                     <span class="product-category">${product.category}</span>
//                     <span style="color: var(--primary-color); font-weight: 600;">$${product.price.toFixed(2)}</span>
//                 </div>
//                 <p class="product-description-full">${product.description}</p>
                
//                 <h3 style="color: var(--text-color);">Features:</h3>
//                 <ul class="features-list">
//                     ${product.features.map(feature => `<li><i class="fas fa-check" style="color: var(--primary-color);"></i> ${feature}</li>`).join('')}
//                 </ul>
                
//                 <div class="details-actions">
//                     <button class="btn ${isInCart ? 'btn-secondary in-cart' : 'btn-primary'} add-to-cart-large" 
//                             data-id="${product.id}"
//                             ${isInCart ? 'disabled' : ''}>
//                         <i class="fas ${isInCart ? 'fa-check' : 'fa-cart-plus'}"></i> 
//                         ${isInCart ? 'Added to Cart' : 'Add to Cart'}
//                     </button>
//                     <a href="index.html" class="btn btn-outline">
//                         <i class="fas fa-arrow-left"></i> Continue Shopping
//                     </a>
//                 </div>
                
//                 <div class="product-meta" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color);">
//                     <p><i class="fas fa-shield-alt" style="color: var(--primary-color);"></i> 30-Day Money Back Guarantee</p>
//                     <p><i class="fas fa-download" style="color: var(--primary-color);"></i> Instant Digital Download</p>
//                     <p><i class="fas fa-life-ring" style="color: var(--primary-color);"></i> Free Lifetime Updates</p>
//                 </div>
//             </div>
//         `;
        
//         // Add event listener to add to cart button
//         const addToCartBtn = document.querySelector('.add-to-cart-large');
//         if (addToCartBtn && !addToCartBtn.disabled) {
//             addToCartBtn.addEventListener('click', () => {
//                 if (addToCart(productId)) {
//                     addToCartBtn.classList.remove('btn-primary');
//                     addToCartBtn.classList.add('btn-secondary', 'in-cart');
//                     addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
//                     addToCartBtn.disabled = true;
//                 }
//             });
//         }
//     }
// }

// FAQ accordion functionality (merged and corrected version)
function initFAQ() {
    const faqSearch = document.getElementById('faq-search');
    const faqSearchBtn = document.getElementById('faq-search-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    const openCookiePrefs = document.getElementById('open-cookie-preferences');
    const dataRequestForm = document.getElementById('data-request-form');
    
    // Initialize FAQ accordion
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const toggle = item.querySelector('.faq-toggle');
            
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other items
                    if (!isActive) {
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                                const otherToggle = otherItem.querySelector('.faq-toggle');
                                if (otherToggle) otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                            }
                        });
                    }
                    
                    // Toggle current item
                    item.classList.toggle('active');
                    if (toggle) {
                        toggle.innerHTML = item.classList.contains('active') 
                            ? '<i class="fas fa-minus"></i>' 
                            : '<i class="fas fa-plus"></i>';
                    }
                });
            }
            
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isActive = item.classList.contains('active');
                    
                    // Close all other items
                    if (!isActive) {
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                                const otherToggle = otherItem.querySelector('.faq-toggle');
                                if (otherToggle) otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                            }
                        });
                    }
                    
                    item.classList.toggle('active');
                    toggle.innerHTML = item.classList.contains('active') 
                        ? '<i class="fas fa-minus"></i>' 
                        : '<i class="fas fa-plus"></i>';
                });
            }
        });
    }
    
    // FAQ Search functionality
    if (faqSearch && faqSearchBtn) {
        const performSearch = () => {
            const searchTerm = faqSearch.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all items
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            let foundResults = false;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('active'); // Open matching items
                    const toggle = item.querySelector('.faq-toggle');
                    if (toggle) toggle.innerHTML = '<i class="fas fa-minus"></i>';
                    foundResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            if (!foundResults) {
                showNotification('No questions found matching your search', 'info');
            }
        };
        
        faqSearchBtn.addEventListener('click', performSearch);
        faqSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Open cookie preferences from Data Rights page
    if (openCookiePrefs) {
        openCookiePrefs.addEventListener('click', () => {
            showGDPRPreferences();
        });
    }
    
    // Data request form button
    if (dataRequestForm) {
        dataRequestForm.addEventListener('click', () => {
            showNotification('Data request form will open in a new window. Please prepare your identification documents.', 'info');
            setTimeout(() => {
                // In a real implementation, this would open a form or redirect to a form page
                alert('Data Request Form\n\nIn a production environment, this would open a secure form for submitting data requests.\n\nFor now, please email your request to: dpo@digitalstore.com');
            }, 500);
        });
    }
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const liveChatBtn = document.getElementById('live-chat-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call in production)
            setTimeout(() => {
                // In a real application, you would send this data to a server
                console.log('Contact form submitted:', data);
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function() {
            showNotification('Live chat will be available during business hours (9AM-6PM EST)', 'info');
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}