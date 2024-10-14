import axios from 'axios';
import GLOBAL_URLS from './GlobalUrls';

const axiosInstanceBase = axios.create({
    baseURL: GLOBAL_URLS.API.BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstanceBase;