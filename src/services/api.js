import axios from 'axios';

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL); // 디버깅을 위한 코드

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const sendData = (data) => API.post('/api/endpoint', data);

export default API; // API 인스턴스를 기본 내보내기(export)로 추가
