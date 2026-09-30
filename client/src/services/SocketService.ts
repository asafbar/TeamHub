import { io } from 'socket.io-client'
import { getToken } from '../features/auth/services/AuthStorageService'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

export const socket = io(SOCKET_URL, {
    auth: {
        token: getToken()
    }
})
