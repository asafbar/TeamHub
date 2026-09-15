import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { LoginResponse, LoginRequest, User } from "../types/AuthTypes"
import { login, getMe } from "../api/AuthApi"
import { getToken, saveToken } from "../services/AuthStorageService"

type AuthState = {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    token: getToken(),
    loading: false,
    error: null
}

export const loginAsync = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    {
        rejectValue: string
    }
>(
    "auth/login",
    async (credentials, thunkApi) => {
        try {
            const response = await login(credentials)

            saveToken(response.data.token)

            return response
        } catch {
            return thunkApi.rejectWithValue(
                "Login failed."
            )
        }
    }
)

export const loadCurrentUserAsync = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(
    "auth/loadCurrentUser",
    async (_, thunkApi) => {
        try {
            return await getMe()
        } catch (error) {
            return thunkApi.rejectWithValue("Could not load current user.")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data.user
                state.token = action.payload.data.token
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Login failed."
            })

            .addCase(loadCurrentUserAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadCurrentUserAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(loadCurrentUserAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not load current user"
            })
    },
})

export const {
    logout
} = authSlice.actions

export default authSlice.reducer