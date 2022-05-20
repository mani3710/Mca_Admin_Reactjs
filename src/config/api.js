import axios from 'axios';
const BASE_URL = "http://192.168.0.101:5000";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Token 4f2e899d0f4d1096c8e415a8326e6cdc98a5787c'
    },
    validateStatus: (status) => {
        console.log('instance validateStatus status =', status);
        return status < 500;
    }
});

export default instance;

instance.interceptors.request.use(
    (config) => {
        // console.log('axios instance interceptors request config =', config);
        return config;
    },
    (error) => {
        console.log('axios instance interceptors request error =', error);
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // console.log('axios instance interceptors response =', response);
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log('axios instance interceptors response error =', error);
        return Promise.reject(error);
    },
);

// Global Axios Config
axios.interceptors.request.use(
    (config) => config,
    (err) => Promise.reject(err),
);
axios.interceptors.response.use(
    (response) => response,
    (err) => Promise.reject(err),
);