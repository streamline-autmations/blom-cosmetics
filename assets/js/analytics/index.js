// Analytics Index - Export all analytics functionality

// Import analytics modules
import AnalyticsHelper from './AnalyticsHelper.js';
import AnalyticsIntegration from './AnalyticsIntegration.js';

// Export analytics modules
export {
    AnalyticsHelper,
    AnalyticsIntegration
};

// Also make them available globally for non-module usage
if (typeof window !== 'undefined') {
    window.BLOMAnalytics = {
        AnalyticsHelper,
        AnalyticsIntegration
    };
}

// Initialize analytics on page load
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize analytics helper
        const analytics = AnalyticsHelper.getInstance();
        
        // Track initial page view
        analytics.trackPageView(document.title, window.location.pathname);
        
        // Set up user properties if user is logged in
        if (typeof UserStore !== 'undefined') {
            const userStore = UserStore.getInstance();
            if (userStore.isAuthenticated()) {
                const user = userStore.getUser();
                analytics.setUserId(user.id);
                analytics.setUserProperties({
                    user_type: 'registered',
                    signup_date: user.created_at
                });
            }
        }
    });
}
