import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
    Task,
    TaskStatus,
    TaskPriority
} from "../types/TaskTypes"
import { getTaskPriorities, getTaskStatuses, getWorkspaceTasks } from "../api/TaskApi"

type TaskState = {
    tasks: Task[]
    statuses: TaskStatus[]
    priorities: TaskPriority[]
    loading: boolean
    error: string | null
}

const initialState: TaskState = {
    tasks: [],
    statuses: [],
    priorities: [],
    loading: false,
    error: null
}

//load all relevant data, instead of create seperate AsynThunk
type TaskBoardData = {
    tasks: Task[]
    statuses: TaskStatus[]
    priorities: TaskPriority[]
}

export const loadTaskBoardAsync = createAsyncThunk<
    TaskBoardData,
    string,
    { rejectValue: string }
>(
    "tasks/loadingBoard",
    async (workspaceId, thunkApi) => {
        try {
            const [
                tasks,
                statuses,
                priorities
            ] = await Promise.all([
                getWorkspaceTasks(workspaceId),
                getTaskStatuses(workspaceId),
                getTaskPriorities(workspaceId)
            ])

            return {
                tasks,
                statuses,
                priorities
            }
        } catch (error) {
            return thunkApi.rejectWithValue("Could not load task board.")
        }
    }
)

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loadTaskBoardAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadTaskBoardAsync.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.tasks
                state.statuses = action.payload.statuses
                state.priorities = action.payload.priorities
                state.error = null
            })
            .addCase(loadTaskBoardAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not load task board."
            })
    },
})

export default taskSlice.reducer