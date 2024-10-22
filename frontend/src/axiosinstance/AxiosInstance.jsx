import axios from 'axios';
import GLOBAL_URLS from './GlobalUrls';

const axiosInstance = axios.create({
    baseURL: GLOBAL_URLS.BASE_URL_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Authorization': import.meta.env.VITE_API_KEY_REACT,
    },
});

export default axiosInstance;