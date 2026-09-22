import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { LoginResponse, LoginRequest, User } from "../types/AuthTypes"
import { login, getMe, updateMe } from "../api/AuthApi"
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

export const updateAvatarAsync = createAsyncThunk<
    User,
    string,
    { rejectValue: string }
>(
    "auth/updateAvatar",
    async (avatar, thunkApi) => {
        try {
            return await updateMe(avatar)
        } catch (error) {
            return thunkApi.rejectWithValue("Could not update avatar.")
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

            //login
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

            // current user (me)
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

            // update avatar user (me)
            .addCase(updateAvatarAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateAvatarAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(updateAvatarAsync.rejected,(state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not update avatar."
            })
    },
})

export const {
    logout
} = authSlice.actions

export default authSlice.reducer