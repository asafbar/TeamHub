import axios from "axios";
import { getToken } from "../features/auth/services/AuthStorageService";

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

export default apiClient