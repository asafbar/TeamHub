import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/store/authSlice"
import workspaceReducer from "../features/workspaces/store/workspaceSlice"
import taskReducer from "../features/tasks/store/taskSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        workspaces: workspaceReducer,
        tasks: taskReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch