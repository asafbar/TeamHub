import axios from "axios";
import { getToken, removeToken } from "../features/auth/services/AuthStorageService";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

//middleware like... if there is a token stored in localStorage,
//insert it into the headers, return the configuration file to axios
apiClient.interceptors.request.use((config) => {
    const token = getToken()

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiClient.interceptors.response.use(
    (response)=> response,
    (error)=> {
        if(
            error.response?.status === 401 &&
            window.location.pathname !== "/login"
        ) {
            removeToken()
            window.location.replace("/login")
        }

        return Promise.reject(error)
    }
)

export default apiClient