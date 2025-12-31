import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('devburger:userData');

  if (userData) {
    try {
      const { token } = JSON.parse(userData);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao parsear userData:', error);
    }
  }

  return config;
});

// ✅ Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('devburger:userData');
      window.location.href = '/Login';
    }
    return Promise.reject(error);
  }
);

export default api;

