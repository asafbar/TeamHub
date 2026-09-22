import apiClient from "../../../api/apiClient";
import type {
    LoginRequest,
    LoginResponse,
    User
} from "../types/AuthTypes";

async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
        "/auth/login",
        credentials
    )

    return response.data
}

async function getMe(): Promise<User> {
    const response = await apiClient.get("/auth/me")

    return response.data.data
}

async function updateMe(avatar: string) {
    const response = await apiClient.patch(
        "/auth/me",
        { avatar }
    )

    return response.data.data
}

export {
    login,
    getMe,
    updateMe
}