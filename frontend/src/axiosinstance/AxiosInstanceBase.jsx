import axios from 'axios';

const axiosInstanceBase = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstanceBase;