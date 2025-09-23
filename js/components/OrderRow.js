// OrderRow Component
class OrderRow {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            showActions: true,
            showStatus: true,
            showTracking: true,
            onViewDetails: null,
            onTrackOrder: null,
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
            <div class="order-row" id="order-row">
                <!-- Order content will be rendered here -->
            </div>
        `;
    }

    setOrderData(orderData) {
        const orderRow = this.container.querySelector('#order-row');
        if (!orderRow) return;

        orderRow.innerHTML = this.createOrderRowHTML(orderData);
        this.bindEvents();
    }

    createOrderRowHTML(order) {
        const orderDate = new Date(order.createdAt).toLocaleDateString('en-ZA');
        const statusClass = this.getStatusClass(order.status);
        const statusText = this.getStatusText(order.status);

        return `
            <div class="order-header">
                <div class="order-info">
                    <h3 class="order-number">Order #${order.orderNumber}</h3>
                    <span class="order-date">${orderDate}</span>
                </div>
                ${this.options.showStatus ? `
                    <div class="order-status">
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                ` : ''}
            </div>

            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='public/products/placeholder.jpg'">
                        <div class="item-details">
                            <h4 class="item-name">${item.name}</h4>
                            <p class="item-variant">${item.variant}</p>
                            <span class="item-quantity">Qty: ${item.quantity}</span>
                        </div>
                        <div class="item-price">R ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>

            <div class="order-footer">
                <div class="order-total">
                    <span class="total-label">Total:</span>
                    <span class="total-amount">R ${order.total.toFixed(2)}</span>
                </div>
                
                <div class="order-actions">
                    ${this.options.showActions ? `
                        <button class="btn-secondary view-details-btn" data-order-id="${order.id}">
                            View Details
                        </button>
                    ` : ''}
                    
                    ${this.options.showTracking && order.trackingNumber ? `
                        <button class="btn-outline track-order-btn" data-tracking="${order.trackingNumber}">
                            Track Order
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const statusMap = {
            'pending': 'status-pending',
            'processing': 'status-processing',
            'shipped': 'status-shipped',
            'delivered': 'status-delivered',
            'cancelled': 'status-cancelled',
            'refunded': 'status-refunded'
        };
        return statusMap[status] || 'status-pending';
    }

    getStatusText(status) {
        const statusMap = {
            'pending': 'Pending',
            'processing': 'Processing',
            'shipped': 'Shipped',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled',
            'refunded': 'Refunded'
        };
        return statusMap[status] || 'Pending';
    }

    bindEvents() {
        const viewDetailsBtn = this.container.querySelector('.view-details-btn');
        const trackOrderBtn = this.container.querySelector('.track-order-btn');

        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                const orderId = e.target.dataset.orderId;
                this.handleViewDetails(orderId);
            });
        }

        if (trackOrderBtn) {
            trackOrderBtn.addEventListener('click', (e) => {
                const trackingNumber = e.target.dataset.tracking;
                this.handleTrackOrder(trackingNumber);
            });
        }
    }

    handleViewDetails(orderId) {
        if (this.options.onViewDetails) {
            this.options.onViewDetails(orderId);
        } else {
            // Default behavior: navigate to order details page
            window.location.href = `/account/orders/${orderId}.html`;
        }
    }

    handleTrackOrder(trackingNumber) {
        if (this.options.onTrackOrder) {
            this.options.onTrackOrder(trackingNumber);
        } else {
            // Default behavior: navigate to tracking page
            window.location.href = `/order-tracking.html?tracking=${trackingNumber}`;
        }
    }

    // Static method to create order row from order data
    static createOrderRow(orderData, containerId, options = {}) {
        const orderRow = new OrderRow(containerId, options);
        orderRow.setOrderData(orderData);
        return orderRow;
    }
}

// OrderItemsList Component - for displaying order items in a list format
class OrderItemsList {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            showImages: true,
            showVariants: true,
            showQuantities: true,
            showPrices: true,
            ...options
        };
        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="order-items-list" id="order-items-list">
                <!-- Order items will be rendered here -->
            </div>
        `;
    }

    setOrderItems(items) {
        const itemsList = this.container.querySelector('#order-items-list');
        if (!itemsList) return;

        itemsList.innerHTML = items.map(item => this.createItemHTML(item)).join('');
    }

    createItemHTML(item) {
        return `
            <div class="order-item-row">
                ${this.options.showImages ? `
                    <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='public/products/placeholder.jpg'">
                ` : ''}
                
                <div class="item-info">
                    <h4 class="item-name">${item.name}</h4>
                    ${this.options.showVariants && item.variant ? `
                        <p class="item-variant">${item.variant}</p>
                    ` : ''}
                    ${this.options.showQuantities ? `
                        <span class="item-quantity">Quantity: ${item.quantity}</span>
                    ` : ''}
                </div>
                
                ${this.options.showPrices ? `
                    <div class="item-pricing">
                        <span class="item-unit-price">R ${item.price.toFixed(2)} each</span>
                        <span class="item-total-price">R ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OrderRow, OrderItemsList };
} else {
    window.OrderRow = OrderRow;
    window.OrderItemsList = OrderItemsList;
}
