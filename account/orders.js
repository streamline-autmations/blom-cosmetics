// Orders Page JavaScript
class OrdersManager {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.orders = [];
        
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
        await this.loadOrders();
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
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    }

    async loadOrders() {
        try {
            this.showLoading(true);
            
            const { data, error } = await this.supabase
                .from('orders')
                .select(`
                    id,
                    status,
                    total,
                    currency,
                    created_at,
                    order_items (
                        name,
                        quantity,
                        price
                    )
                `)
                .eq('user_id', this.currentUser.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.orders = data || [];
            this.renderOrders();
        } catch (error) {
            console.error('Error loading orders:', error);
            this.showToast('Failed to load orders', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    renderOrders() {
        const ordersList = document.getElementById('orders-list');
        const emptyState = document.getElementById('empty-state');
        
        if (this.orders.length === 0) {
            ordersList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        ordersList.style.display = 'grid';
        emptyState.style.display = 'none';
        
        ordersList.innerHTML = this.orders.map(order => this.createOrderCard(order)).join('');
        
        // Bind events for each order card
        this.bindOrderEvents();
    }

    createOrderCard(order) {
        const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const orderItems = order.order_items || [];
        const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

        return `
            <div class="order-card" data-order-id="${order.id}">
                <div class="order-header" data-action="toggle">
                    <div class="order-info">
                        <div class="order-number">Order #${order.id}</div>
                        <div class="order-date">${orderDate} • ${totalItems} item${totalItems !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="order-status">
                        <span class="status-badge ${this.getStatusClass(order.status)}">${order.status}</span>
                        <div class="order-total">${order.currency} ${order.total.toFixed(2)}</div>
                        <svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="order-details" id="details-${order.id}">
                    <div class="order-items">
                        ${orderItems.map(item => this.createOrderItem(item)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    createOrderItem(item) {
        return `
            <div class="order-item">
                <div class="item-info">
                    <div class="item-name">${this.escapeHtml(item.name)}</div>
                    <div class="item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="item-price">${item.price.toFixed(2)}</div>
            </div>
        `;
    }

    getStatusClass(status) {
        const statusMap = {
            'paid': 'paid',
            'pending': 'pending',
            'failed': 'failed',
            'cancelled': 'cancelled'
        };
        return statusMap[status.toLowerCase()] || 'pending';
    }

    bindOrderEvents() {
        document.querySelectorAll('.order-header[data-action="toggle"]').forEach(header => {
            header.addEventListener('click', (e) => {
                const orderId = e.currentTarget.closest('.order-card').dataset.orderId;
                this.toggleOrderDetails(orderId);
            });
        });
    }

    toggleOrderDetails(orderId) {
        const details = document.getElementById(`details-${orderId}`);
        const expandIcon = document.querySelector(`[data-order-id="${orderId}"] .expand-icon`);
        
        if (details.classList.contains('show')) {
            details.classList.remove('show');
            expandIcon.classList.remove('expanded');
        } else {
            // Close all other expanded orders
            document.querySelectorAll('.order-details.show').forEach(el => {
                el.classList.remove('show');
            });
            document.querySelectorAll('.expand-icon.expanded').forEach(el => {
                el.classList.remove('expanded');
            });
            
            // Open this order
            details.classList.add('show');
            expandIcon.classList.add('expanded');
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
        const page = document.querySelector('.orders-page');
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
        
        document.body.appendChild(toast);
        
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
    new OrdersManager();
});
