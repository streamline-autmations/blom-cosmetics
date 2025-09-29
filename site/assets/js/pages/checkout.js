// Checkout Script for BLOM Cosmetics

class CheckoutManager {
    constructor() {
        this.cartData = [];
        this.shippingCost = 80; // Default standard shipping
        this.freeShippingThreshold = 1500;
        this.init();
    }

    init() {
        this.loadCartData();
        this.setupEventListeners();
        this.renderOrderSummary();
        this.updateTotals();
        this.prefillUserData();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('checkout-form');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Delivery option changes
        const deliveryOptions = document.querySelectorAll('input[name="delivery_option"]');
        deliveryOptions.forEach(option => {
            option.addEventListener('change', this.handleDeliveryChange.bind(this));
        });

        // Form validation on blur
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    loadCartData() {
        // Load cart data from localStorage or cart manager
        const storedCart = localStorage.getItem('blom_cart');
        if (storedCart) {
            this.cartData = JSON.parse(storedCart);
        } else {
            // Demo cart data
            this.cartData = [
                {
                    id: '1',
                    sku: 'ACR-CLR-50',
                    name: 'Professional Acrylic Powder - Clear',
                    variant: '50g',
                    price: 450.00,
                    quantity: 1,
                    image: 'public/products/acrylic-powder-clear.jpg'
                },
                {
                    id: '2',
                    sku: 'NAIL-LIQ-100',
                    name: 'Nail Liquid - Professional',
                    variant: '100ml',
                    price: 800.00,
                    quantity: 1,
                    image: 'public/products/nail-liquid.jpg'
                }
            ];
        }
    }

    prefillUserData() {
        // If user is logged in, prefill form data
        const user = localStorage.getItem('blom_user');
        if (user) {
            const userData = JSON.parse(user);
            const form = document.getElementById('checkout-form');
            
            // Prefill user information
            const emailField = form.querySelector('#email');
            const firstNameField = form.querySelector('#first_name');
            const lastNameField = form.querySelector('#last_name');
            const phoneField = form.querySelector('#phone');
            
            if (emailField) emailField.value = userData.email || '';
            if (firstNameField) firstNameField.value = userData.first_name || '';
            if (lastNameField) lastNameField.value = userData.last_name || '';
            if (phoneField) phoneField.value = userData.phone || '';

            // Prefill address if available
            const addresses = localStorage.getItem('blom_addresses');
            if (addresses) {
                const addressList = JSON.parse(addresses);
                const defaultAddress = addressList.find(addr => addr.is_default);
                
                if (defaultAddress) {
                    const addressLine1Field = form.querySelector('#address_line_1');
                    const addressLine2Field = form.querySelector('#address_line_2');
                    const cityField = form.querySelector('#city');
                    const provinceField = form.querySelector('#province');
                    const postalCodeField = form.querySelector('#postal_code');
                    
                    if (addressLine1Field) addressLine1Field.value = defaultAddress.address_line_1 || '';
                    if (addressLine2Field) addressLine2Field.value = defaultAddress.address_line_2 || '';
                    if (cityField) cityField.value = defaultAddress.city || '';
                    if (provinceField) provinceField.value = defaultAddress.province || '';
                    if (postalCodeField) postalCodeField.value = defaultAddress.postal_code || '';
                }
            }
        }
    }

    renderOrderSummary() {
        const orderItemsContainer = document.getElementById('order-items');
        if (!orderItemsContainer) return;

        if (this.cartData.length === 0) {
            orderItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        orderItemsContainer.innerHTML = this.cartData.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='public/products/placeholder.jpg'">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-variant">${item.variant}</div>
                </div>
                <div class="order-item-qty">${item.quantity}</div>
                <div class="order-item-price">${this.formatCurrency(item.price * item.quantity)}</div>
            </div>
        `).join('');
    }

    updateTotals() {
        const subtotal = this.cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = this.calculateShipping(subtotal);
        const total = subtotal + shipping;

        // Update DOM elements
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = this.formatCurrency(subtotal);
        if (shippingEl) shippingEl.textContent = this.formatCurrency(shipping);
        if (totalEl) totalEl.textContent = this.formatCurrency(total);
    }

    calculateShipping(subtotal) {
        if (subtotal >= this.freeShippingThreshold) {
            return 0;
        }
        return this.shippingCost;
    }

    handleDeliveryChange(e) {
        const selectedOption = e.target.value;
        
        // Update shipping cost based on selected option
        if (selectedOption === 'express') {
            this.shippingCost = 150;
        } else {
            this.shippingCost = 80;
        }
        
        this.updateTotals();
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        // Clear previous error
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }

        // Validate required fields
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(fieldName, `${fieldName.replace('_', ' ')} is required`);
            return false;
        }

        // Specific field validations
        switch (fieldName) {
            case 'email':
                if (value && !this.validateEmail(value)) {
                    this.showFieldError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'phone':
                if (value && !this.validatePhone(value)) {
                    this.showFieldError(fieldName, 'Please enter a valid South African phone number');
                    return false;
                }
                break;
            case 'postal_code':
                if (value && !this.validatePostalCode(value)) {
                    this.showFieldError(fieldName, 'Please enter a valid postal code');
                    return false;
                }
                break;
        }

        return true;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^(\+27|0)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    validatePostalCode(postalCode) {
        const postalRegex = /^[0-9]{4}$/;
        return postalRegex.test(postalCode);
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    validateForm() {
        const form = document.getElementById('checkout-form');
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate terms acceptance
        const termsCheckbox = document.getElementById('terms_accepted');
        if (termsCheckbox && !termsCheckbox.checked) {
            this.showFieldError('terms_accepted', 'You must accept the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('checkout-btn');
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, true);

        try {
            // Prepare order data
            const formData = new FormData(e.target);
            const orderData = {
                cart_id: this.generateCartId(),
                customer_id: this.getCustomerId(),
                email: formData.get('email'),
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                phone: formData.get('phone'),
                address_line_1: formData.get('address_line_1'),
                address_line_2: formData.get('address_line_2'),
                city: formData.get('city'),
                province: formData.get('province'),
                postal_code: formData.get('postal_code'),
                delivery_option: formData.get('delivery_option'),
                order_notes: formData.get('order_notes'),
                items: this.cartData,
                totals: {
                    subtotal: this.cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                    shipping: this.shippingCost,
                    total: this.cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0) + this.shippingCost
                }
            };

            // TODO: Replace with actual API call
            // const response = await fetch('/api/payfast/create-payment', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(orderData)
            // });
            // const result = await response.json();

            // Call PayFast create-payment API
            const response = await fetch('/api/payfast/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Submit to PayFast
            this.submitToPayFast(result.processUrl, result.fields);

        } catch (error) {
            console.error('Checkout error:', error);
            this.showToast('Payment processing failed. Please try again.', 'error');
            this.setLoadingState(submitBtn, false);
        }
    }

    generateCartId() {
        return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getCustomerId() {
        const user = localStorage.getItem('blom_user');
        return user ? JSON.parse(user).id : null;
    }

    async simulateApiCall() {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    submitToPayFast(processUrl, fields) {
        // Create a hidden form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = processUrl;
        form.style.display = 'none';

        // Add all fields as hidden inputs
        Object.keys(fields).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key];
            form.appendChild(input);
        });

        // Add form to document and submit
        document.body.appendChild(form);
        form.submit();
    }

    setLoadingState(button, isLoading) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            button.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48BB78' : type === 'error' ? '#E53E3E' : '#4299E1'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    formatCurrency(amount) {
        return `R ${amount.toFixed(2)}`;
    }
}

// Initialize checkout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.checkoutManager = new CheckoutManager();
});
