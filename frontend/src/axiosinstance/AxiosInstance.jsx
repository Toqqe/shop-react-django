import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Authorization': `Api-Key 70V5oEiP.O93IGXAZDyPjN2oXYFGQJfZ7Jt53WUY2`,
    },
});

export default axiosInstance;