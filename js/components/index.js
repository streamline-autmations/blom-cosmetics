// Components Index - Export all components

// Import all components
import AddressForm from './AddressForm.js';
import StatusTimeline from './StatusTimeline.js';
import WishlistHeartButton from './WishlistHeartButton.js';
import AuthGuard from './AuthGuard.js';
import OrderRow from './OrderRow.js';

// Export all components
export {
    AddressForm,
    StatusTimeline,
    WishlistHeartButton,
    AuthGuard,
    OrderRow
};

// Also make them available globally for non-module usage
if (typeof window !== 'undefined') {
    window.BLOMComponents = {
        AddressForm,
        StatusTimeline,
        WishlistHeartButton,
        AuthGuard,
        OrderRow
    };
}
