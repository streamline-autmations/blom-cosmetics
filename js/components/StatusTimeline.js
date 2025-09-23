// StatusTimeline Component
class StatusTimeline {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            showDates: true,
            showDescriptions: true,
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
            <div class="status-timeline">
                <div class="timeline-items" id="timeline-items">
                    <!-- Timeline items will be rendered here -->
                </div>
            </div>
        `;
    }

    setTimelineItems(items) {
        const timelineItems = this.container.querySelector('#timeline-items');
        if (!timelineItems) return;

        timelineItems.innerHTML = items.map((item, index) => this.createTimelineItem(item, index)).join('');
    }

    createTimelineItem(item, index) {
        const isActive = item.status === 'active';
        const isCompleted = item.status === 'completed';
        const isPending = item.status === 'pending';

        return `
            <div class="timeline-item ${item.status}" data-index="${index}">
                <div class="timeline-marker">
                    <div class="timeline-icon">
                        ${this.getStatusIcon(item.status, item.icon)}
                    </div>
                </div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h4 class="timeline-title">${item.label}</h4>
                        ${this.options.showDates && item.date ? `
                            <span class="timeline-date">${this.formatDate(item.date)}</span>
                        ` : ''}
                    </div>
                    ${this.options.showDescriptions && item.description ? `
                        <p class="timeline-description">${item.description}</p>
                    ` : ''}
                    ${item.details ? `
                        <div class="timeline-details">
                            ${item.details}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getStatusIcon(status, customIcon) {
        if (customIcon) {
            return customIcon;
        }

        switch (status) {
            case 'completed':
                return `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                `;
            case 'active':
                return `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                `;
            case 'pending':
                return `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                `;
            default:
                return `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                `;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    updateStatus(itemIndex, newStatus) {
        const timelineItem = this.container.querySelector(`[data-index="${itemIndex}"]`);
        if (!timelineItem) return;

        // Remove existing status classes
        timelineItem.classList.remove('completed', 'active', 'pending');
        
        // Add new status class
        timelineItem.classList.add(newStatus);
        
        // Update icon
        const iconContainer = timelineItem.querySelector('.timeline-icon');
        if (iconContainer) {
            iconContainer.innerHTML = this.getStatusIcon(newStatus);
        }
    }

    addItem(item) {
        const timelineItems = this.container.querySelector('#timeline-items');
        if (!timelineItems) return;

        const newItem = this.createTimelineItem(item, timelineItems.children.length);
        timelineItems.insertAdjacentHTML('beforeend', newItem);
    }

    removeItem(itemIndex) {
        const timelineItem = this.container.querySelector(`[data-index="${itemIndex}"]`);
        if (timelineItem) {
            timelineItem.remove();
        }
    }

    clearTimeline() {
        const timelineItems = this.container.querySelector('#timeline-items');
        if (timelineItems) {
            timelineItems.innerHTML = '';
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatusTimeline;
} else {
    window.StatusTimeline = StatusTimeline;
}
