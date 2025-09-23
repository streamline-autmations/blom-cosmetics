// Order Detail Script for BLOM Cosmetics

class OrderDetailManager {
    constructor() {
        this.order = null;
        this.orderId = null;
        this.init();
    }

    init() {
        this.getOrderIdFromUrl();
        this.loadOrder();
        this.renderOrder();
    }

    getOrderIdFromUrl() {
        // Extract order ID from URL path
        const pathParts = window.location.pathname.split('/');
        const orderIdIndex = pathParts.findIndex(part => part === 'orders') + 1;
        this.orderId = pathParts[orderIdIndex];
    }

    async loadOrder() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/orders/${this.orderId}`);
            // this.order = await response.json();
            
            // For demo purposes, load from localStorage or use sample data
            const stored = localStorage.getItem('blom_orders');
            if (stored) {
                const orders = JSON.parse(stored);
                this.order = orders.find(order => order.id === this.orderId);
            }
            
            if (!this.order) {
                // Show error or redirect
                this.showError('Order not found');
                return;
            }
            
        } catch (error) {
            console.error('Error loading order:', error);
            this.showError('Failed to load order details');
        }
    }

    renderOrder() {
        if (!this.order) return;

        this.renderOrderHeader();
        this.renderOrderSummary();
        this.renderOrderItems();
        this.renderShippingAddress();
        this.renderStatusTimeline();
        this.renderTrackingInfo();
    }

    renderOrderHeader() {
        const orderTitle = document.getElementById('order-title');
        const orderSubtitle = document.getElementById('order-subtitle');
        
        if (orderTitle) {
            orderTitle.textContent = `Order ${this.order.order_number}`;
        }
        
        if (orderSubtitle) {
            orderSubtitle.textContent = `Placed on ${this.formatDate(this.order.date)}`;
        }
    }

    renderOrderSummary() {
        const summaryContainer = document.getElementById('order-summary');
        if (!summaryContainer) return;

        const statusClass = this.order.status.toLowerCase();
        const statusText = this.order.status.charAt(0).toUpperCase() + this.order.status.slice(1);

        summaryContainer.innerHTML = `
            <div class="order-summary-grid">
                <div class="order-summary-item">
                    <div class="order-summary-label">Order Number</div>
                    <div class="order-summary-value">${this.order.order_number}</div>
                </div>
                <div class="order-summary-item">
                    <div class="order-summary-label">Order Date</div>
                    <div class="order-summary-value">${this.formatDate(this.order.date)}</div>
                </div>
                <div class="order-summary-item">
                    <div class="order-summary-label">Status</div>
                    <div class="order-summary-value">
                        <span class="order-status ${statusClass}">${statusText}</span>
                    </div>
                </div>
                <div class="order-summary-item">
                    <div class="order-summary-label">Total</div>
                    <div class="order-summary-value">${this.formatCurrency(this.order.total)}</div>
                </div>
            </div>
        `;
    }

    renderOrderItems() {
        const itemsContainer = document.getElementById('order-items-list');
        if (!itemsContainer) return;

        itemsContainer.innerHTML = this.order.items.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='../../public/products/placeholder.jpg'">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-variant">${item.variant}</div>
                </div>
                <div class="order-item-qty">Qty: ${item.quantity}</div>
                <div class="order-item-price">${this.formatCurrency(item.price)}</div>
            </div>
        `).join('');
    }

    renderShippingAddress() {
        const addressContainer = document.getElementById('shipping-address-details');
        if (!addressContainer || !this.order.shipping_address) return;

        const address = this.order.shipping_address;
        
        addressContainer.innerHTML = `
            <div class="address-details">
                <div class="address-name">${address.first_name} ${address.last_name}</div>
                <div>${address.address_line_1}</div>
                ${address.address_line_2 ? `<div>${address.address_line_2}</div>` : ''}
                <div>${address.city}, ${address.province} ${address.postal_code}</div>
                <div>${address.phone}</div>
            </div>
        `;
    }

    renderStatusTimeline() {
        const timelineContainer = document.getElementById('timeline-items');
        if (!timelineContainer || !this.order.timeline) return;

        timelineContainer.innerHTML = this.order.timeline.map(step => {
            const iconClass = step.active ? 'completed' : 'pending';
            const dateText = step.date ? this.formatDateTime(step.date) : 'Pending';
            
            return `
                <div class="timeline-item">
                    <div class="timeline-icon ${iconClass}">
                        ${step.active ? '✓' : '○'}
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-label">${step.label}</div>
                        <div class="timeline-date">${dateText}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderTrackingInfo() {
        const trackingContainer = document.getElementById('tracking-info');
        const trackingDetails = document.getElementById('tracking-details');
        
        if (!trackingContainer || !trackingDetails) return;

        if (this.order.tracking_number) {
            trackingContainer.style.display = 'block';
            trackingDetails.innerHTML = `
                <div class="tracking-number">
                    <strong>Tracking Number:</strong> ${this.order.tracking_number}
                </div>
                <div class="tracking-actions">
                    <a href="https://www.postoffice.co.za/track-trace" target="_blank" class="btn btn-primary">
                        Track Package
                    </a>
                </div>
            `;
        } else {
            trackingContainer.style.display = 'none';
        }
    }

    formatCurrency(amount) {
        return `R ${amount.toFixed(2)}`;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showError(message) {
        const content = document.querySelector('.account-content');
        if (content) {
            content.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </div>
                    <h3>Error</h3>
                    <p>${message}</p>
                    <a href="../orders.html" class="btn btn-primary">Back to Orders</a>
                </div>
            `;
        }
    }
}

// Initialize order detail manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.orderDetailManager = new OrderDetailManager();
});

// Add additional styles for order detail page
if (!document.getElementById('order-detail-styles')) {
    const style = document.createElement('style');
    style.id = 'order-detail-styles';
    style.textContent = `
        .order-subtitle {
            color: #718096;
            font-size: 16px;
            margin-top: 4px;
        }

        .order-items-title,
        .shipping-address-title,
        .timeline-title,
        .tracking-title {
            font-size: 20px;
            font-weight: 700;
            color: #2D3748;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #E2E8F0;
        }

        .order-items-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .order-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #F7FAFC;
        }

        .order-item-image {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
        }

        .order-item-details {
            flex: 1;
        }

        .order-item-name {
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 4px;
        }

        .order-item-variant {
            font-size: 14px;
            color: #718096;
        }

        .order-item-qty {
            font-size: 14px;
            color: #4A5568;
            min-width: 60px;
            text-align: center;
        }

        .order-item-price {
            font-weight: 600;
            color: #2D3748;
            min-width: 80px;
            text-align: right;
        }

        .shipping-address-details {
            background: #F7FAFC;
            border-radius: 12px;
            padding: 20px;
        }

        .tracking-number {
            background: #F7FAFC;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            font-size: 16px;
        }

        .tracking-actions {
            display: flex;
            gap: 12px;
        }

        .error-state {
            text-align: center;
            padding: 60px 20px;
        }

        .error-icon {
            color: #E53E3E;
            margin-bottom: 24px;
        }

        .error-state h3 {
            font-size: 24px;
            color: #2D3748;
            margin-bottom: 12px;
        }

        .error-state p {
            color: #718096;
            margin-bottom: 32px;
        }

        @media (max-width: 768px) {
            .order-item {
                flex-direction: column;
                text-align: center;
            }

            .order-item-image {
                width: 80px;
                height: 80px;
            }

            .order-item-qty,
            .order-item-price {
                min-width: auto;
                text-align: center;
            }

            .tracking-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
}
