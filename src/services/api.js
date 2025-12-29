import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,//import.meta.env.VITE_BASE_URL, (TROCAR NA HORA DA DESENVOLVIMENTO,  "http://localhost:3001"PARA import.meta.env.VITE_BASE_URL)
})


api.interceptors.request.use((config) => {
    const userData = localStorage.getItem("devburger:userData")

    const token = userData && JSON.parse(userData).token

    config.headers.authorization = `Bearer ${token}`

    return config;
})