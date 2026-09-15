import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Workspace } from "../types/WorkspaceTypes"
import { 
    getWorkspaceById,
    getWorkspaces
} from "../api/WorkspaceApi"

type WorkspaceState = {
    workspaces: Workspace[]
    selectedWorkspace: Workspace | null
    loading: boolean
    error: string | null
}

const initialState: WorkspaceState = {
    workspaces: [],
    selectedWorkspace: null,
    loading: false,
    error: null
}

export const loadingWorkspacesAsync = createAsyncThunk<
    Workspace[],
    void,
    { rejectValue: string }
> (
    "workspaces/loadWorkspaces",
    async (_, thunkApi) => {
        try {
            return await getWorkspaces()
        } catch (error) {
            return thunkApi.rejectWithValue(
                "Could not load workspaces."
            )
        }
    }
)

export const loadWorkspaceAsync = createAsyncThunk<
    Workspace,
    string,
    {rejectValue: string}
>(
    "workspaces/loadWorkspace",
    async (workspaceId, thunkApi) => {
        try {
            return await getWorkspaceById(workspaceId)
        } catch (error) {
            return thunkApi.rejectWithValue(
                "Could not load workspace."
            )
        }
    }
)

const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(loadingWorkspacesAsync.pending, (state)=> {
            state.loading = true
            state.error = null
        })
        .addCase(loadingWorkspacesAsync.fulfilled, (state, action)=> {
            state.loading = false
            state.workspaces = action.payload
        })
        .addCase(loadingWorkspacesAsync.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload ?? "Could not load workspaces."
        })

        .addCase(loadWorkspaceAsync.pending, (state)=> {
            state.loading = true
            state.error = null
        })
        .addCase(loadWorkspaceAsync.fulfilled, (state, action) => {
            state.loading = false
            state.selectedWorkspace = action.payload
        })
        .addCase(loadWorkspaceAsync.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload ?? "Could not load workspaces."
        })
    }
})

export default workspaceSlice.reducer