import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {

            console.error('Error:', error.response);
        } else {
            console.error('Error fuera de la respuesta:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
