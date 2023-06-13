// ESTE ARCHIVO SE VA A ENCARGAR DE LA CONECTIVIDAD MEDIANTE AXIOS

import axios from "axios";

const url_base = "http://127.0.0.1:4000/api";

const api = axios.create({
    baseURL:url_base,
    timeout: 30000, // tiempo se espera al servidor antes de que corte la conexion
    headers: {
        Accept: 'application/json',
        // Authorization: 'Bearer'
    }
});

//configuracion de headers (TOKEN JWT)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // que continue su camino si es un error, y el cliente vea eso
    }
);

//capturar errores: 401(token_malo) o 403(logueado pero prohidido ingresar)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.statusCode === 401) {
            localStorage.removeItem(); // ese token ya no sirve, ya caduco, o intentaron infiltrarse
            window.location.href = "/login"; // anda al login por que tu token esta mal
        }
        if (error.response.statusCode === 403) {

        }
        return Promise.reject(error);
    }
);

const apiService = {
    get: (url, params) => api.get(url, params),
    post: (url, params) => api.post(url, params),
    put: (url, params) => api.put(url, params),
    delete: (url, params) => api.delete(url, params)
}

export default apiService;