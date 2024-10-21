import axios from 'axios';
import GLOBAL_URLS from './GlobalUrls';

const axiosInstance = axios.create({
    baseURL: GLOBAL_URLS.BASE_URL_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Authorization': `Api-Key 70V5oEiP.O93IGXAZDyPjN2oXYFGQJfZ7Jt53WUY2`,
    },
});

export default axiosInstance;