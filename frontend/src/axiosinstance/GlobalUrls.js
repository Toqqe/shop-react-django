

const BASE_URL_API = 'http://localhost:8000/api/'

const GLOBAL_URLS = {
    HOME: '/',
    CART: '/cart',
    CHECKOUT: '/checkout',
    LOGIN: '/login',
    SHOP: '/shop',
    PRODUCTS: '/products/',
    ABOUT: '/about',
    CONTACT: '/contact',
    PROFILE: '/profile',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE_ORDERS: '/profile/orders',
    PROFILE_SETTINGS: '/profile/settings',
    PASSWORD_RESTART: '/password-restart',
    PASSWORD_RESTART_CONF: '/password-reset-confirm',
    LOGOUT: '/logout',
    API : {
        BASE_URL: 'http://localhost:8000/api/',
        PRODUCTS: `${BASE_URL_API}products/`,
        PRODUCTS_CAT: `${BASE_URL_API}products/category/`,
        CART: `${BASE_URL_API}cart/cart/`,
        CART_ITEMS: `${BASE_URL_API}cart/items/`,
        ORDERS: `${BASE_URL_API}orders/`,
        REGISTER: `${BASE_URL_API}account/register/`,
        ADDRESS: `${BASE_URL_API}account/address/`,
        USER: `${BASE_URL_API}account/user/`,
        PASSWORD_RESTART: `${BASE_URL_API}account/password-restart/`,
        PASSWORD_RESTART_CONF: `${BASE_URL_API}account/password-restart-confirm/`,
    }
}

export default GLOBAL_URLS;