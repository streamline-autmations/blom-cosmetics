// js/components/AccountLayout.js
import { supabase } from '../supabase.js'

export class AccountLayout {
    constructor(container, options = {}) {
        this.container = container
        this.options = {
            currentPage: 'dashboard',
            showSidebar: true,
            ...options
        }
        
        this.currentUser = null
        this.init()
    }

    async init() {
        await this.checkAuth()
        this.render()
        this.bindEvents()
    }

    async checkAuth() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) {
                console.error('Auth check error:', error)
                this.redirectToLogin()
                return
            }
            
            if (!session) {
                this.redirectToLogin()
                return
            }
            
            this.currentUser = session.user
        } catch (error) {
            console.error('Auth check error:', error)
            this.redirectToLogin()
        }
    }

    redirectToLogin() {
        const redirect = encodeURIComponent(window.location.pathname + window.location.search)
        window.location.href = `/login?redirect=${redirect}`
    }

    render() {
        this.container.innerHTML = `
            <div class="account-layout">
                ${this.options.showSidebar ? this.renderSidebar() : ''}
                <div class="account-main">
                    <div class="account-header">
                        <div class="account-header-content">
                            <h1 class="account-title">${this.getPageTitle()}</h1>
                            <div class="account-user-info">
                                <span class="user-name">${this.currentUser?.user_metadata?.full_name || 'User'}</span>
                                <button class="logout-btn" id="logout-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16,17 21,12 16,7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="account-content" id="account-content">
                        <!-- Content will be loaded here -->
                    </div>
                </div>
            </div>
        `
    }

    renderSidebar() {
        const navItems = [
            { id: 'dashboard', label: 'Dashboard', href: '/account', icon: 'dashboard' },
            { id: 'orders', label: 'My Orders', href: '/account/orders', icon: 'shopping-bag' },
            { id: 'addresses', label: 'Addresses', href: '/account/addresses', icon: 'map-pin' },
            { id: 'profile', label: 'Profile', href: '/account/profile', icon: 'user' },
            { id: 'settings', label: 'Settings', href: '/account/settings', icon: 'settings' }
        ]

        return `
            <div class="account-sidebar">
                <div class="sidebar-header">
                    <img src="public/blom_logo.png" alt="BLOM Cosmetics" class="sidebar-logo">
                </div>
                <nav class="sidebar-nav">
                    ${navItems.map(item => `
                        <a href="${item.href}" class="sidebar-link ${item.id === this.options.currentPage ? 'active' : ''}" data-page="${item.id}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                ${this.getIconSvg(item.icon)}
                            </svg>
                            <span>${item.label}</span>
                        </a>
                    `).join('')}
                </nav>
                <div class="sidebar-footer">
                    <div class="user-card">
                        <div class="user-avatar">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div class="user-details">
                            <div class="user-name">${this.currentUser?.user_metadata?.full_name || 'User'}</div>
                            <div class="user-email">${this.currentUser?.email || ''}</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    getIconSvg(iconName) {
        const icons = {
            dashboard: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
            'shopping-bag': '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
            'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
            user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
            settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>'
        }
        return icons[iconName] || ''
    }

    getPageTitle() {
        const titles = {
            dashboard: 'Dashboard',
            orders: 'My Orders',
            addresses: 'Addresses',
            profile: 'Profile',
            settings: 'Settings'
        }
        return titles[this.options.currentPage] || 'Account'
    }

    bindEvents() {
        // Logout button
        const logoutBtn = this.container.querySelector('#logout-btn')
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await this.handleLogout()
            })
        }

        // Sidebar navigation
        const sidebarLinks = this.container.querySelectorAll('.sidebar-link')
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const page = link.dataset.page
                this.navigateToPage(page)
            })
        })

        // Listen for auth state changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                this.redirectToLogin()
            }
        })
    }

    async handleLogout() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            
            // Redirect to login
            window.location.href = '/login'
        } catch (error) {
            console.error('Logout error:', error)
            alert('Failed to sign out. Please try again.')
        }
    }

    navigateToPage(page) {
        const pageUrls = {
            dashboard: '/account',
            orders: '/account/orders',
            addresses: '/account/addresses',
            profile: '/account/profile',
            settings: '/account/settings'
        }
        
        const url = pageUrls[page]
        if (url) {
            window.location.href = url
        }
    }

    setContent(content) {
        const contentContainer = this.container.querySelector('#account-content')
        if (contentContainer) {
            contentContainer.innerHTML = content
        }
    }

    showLoading() {
        const contentContainer = this.container.querySelector('#account-content')
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="loading-container">
                    <div class="spinner"></div>
                    <p>Loading...</p>
                </div>
            `
        }
    }

    showError(message) {
        const contentContainer = this.container.querySelector('#account-content')
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </div>
                    <h3>Something went wrong</h3>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                </div>
            `
        }
    }
}

// Export for use in other modules
export default AccountLayout
