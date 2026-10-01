import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
    Workspace,
    WorkspaceMember,
    CreateWorkspaceRequest,
    UpdateWorkspaceRequest,
    AddWorkspaceMemberRequest
} from "../types/WorkspaceTypes"
import {
    getWorkspaceById,
    getWorkspaces,
    getWorkspaceMembers,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    addWorkspaceMember
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

export const createWorkspaceAsync = createAsyncThunk<
    Workspace,
    CreateWorkspaceRequest,
    { rejectValue: string }
>(
    "workspaces/createWorkspace",
    async (workspaceData, thunkApi) => {
        try {
            return await createWorkspace(workspaceData)
        } catch {
            return thunkApi.rejectWithValue("Could not create workspace.")
        }
    }
)

export const loadingWorkspacesAsync = createAsyncThunk<
    Workspace[],
    void,
    { rejectValue: string }
>(
    "workspaces/loadWorkspaces",
    async (_, thunkApi) => {
        try {
            return await getWorkspaces()
        } catch {
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
        } catch {
            return thunkApi.rejectWithValue(
                "Could not load workspace."
            )
        }
    }
)

export const updateWorkspaceAsync = createAsyncThunk<
    Workspace,
    { workspaceId: string; workspaceData: UpdateWorkspaceRequest },
    { rejectValue: string }
>(
    "workspaces/updateWorkspace",
    async ({ workspaceId, workspaceData }, thunkApi) => {
        try {
            return await updateWorkspace(workspaceId, workspaceData)
        } catch {
            return thunkApi.rejectWithValue("Could not update workspace.")
        }
    }
)

export const deleteWorkspaceAsync = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "workspaces/deleteWorkspace",
    async (workspaceId, thunkApi) => {
        try {
            await deleteWorkspace(workspaceId)
            return workspaceId
        } catch {
            return thunkApi.rejectWithValue("Could not delete workspace.")
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
        } catch {
            return thunkApi.rejectWithValue("Could not load workspace members.")
        }
    }
)

export const addWorkspaceMemberAsync = createAsyncThunk<
    WorkspaceMember,
    { workspaceId: string; memberData: AddWorkspaceMemberRequest },
    { rejectValue: string }
>(
    "workspaces/addWorkspaceMember",
    async ({ workspaceId, memberData }, thunkApi) => {
        try {
            return await addWorkspaceMember(
                workspaceId,
                memberData
            )
        } catch {
            return thunkApi.rejectWithValue(
                "Could not add workspace member."
            )
        }
    }
)

const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // crate workspace
            .addCase(createWorkspaceAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createWorkspaceAsync.fulfilled, (state, action) => {
                state.loading = false
                state.workspaces.push(action.payload)
                state.error = null
            })
            .addCase(createWorkspaceAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not create workspace."
            })

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

            // update workspace
            .addCase(updateWorkspaceAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateWorkspaceAsync.fulfilled, (state, action) => {
                state.loading = false
                state.selectedWorkspace = action.payload

                const workspaceIndex = state.workspaces.findIndex(
                    (workspace) => workspace.id === action.payload.id
                )

                if (workspaceIndex !== -1) {
                    state.workspaces[workspaceIndex] = action.payload
                }

                state.error = null
            })
            .addCase(updateWorkspaceAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not update workspace."
            })

            // delete workspace
            .addCase(deleteWorkspaceAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteWorkspaceAsync.fulfilled, (state, action) => {
                state.loading = false

                state.workspaces = state.workspaces.filter(
                    (workspace) => workspace.id !== action.payload
                )

                if (state.selectedWorkspace?.id === action.payload) {
                    state.selectedWorkspace = null
                    state.members = []
                }

                state.error = null
            })
            .addCase(deleteWorkspaceAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not delete workspace."
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

            // add workspace member
            .addCase(addWorkspaceMemberAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addWorkspaceMemberAsync.fulfilled, (state, action) => {
                state.loading = false
                state.members.push(action.payload)
                state.error = null
            })
            .addCase(addWorkspaceMemberAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not add workspace member."
            })
    }
})

export default workspaceSlice.reducer