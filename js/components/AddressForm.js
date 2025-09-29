// AddressForm Component
class AddressForm {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            showDefaultCheckboxes: true,
            showBillingAddress: false,
            ...options
        };
        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <form class="address-form" id="address-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="first-name">First Name *</label>
                        <input type="text" id="first-name" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last Name *</label>
                        <input type="text" id="last-name" name="lastName" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="company">Company (Optional)</label>
                    <input type="text" id="company" name="company">
                </div>

                <div class="form-group">
                    <label for="address-line-1">Address Line 1 *</label>
                    <input type="text" id="address-line-1" name="addressLine1" required>
                </div>

                <div class="form-group">
                    <label for="address-line-2">Address Line 2 (Optional)</label>
                    <input type="text" id="address-line-2" name="addressLine2">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="city">City *</label>
                        <input type="text" id="city" name="city" required>
                    </div>
                    <div class="form-group">
                        <label for="postal-code">Postal Code *</label>
                        <input type="text" id="postal-code" name="postalCode" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="province">Province *</label>
                    <select id="province" name="province" required>
                        <option value="">Select Province</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="Gauteng">Gauteng</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Northern Cape">Northern Cape</option>
                        <option value="North West">North West</option>
                        <option value="Western Cape">Western Cape</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>

                ${this.options.showDefaultCheckboxes ? `
                    <div class="form-checkboxes">
                        <label class="checkbox-label">
                            <input type="checkbox" id="default-shipping" name="defaultShipping">
                            <span class="checkmark"></span>
                            Set as default shipping address
                        </label>
                        ${this.options.showBillingAddress ? `
                            <label class="checkbox-label">
                                <input type="checkbox" id="default-billing" name="defaultBilling">
                                <span class="checkmark"></span>
                                Set as default billing address
                            </label>
                        ` : ''}
                    </div>
                ` : ''}

                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="cancel-btn">Cancel</button>
                    <button type="submit" class="btn-primary" id="save-btn">Save Address</button>
                </div>
            </form>
        `;
    }

    bindEvents() {
        const form = this.container.querySelector('#address-form');
        const cancelBtn = this.container.querySelector('#cancel-btn');
        const saveBtn = this.container.querySelector('#save-btn');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.handleCancel();
            });
        }

        // Real-time validation
        const inputs = this.container.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = value !== '';
        
        if (isValid) {
            field.classList.remove('error');
            this.removeErrorMessage(field);
        } else {
            field.classList.add('error');
            this.showErrorMessage(field, 'This field is required');
        }
        
        return isValid;
    }

    showErrorMessage(field, message) {
        this.removeErrorMessage(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    validateForm() {
        const inputs = this.container.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    getFormData() {
        const form = this.container.querySelector('#address-form');
        const formData = new FormData(form);
        
        return {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            company: formData.get('company'),
            addressLine1: formData.get('addressLine1'),
            addressLine2: formData.get('addressLine2'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            province: formData.get('province'),
            phone: formData.get('phone'),
            defaultShipping: formData.get('defaultShipping') === 'on',
            defaultBilling: formData.get('defaultBilling') === 'on'
        };
    }

    setFormData(data) {
        const form = this.container.querySelector('#address-form');
        if (!form) return;
        
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = data[key];
                } else {
                    field.value = data[key] || '';
                }
            }
        });
    }

    clearForm() {
        const form = this.container.querySelector('#address-form');
        if (form) {
            form.reset();
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            const errorFields = form.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));
        }
    }

    handleSubmit() {
        if (!this.validateForm()) {
            return;
        }
        
        const formData = this.getFormData();
        
        if (this.options.onSubmit) {
            this.options.onSubmit(formData);
        }
    }

    handleCancel() {
        if (this.options.onCancel) {
            this.options.onCancel();
        } else {
            this.clearForm();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AddressForm;
} else {
    window.AddressForm = AddressForm;
}
