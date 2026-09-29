import apiClient from "../../../api/apiClient";
import type {
    LoginRequest,
    LoginResponse,
    User,
    RegisterRequest,
    RegisterResponse
} from "../types/AuthTypes";

type UpdateMeRequest = {
    avatar?: string
    theme?: "dark" | "light"
}

async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
        "/auth/login",
        credentials
    )

    return response.data
}

async function register(
    userData: RegisterRequest
): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
        "/auth/register",
        userData
    )

    return response.data
}

async function getMe(): Promise<User> {
    const response = await apiClient.get("/auth/me")

    return response.data.data
}

async function updateMe(data: UpdateMeRequest): Promise<User> {
    const response = await apiClient.patch(
        "/auth/me",
        data
    )

    return response.data.data
}

export {
    login,
    register,
    getMe,
    updateMe
}