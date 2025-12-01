// Cart functionality for digital products (single quantity per product)
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }
    
    // Load cart from localStorage
    loadCart() {
        const cartData = localStorage.getItem('digitalStoreCart');
        const consent = localStorage.getItem('gdpr-cart-consent');
        
        // Only load cart if GDPR consent is given
        if (consent !== 'true') {
            return [];
        }
        
        return cartData ? JSON.parse(cartData) : [];
    }
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('digitalStoreCart', JSON.stringify(this.items));
    }
    
    // Check if product is already in cart
    isProductInCart(productId) {
        return this.items.some(item => item.id === productId);
    }
    
    // Add item to cart (single quantity only)
    addItem(productId) {
        // Check if product is already in cart
        if (this.isProductInCart(productId)) {
            this.showNotification('This product is already in your cart!', 'info');
            return false;
        }
        
        const product = getProductById(productId);
        if (!product) return false;
        
        // Add product with quantity 1 (cannot add more)
        this.items.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1, // Always 1 for digital products
            image: product.image,
            category: product.category
        });
        
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        
        // Update product buttons on the page
        this.updateProductButtons();
        
        this.showNotification('Product added to cart!', 'success');
        return true;
    }
    
    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        
        // Update product buttons on the page
        this.updateProductButtons();
        
        this.showNotification('Product removed from cart', 'info');
    }
    
    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        
        // Update product buttons on the page
        this.updateProductButtons();
        
        this.showNotification('Cart cleared', 'info');
    }
    
    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
    
    // Get item count (each product counts as 1)
    getItemCount() {
        return this.items.length;
    }
    
    // Update cart count display
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    // Update cart display
    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (!cartItemsContainer || !cartTotalElement) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotalElement.textContent = '$0.00';
            return;
        }
        
        // Add warning message for digital products
        let cartHTML = `
            <div class="cart-warning">
                <i class="fas fa-info-circle"></i>
                Digital products: Only one quantity per item allowed
            </div>
        `;
        
        this.items.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="remove-item" data-id="${item.id}" title="Remove from cart">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        cartTotalElement.textContent = `$${this.getTotal().toFixed(2)}`;
        
        // Add event listeners to remove buttons
        cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
                this.removeItem(id);
            });
        });
    }
    
    // Update add to cart buttons on product cards
    updateProductButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            const productId = parseInt(button.getAttribute('data-id'));
            const isInCart = this.isProductInCart(productId);
            
            if (isInCart) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary', 'in-cart');
                button.innerHTML = '<i class="fas fa-check"></i> In Cart';
                button.disabled = true;
            } else {
                button.classList.remove('btn-secondary', 'in-cart');
                button.classList.add('btn-primary');
                button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                button.disabled = false;
            }
        });
    }
    
    // Show notification
    showNotification(message, type = 'info') {
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
}

// Initialize cart
const cart = new Cart();

// Cart UI functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Open cart
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('show');
            cart.updateCartDisplay();
        });
    }
    
    // Close cart
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('show');
        });
    }
    
    // Close cart on overlay click
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('show');
        });
    }
    
    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                cart.clearCart();
            }
        });
    }
    
    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                cart.showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // In a real application, this would redirect to checkout
            cart.showNotification('Proceeding to checkout...', 'success');
            setTimeout(() => {
                // Simulate checkout process
                alert(`Checkout Summary:\n\nItems: ${cart.items.length}\nTotal: $${cart.getTotal().toFixed(2)}\n\nThank you for your purchase!`);
                cart.clearCart();
                cartSidebar.classList.remove('open');
                cartOverlay.classList.remove('show');
            }, 500);
        });
    }
    
    // Initialize cart display
    cart.updateCartDisplay();
});

// Add to cart function (called from products.js)
function addToCart(productId) {
    return cart.addItem(productId);
}