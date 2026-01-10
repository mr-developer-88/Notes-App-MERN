import axios from "axios"
import { BASE_URL } from "./constants"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.clear();
            window.location.href = '/login';
        }
        
        // Format error message
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'An unexpected error occurred';
        
        error.displayMessage = errorMessage;
        return Promise.reject(error);
    }
);

export default axiosInstance
