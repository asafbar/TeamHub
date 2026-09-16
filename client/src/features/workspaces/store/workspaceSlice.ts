import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
    Workspace,
    WorkspaceMember
} from "../types/WorkspaceTypes"
import {
    getWorkspaceById,
    getWorkspaces,
    getWorkspaceMembers
} from "../api/WorkspaceApi"

type WorkspaceState = {
    workspaces: Workspace[]
    selectedWorkspace: Workspace | null
    members: WorkspaceMember[]
    loading: boolean
    error: string | null
}

const initialState: WorkspaceState = {
    workspaces: [],
    selectedWorkspace: null,
    members: [],
    loading: false,
    error: null
}

export const loadingWorkspacesAsync = createAsyncThunk<
    Workspace[],
    void,
    { rejectValue: string }
>(
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
    { rejectValue: string }
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

export const loadWorkspaceMembersAsync = createAsyncThunk<
    WorkspaceMember[],
    string,
    { rejectValue: string }
>(
    "workspaces/loadWorkspaceMembers",
    async (workspaceId, thunkApi) => {
        try {
            return await getWorkspaceMembers(workspaceId)
        } catch (error) {
            return thunkApi.rejectWithValue("Could not load workspace members.")
        }
    }
)

const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //workspace list
            .addCase(loadingWorkspacesAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadingWorkspacesAsync.fulfilled, (state, action) => {
                state.loading = false
                state.workspaces = action.payload
            })
            .addCase(loadingWorkspacesAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not load workspaces."
            })

            //worksapce by id
            .addCase(loadWorkspaceAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadWorkspaceAsync.fulfilled, (state, action) => {
                state.loading = false
                state.selectedWorkspace = action.payload
            })
            .addCase(loadWorkspaceAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not load workspaces."
            })

            //workspace members
            .addCase(loadWorkspaceMembersAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadWorkspaceMembersAsync.fulfilled, (state, action) => {
                state.loading = false
                state.members = action.payload
                state.error = null
            })
            .addCase(loadWorkspaceMembersAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not load workspace members."
            })
    }
})

export default workspaceSlice.reducer