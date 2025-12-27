import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001",
});

api.interceptors.request.use(config => {
    const userDataString = localStorage.getItem('devburger:userData');

    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            if (userData && userData.token) {
                config.headers.Authorization = `Bearer ${userData.token}`;
            }
        } catch (error) {
            console.error("Erro ao parsear userData do localStorage no interceptor de requisição:", error);
            // Se o JSON estiver corrompido, removemos para evitar futuros erros
            localStorage.removeItem('devburger:userData');
        }
    }
    return config;
}, error => {
    // Opcional: Lidar com erros na requisição antes de ser enviada
    return Promise.reject(error);
});

// Interceptor para lidar com erros de resposta (como 401)
api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        // Se o token for inválido ou expirado, limpamos os dados do usuário
        localStorage.removeItem('devburger:userData');
        // window.location.href = '/login'; // Descomente se quiser redirecionar automaticamente
    }
    return Promise.reject(error);
});
