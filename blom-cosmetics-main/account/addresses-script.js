// Address Management Script for BLOM Cosmetics

class AddressManager {
    constructor() {
        this.addresses = [];
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.loadAddresses();
        this.setupEventListeners();
        this.renderAddresses();
    }

    setupEventListeners() {
        // Add address button
        const addBtn = document.getElementById('add-address-btn');
        const addFirstBtn = document.getElementById('add-first-address-btn');
        
        if (addBtn) addBtn.addEventListener('click', () => this.openModal());
        if (addFirstBtn) addFirstBtn.addEventListener('click', () => this.openModal());

        // Modal controls
        const modal = document.getElementById('address-modal');
        const modalClose = document.getElementById('modal-close');
        const cancelBtn = document.getElementById('cancel-address-btn');
        const modalOverlay = modal?.querySelector('.modal-overlay');

        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
        if (modalOverlay) modalOverlay.addEventListener('click', () => this.closeModal());

        // Form submission
        const form = document.getElementById('address-form');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.style.display !== 'none') {
                this.closeModal();
            }
        });
    }

    loadAddresses() {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/addresses');
        // this.addresses = await response.json();
        
        // For demo purposes, load from localStorage
        const stored = localStorage.getItem('blom_addresses');
        if (stored) {
            this.addresses = JSON.parse(stored);
        } else {
            // Demo addresses
            this.addresses = [
                {
                    id: '1',
                    first_name: 'Demo',
                    last_name: 'User',
                    company: '',
                    address_line_1: '123 Main Street',
                    address_line_2: 'Apt 4B',
                    city: 'Johannesburg',
                    province: 'Gauteng',
                    postal_code: '2000',
                    phone: '+27 82 123 4567',
                    is_default: true,
                    created_at: new Date().toISOString()
                }
            ];
            this.saveAddresses();
        }
    }

    saveAddresses() {
        localStorage.setItem('blom_addresses', JSON.stringify(this.addresses));
    }

    renderAddresses() {
        const addressList = document.getElementById('address-list');
        const emptyState = document.getElementById('empty-state');

        if (!addressList || !emptyState) return;

        if (this.addresses.length === 0) {
            addressList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        addressList.style.display = 'block';
        emptyState.style.display = 'none';

        addressList.innerHTML = this.addresses.map(address => this.createAddressCard(address)).join('');
    }

    createAddressCard(address) {
        const isDefault = address.is_default ? 'default' : '';
        const typeLabel = address.is_default ? 'Default Address' : 'Address';

        return `
            <div class="address-card ${isDefault}" data-address-id="${address.id}">
                <div class="address-header">
                    <span class="address-type">${typeLabel}</span>
                    <div class="address-actions">
                        <button class="address-btn" onclick="addressManager.editAddress('${address.id}')">Edit</button>
                        <button class="address-btn primary" onclick="addressManager.setDefault('${address.id}')" ${address.is_default ? 'disabled' : ''}>Set Default</button>
                        <button class="address-btn" onclick="addressManager.deleteAddress('${address.id}')">Delete</button>
                    </div>
                </div>
                <div class="address-details">
                    <div class="address-name">${address.first_name} ${address.last_name}</div>
                    ${address.company ? `<div>${address.company}</div>` : ''}
                    <div>${address.address_line_1}</div>
                    ${address.address_line_2 ? `<div>${address.address_line_2}</div>` : ''}
                    <div>${address.city}, ${address.province} ${address.postal_code}</div>
                    <div>${address.phone}</div>
                </div>
            </div>
        `;
    }

    openModal(addressId = null) {
        const modal = document.getElementById('address-modal');
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('address-form');
        
        if (!modal || !modalTitle || !form) return;

        this.currentEditingId = addressId;
        
        if (addressId) {
            modalTitle.textContent = 'Edit Address';
            this.populateForm(addressId);
        } else {
            modalTitle.textContent = 'Add New Address';
            form.reset();
            document.getElementById('address-id').value = '';
        }

        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        
        // Focus first input
        setTimeout(() => {
            const firstInput = form.querySelector('input:not([type="hidden"])');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    closeModal() {
        const modal = document.getElementById('address-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
        this.currentEditingId = null;
    }

    populateForm(addressId) {
        const address = this.addresses.find(addr => addr.id === addressId);
        if (!address) return;

        const form = document.getElementById('address-form');
        if (!form) return;

        // Populate form fields
        Object.keys(address).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = address[key];
            }
        });

        document.getElementById('address-id').value = addressId;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = document.getElementById('save-address-btn');
        const formData = new FormData(form);
        
        // Show loading state
        this.setLoadingState(submitBtn, true);
        
        try {
            // Validate form
            if (!this.validateForm(formData)) {
                this.setLoadingState(submitBtn, false);
                return;
            }

            // TODO: Replace with actual API call
            // const response = await fetch('/api/addresses', {
            //     method: this.currentEditingId ? 'PUT' : 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(addressData)
            // });

            // For demo purposes, handle locally
            const addressData = Object.fromEntries(formData.entries());
            
            if (this.currentEditingId) {
                // Update existing address
                const index = this.addresses.findIndex(addr => addr.id === this.currentEditingId);
                if (index !== -1) {
                    this.addresses[index] = { ...this.addresses[index], ...addressData };
                }
            } else {
                // Add new address
                const newAddress = {
                    id: Date.now().toString(),
                    ...addressData,
                    created_at: new Date().toISOString()
                };
                this.addresses.push(newAddress);
            }

            this.saveAddresses();
            this.renderAddresses();
            this.closeModal();
            
            // Show success message
            this.showToast(
                this.currentEditingId ? 'Address updated successfully!' : 'Address added successfully!',
                'success'
            );

        } catch (error) {
            console.error('Address save error:', error);
            this.showToast('Failed to save address. Please try again.', 'error');
            this.setLoadingState(submitBtn, false);
        }
    }

    validateForm(formData) {
        const requiredFields = ['first_name', 'last_name', 'address_line_1', 'city', 'province', 'postal_code', 'phone'];
        let isValid = true;

        requiredFields.forEach(field => {
            const value = formData.get(field);
            const errorElement = document.getElementById(`${field}-error`);
            
            if (!value || value.trim() === '') {
                this.showFieldError(field, `${field.replace('_', ' ')} is required`);
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Validate phone number
        const phone = formData.get('phone');
        if (phone && !this.validatePhone(phone)) {
            this.showFieldError('phone', 'Please enter a valid South African phone number');
            isValid = false;
        }

        // Validate postal code
        const postalCode = formData.get('postal_code');
        if (postalCode && !this.validatePostalCode(postalCode)) {
            this.showFieldError('postal_code', 'Please enter a valid postal code');
            isValid = false;
        }

        return isValid;
    }

    validatePhone(phone) {
        const phoneRegex = /^(\+27|0)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    validatePostalCode(postalCode) {
        const postalRegex = /^[0-9]{4}$/;
        return postalRegex.test(postalCode);
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    editAddress(addressId) {
        this.openModal(addressId);
    }

    async setDefault(addressId) {
        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/addresses/${addressId}/default`, { method: 'POST' });

            // For demo purposes, handle locally
            this.addresses.forEach(addr => {
                addr.is_default = addr.id === addressId;
            });

            this.saveAddresses();
            this.renderAddresses();
            this.showToast('Default address updated!', 'success');

        } catch (error) {
            console.error('Set default error:', error);
            this.showToast('Failed to update default address.', 'error');
        }
    }

    async deleteAddress(addressId) {
        if (!confirm('Are you sure you want to delete this address?')) {
            return;
        }

        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/addresses/${addressId}`, { method: 'DELETE' });

            // For demo purposes, handle locally
            this.addresses = this.addresses.filter(addr => addr.id !== addressId);
            this.saveAddresses();
            this.renderAddresses();
            this.showToast('Address deleted successfully!', 'success');

        } catch (error) {
            console.error('Delete address error:', error);
            this.showToast('Failed to delete address.', 'error');
        }
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

    // Helper method to get default address
    getDefaultAddress() {
        return this.addresses.find(addr => addr.is_default) || this.addresses[0];
    }

    // Helper method to get all addresses
    getAllAddresses() {
        return this.addresses;
    }
}

// Initialize address manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.addressManager = new AddressManager();
});

// Add modal styles if not already present
if (!document.getElementById('modal-styles')) {
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            position: relative;
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 32px;
            border-bottom: 1px solid #E2E8F0;
        }

        .modal-title {
            font-size: 24px;
            font-weight: 700;
            color: #2D3748;
            margin: 0;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #718096;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }

        .modal-close:hover {
            background-color: #F7FAFC;
        }

        .modal .address-form {
            padding: 32px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-state-icon {
            color: #E2E8F0;
            margin-bottom: 24px;
        }

        .empty-state h3 {
            font-size: 24px;
            color: #2D3748;
            margin-bottom: 12px;
        }

        .empty-state p {
            color: #718096;
            margin-bottom: 32px;
        }

        .account-content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .form-help {
            font-size: 12px;
            color: #718096;
            margin-top: 4px;
        }

        body.modal-open {
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .modal {
                padding: 16px;
            }
            
            .modal-content {
                max-height: 95vh;
            }
            
            .modal-header {
                padding: 20px 24px;
            }
            
            .modal-title {
                font-size: 20px;
            }
            
            .modal .address-form {
                padding: 24px;
            }
            
            .account-content-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }
        }
    `;
    document.head.appendChild(style);
}
