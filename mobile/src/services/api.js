import axios from 'axios'; // cliente http

const api = axios.create({
    baseUrl: 'http://192.168.0.101:3333'
});

export default api;