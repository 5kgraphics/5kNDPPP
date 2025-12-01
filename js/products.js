// Product data with image URLs (using placeholder images from Unsplash)
const products = [
    {
        id: 1,
        name: "Premium Website Template",
        description: "A fully responsive HTML5 template with clean design and modern features. Perfect for business websites.",
        price: 49.99,
        category: "templates",
        features: ["Responsive Design", "Bootstrap 5", "SEO Optimized", "Free Updates", "30+ Pages"],
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Creative Font Pack",
        description: "Collection of 10 premium fonts perfect for branding and digital projects. Includes commercial license.",
        price: 29.99,
        category: "fonts",
        features: ["10 Font Families", "Web Font Formats", "Commercial License", "Multiple Weights", "Free Updates"],
        image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "UI/UX Design Kit",
        description: "Complete Figma design system with components, icons, and templates for modern applications.",
        price: 79.99,
        category: "graphics",
        features: ["Figma Components", "Design System", "500+ Icons", "Dark Mode", "Customizable"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "JavaScript Course Bundle",
        description: "Master modern JavaScript with this comprehensive video course package. From beginner to advanced.",
        price: 99.99,
        category: "courses",
        features: ["30+ Hours", "Projects Included", "Lifetime Access", "Certificate", "Source Code"],
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "E-commerce Plugin",
        description: "Custom WordPress plugin for creating online stores with advanced features and analytics.",
        price: 149.99,
        category: "code",
        features: ["WooCommerce", "Payment Gateway", "Inventory Management", "Analytics", "Mobile Friendly"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Social Media Toolkit",
        description: "500+ social media templates for posts, stories, and banners. All platforms supported.",
        price: 39.99,
        category: "graphics",
        features: ["Canva Templates", "All Platforms", "Editable", "Brand Kit", "Regular Updates"],
        image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Python Automation Scripts",
        description: "Collection of 20+ Python scripts for automation and productivity. Ready to use with documentation.",
        price: 59.99,
        category: "code",
        features: ["Ready to Use", "Documentation", "Customizable", "Tutorials", "Support"],
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Logo Design Masterclass",
        description: "Learn professional logo design from scratch with practical exercises and feedback sessions.",
        price: 89.99,
        category: "courses",
        features: ["Video Lessons", "Project Files", "Critique Sessions", "Community", "Certificate"],
        image: "https://images.unsplash.com/photo-1561070791-4c9b95a9e2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Mobile App UI Kit",
        description: "Complete mobile app UI kit for iOS and Android with 100+ screens and components.",
        price: 69.99,
        category: "templates",
        features: ["iOS & Android", "100+ Screens", "Figma & Sketch", "Customizable", "Dark Mode"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Video Editing Presets",
        description: "Professional video editing presets for Premiere Pro and DaVinci Resolve. Save hours of work.",
        price: 44.99,
        category: "graphics",
        features: ["Premiere Pro", "DaVinci Resolve", "Color Grades", "Transitions", "Tutorials"],
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "WordPress Theme Bundle",
        description: "Collection of 5 premium WordPress themes for different business types and industries.",
        price: 129.99,
        category: "templates",
        features: ["5 Premium Themes", "Responsive Design", "SEO Ready", "1 Year Support", "Free Updates"],
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Digital Marketing Course",
        description: "Complete digital marketing course covering SEO, social media, email marketing, and analytics.",
        price: 119.99,
        category: "courses",
        features: ["40+ Hours", "Case Studies", "Certification", "Tools Access", "Community"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// DOM Elements
let productsContainer = document.getElementById('products-container');
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let categoryFilter = document.getElementById('category-filter');
let priceFilter = document.getElementById('price-filter');
let sortBy = document.getElementById('sort-by');
let clearFilters = document.getElementById('clear-filters');

// Initialize products
function initProducts() {
    if (productsContainer) {
        displayProducts(products);
        setupEventListeners();
    }
}

// Display products
function displayProducts(productsArray) {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    if (productsArray.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-color);">No products found</h3>
                <p style="color: var(--text-secondary);">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    // Get cart items to check which products are already in cart
    const cart = window.cart || { items: [] };
    const cartProductIds = cart.items ? cart.items.map(item => item.id) : [];
    
    productsArray.forEach(product => {
        const isInCart = cartProductIds.includes(product.id);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge">${product.category}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn ${isInCart ? 'btn-secondary in-cart' : 'btn-primary'} add-to-cart" 
                            data-id="${product.id}"
                            ${isInCart ? 'disabled' : ''}>
                        <i class="fas ${isInCart ? 'fa-check' : 'fa-cart-plus'}"></i> 
                        ${isInCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <a href="product.html?id=${product.id}" class="btn btn-secondary">
                        <i class="fas fa-info-circle"></i> Details
                    </a>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        }
    });
}

// Filter products (removed rating filter)
function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const priceRange = priceFilter ? priceFilter.value : 'all';
    const sortType = sortBy ? sortBy.value : 'featured';
    
    let filtered = products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = category === 'all' || product.category === category;
        
        // Price filter
        let matchesPrice = true;
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(val => 
                val.endsWith('+') ? parseFloat(val) : parseFloat(val)
            );
            
            if (priceRange.endsWith('+')) {
                matchesPrice = product.price >= min;
            } else {
                matchesPrice = product.price >= min && product.price <= max;
            }
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Sort products
    filtered.sort((a, b) => {
        switch(sortType) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return b.id - a.id;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });
    
    displayProducts(filtered);
}

// Setup event listeners
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', filterProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', filterProducts);
    }
    
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (priceFilter) priceFilter.value = 'all';
            if (sortBy) sortBy.value = 'featured';
            filterProducts();
        });
    }
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initProducts);