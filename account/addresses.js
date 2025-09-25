// Addresses Page JavaScript
class AddressesManager {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.addresses = [];
        this.editingAddress = null;
        
        this.init();
    }

    async init() {
        // Wait for Supabase to be available
        await this.waitForSupabase();
        
        // Check authentication
        if (!this.supabaseAuth.requireAuth()) {
            return;
        }
        
        this.currentUser = this.supabaseAuth.getCurrentUser();
        this.supabase = this.supabaseAuth.supabase;
        
        this.bindEvents();
        await this.loadAddresses();
    }

    waitForSupabase() {
        return new Promise((resolve) => {
            const checkSupabase = () => {
                if (window.supabaseAuth && window.supabaseAuth.supabase) {
                    resolve();
                } else {
                    setTimeout(checkSupabase, 100);
                }
            };
            checkSupabase();
        });
    }

    bindEvents() {
        // Add address button
        document.getElementById('add-address-btn').addEventListener('click', () => {
            this.showForm();
        });

        // Cancel button
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.hideForm();
        });

        // Form submission
        document.getElementById('address-form-element').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAddress();
        });

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    }

    async loadAddresses() {
        try {
            this.showLoading(true);
            
            const { data, error } = await this.supabase
                .from('addresses')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .order('is_default', { ascending: false })
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.addresses = data || [];
            this.renderAddresses();
        } catch (error) {
            console.error('Error loading addresses:', error);
            this.showToast('Failed to load addresses', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    renderAddresses() {
        const grid = document.getElementById('addresses-grid');
        
        if (this.addresses.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No addresses yet</h3>
                    <p>Add your first address to get started with deliveries.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.addresses.map(address => this.createAddressCard(address)).join('');
        
        // Bind events for each address card
        this.bindAddressEvents();
    }

    createAddressCard(address) {
        const addressLines = [
            address.line1,
            address.line2,
            `${address.city}, ${address.province} ${address.postal_code}`,
            address.country
        ].filter(line => line && line.trim());

        return `
            <div class="address-card ${address.is_default ? 'default' : ''}" data-id="${address.id}">
                <div class="address-header">
                    <div class="address-label">${this.escapeHtml(address.label)}</div>
                    ${address.is_default ? '<span class="default-badge">Default</span>' : ''}
                </div>
                <div class="address-details">
                    ${addressLines.map(line => this.escapeHtml(line)).join('<br>')}
                </div>
                <div class="address-actions">
                    <button class="btn btn-primary" data-action="edit" data-id="${address.id}">
                        Edit
                    </button>
                    ${!address.is_default ? `
                        <button class="btn btn-secondary" data-action="set-default" data-id="${address.id}">
                            Set Default
                        </button>
                    ` : ''}
                    <button class="btn btn-danger" data-action="delete" data-id="${address.id}">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    bindAddressEvents() {
        document.querySelectorAll('.address-card [data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const id = e.target.dataset.id;
                
                switch (action) {
                    case 'edit':
                        this.editAddress(id);
                        break;
                    case 'set-default':
                        this.setDefaultAddress(id);
                        break;
                    case 'delete':
                        this.deleteAddress(id);
                        break;
                }
            });
        });
    }

    showForm(address = null) {
        this.editingAddress = address;
        const form = document.getElementById('address-form');
        const title = document.getElementById('form-title');
        
        title.textContent = address ? 'Edit Address' : 'Add New Address';
        
        if (address) {
            // Populate form with address data
            document.getElementById('label').value = address.label;
            document.getElementById('line1').value = address.line1;
            document.getElementById('line2').value = address.line2 || '';
            document.getElementById('city').value = address.city;
            document.getElementById('province').value = address.province;
            document.getElementById('postal_code').value = address.postal_code;
            document.getElementById('country').value = address.country;
            document.getElementById('is_default').checked = address.is_default;
        } else {
            // Reset form
            document.getElementById('address-form-element').reset();
        }
        
        form.classList.add('show');
        form.scrollIntoView({ behavior: 'smooth' });
    }

    hideForm() {
        document.getElementById('address-form').classList.remove('show');
        this.editingAddress = null;
    }

    async saveAddress() {
        try {
            this.showLoading(true);
            
            const formData = new FormData(document.getElementById('address-form-element'));
            const addressData = {
                label: formData.get('label'),
                line1: formData.get('line1'),
                line2: formData.get('line2'),
                city: formData.get('city'),
                province: formData.get('province'),
                postal_code: formData.get('postal_code'),
                country: formData.get('country'),
                is_default: formData.get('is_default') === 'on'
            };

            if (addressData.is_default) {
                // First, set all other addresses to not default
                await this.clearDefaultAddresses();
            }

            if (this.editingAddress) {
                // Update existing address
                const { error } = await this.supabase
                    .from('addresses')
                    .update(addressData)
                    .eq('id', this.editingAddress.id)
                    .eq('user_id', this.currentUser.id);

                if (error) throw error;
                this.showToast('Address updated successfully', 'success');
            } else {
                // Create new address
                const { error } = await this.supabase
                    .from('addresses')
                    .insert([{
                        ...addressData,
                        user_id: this.currentUser.id
                    }]);

                if (error) throw error;
                this.showToast('Address added successfully', 'success');
            }

            this.hideForm();
            await this.loadAddresses();
        } catch (error) {
            console.error('Error saving address:', error);
            this.showToast('Failed to save address', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async clearDefaultAddresses() {
        const { error } = await this.supabase
            .from('addresses')
            .update({ is_default: false })
            .eq('user_id', this.currentUser.id)
            .eq('is_default', true);

        if (error) throw error;
    }

    async setDefaultAddress(id) {
        try {
            this.showLoading(true);
            
            // Clear all defaults first
            await this.clearDefaultAddresses();
            
            // Set this address as default
            const { error } = await this.supabase
                .from('addresses')
                .update({ is_default: true })
                .eq('id', id)
                .eq('user_id', this.currentUser.id);

            if (error) throw error;
            
            this.showToast('Default address updated', 'success');
            await this.loadAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
            this.showToast('Failed to update default address', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async deleteAddress(id) {
        if (!confirm('Are you sure you want to delete this address?')) {
            return;
        }

        try {
            this.showLoading(true);
            
            const { error } = await this.supabase
                .from('addresses')
                .delete()
                .eq('id', id)
                .eq('user_id', this.currentUser.id);

            if (error) throw error;
            
            this.showToast('Address deleted successfully', 'success');
            await this.loadAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
            this.showToast('Failed to delete address', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async logout() {
        try {
            await this.supabaseAuth.signOut();
            window.location.href = '../login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    showLoading(show) {
        const page = document.querySelector('.addresses-page');
        if (show) {
            page.classList.add('loading');
        } else {
            page.classList.remove('loading');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.getElementById('toast-container').appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AddressesManager();
});
