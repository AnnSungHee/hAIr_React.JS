import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

export const sendData = (data) => API.post('/api/endpoint', data);
