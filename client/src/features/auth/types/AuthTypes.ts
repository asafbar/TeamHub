export type User = {
    id: string
    username: string
    email: string
    avatar: string | null
    theme: "dark" | "light"
}

export type LoginRequest = {
    email: string
    password: string
}

export type LoginData = {
    token: string
    user: User
}

export type LoginResponse = {
    success: boolean
    message: string
    data: LoginData
    errors: unknown
}