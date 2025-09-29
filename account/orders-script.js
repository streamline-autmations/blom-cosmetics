// Orders Management Script for BLOM Cosmetics

class OrdersManager {
    constructor() {
        this.orders = [];
        this.filteredOrders = [];
        this.currentFilter = '';
        this.init();
    }

    init() {
        this.loadOrders();
        this.setupEventListeners();
        this.renderOrders();
    }

    setupEventListeners() {
        // Status filter
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.filterOrders();
                this.renderOrders();
            });
        }
    }

    loadOrders() {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/orders');
        // this.orders = await response.json();
        
        // For demo purposes, load from localStorage or create sample data
        const stored = localStorage.getItem('blom_orders');
        if (stored) {
            this.orders = JSON.parse(stored);
        } else {
            // Demo orders
            this.orders = [
                {
                    id: 'ORD-001',
                    order_number: 'BLOM-2024-001',
                    date: '2024-01-15',
                    status: 'delivered',
                    total: 1250.00,
                    items: [
                        {
                            id: '1',
                            name: 'Professional Acrylic Powder - Clear',
                            variant: '50g',
                            price: 450.00,
                            quantity: 1,
                            image: '../public/products/acrylic-powder-clear.jpg'
                        },
                        {
                            id: '2',
                            name: 'Nail Liquid - Professional',
                            variant: '100ml',
                            price: 800.00,
                            quantity: 1,
                            image: '../public/products/nail-liquid.jpg'
                        }
                    ],
                    shipping_address: {
                        first_name: 'Demo',
                        last_name: 'User',
                        address_line_1: '123 Main Street',
                        city: 'Johannesburg',
                        province: 'Gauteng',
                        postal_code: '2000',
                        phone: '+27 82 123 4567'
                    },
                    tracking_number: 'TRK123456789',
                    timeline: [
                        { label: 'Order Placed', date: '2024-01-15T10:30:00Z', active: true },
                        { label: 'Payment Confirmed', date: '2024-01-15T10:35:00Z', active: true },
                        { label: 'Packed', date: '2024-01-16T14:20:00Z', active: true },
                        { label: 'Shipped', date: '2024-01-17T09:15:00Z', active: true },
                        { label: 'Delivered', date: '2024-01-19T16:45:00Z', active: true }
                    ]
                },
                {
                    id: 'ORD-002',
                    order_number: 'BLOM-2024-002',
                    date: '2024-01-20',
                    status: 'shipped',
                    total: 850.00,
                    items: [
                        {
                            id: '3',
                            name: 'Base Coat - Professional',
                            variant: '15ml',
                            price: 350.00,
                            quantity: 1,
                            image: '../public/products/base-coat.jpg'
                        },
                        {
                            id: '4',
                            name: 'Top Coat - High Gloss',
                            variant: '15ml',
                            price: 500.00,
                            quantity: 1,
                            image: '../public/products/top-coat.jpg'
                        }
                    ],
                    shipping_address: {
                        first_name: 'Demo',
                        last_name: 'User',
                        address_line_1: '123 Main Street',
                        city: 'Johannesburg',
                        province: 'Gauteng',
                        postal_code: '2000',
                        phone: '+27 82 123 4567'
                    },
                    tracking_number: 'TRK987654321',
                    timeline: [
                        { label: 'Order Placed', date: '2024-01-20T11:15:00Z', active: true },
                        { label: 'Payment Confirmed', date: '2024-01-20T11:20:00Z', active: true },
                        { label: 'Packed', date: '2024-01-21T13:30:00Z', active: true },
                        { label: 'Shipped', date: '2024-01-22T08:45:00Z', active: true },
                        { label: 'Delivered', date: null, active: false }
                    ]
                },
                {
                    id: 'ORD-003',
                    order_number: 'BLOM-2024-003',
                    date: '2024-01-25',
                    status: 'packed',
                    total: 1200.00,
                    items: [
                        {
                            id: '5',
                            name: 'Nail Art Brushes Set',
                            variant: '5-piece',
                            price: 1200.00,
                            quantity: 1,
                            image: '../public/products/nail-brushes.jpg'
                        }
                    ],
                    shipping_address: {
                        first_name: 'Demo',
                        last_name: 'User',
                        address_line_1: '123 Main Street',
                        city: 'Johannesburg',
                        province: 'Gauteng',
                        postal_code: '2000',
                        phone: '+27 82 123 4567'
                    },
                    tracking_number: null,
                    timeline: [
                        { label: 'Order Placed', date: '2024-01-25T14:20:00Z', active: true },
                        { label: 'Payment Confirmed', date: '2024-01-25T14:25:00Z', active: true },
                        { label: 'Packed', date: '2024-01-26T10:15:00Z', active: true },
                        { label: 'Shipped', date: null, active: false },
                        { label: 'Delivered', date: null, active: false }
                    ]
                }
            ];
            this.saveOrders();
        }
        
        this.filteredOrders = [...this.orders];
    }

    saveOrders() {
        localStorage.setItem('blom_orders', JSON.stringify(this.orders));
    }

    filterOrders() {
        if (!this.currentFilter) {
            this.filteredOrders = [...this.orders];
        } else {
            this.filteredOrders = this.orders.filter(order => order.status === this.currentFilter);
        }
    }

    renderOrders() {
        const tbody = document.getElementById('orders-tbody');
        const emptyState = document.getElementById('empty-state');
        const ordersTable = document.getElementById('orders-table');

        if (!tbody || !emptyState || !ordersTable) return;

        if (this.filteredOrders.length === 0) {
            tbody.innerHTML = '';
            ordersTable.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        ordersTable.style.display = 'table';
        emptyState.style.display = 'none';

        tbody.innerHTML = this.filteredOrders.map(order => this.createOrderRow(order)).join('');
    }

    createOrderRow(order) {
        const statusClass = order.status.toLowerCase();
        const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);
        const formattedDate = new Date(order.date).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const formattedTotal = `R ${order.total.toFixed(2)}`;

        return `
            <tr>
                <td>
                    <a href="orders/${order.id}.html" class="order-number">${order.order_number}</a>
                </td>
                <td>${formattedDate}</td>
                <td>${formattedTotal}</td>
                <td>
                    <span class="order-status ${statusClass}">${statusText}</span>
                </td>
                <td>
                    <a href="orders/${order.id}.html" class="btn btn-secondary" style="padding: 8px 16px; font-size: 14px;">View Details</a>
                </td>
            </tr>
        `;
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

    // Helper method to get order by ID
    getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }

    // Helper method to get orders by status
    getOrdersByStatus(status) {
        return this.orders.filter(order => order.status === status);
    }

    // Helper method to get recent orders
    getRecentOrders(limit = 5) {
        return this.orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
}

// Initialize orders manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ordersManager = new OrdersManager();
});
