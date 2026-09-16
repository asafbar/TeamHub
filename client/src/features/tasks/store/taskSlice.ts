import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
    Task,
    TaskStatus,
    TaskPriority,
    CreateTaskRequest,
    UpdateTaskRequest
} from "../types/TaskTypes"
import {
    getTaskPriorities,
    getTaskStatuses,
    getWorkspaceTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api/TaskApi"

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

type CreateTaskArgs = {
    workspaceId: string
    taskData: CreateTaskRequest
}

type UpdateTaskArgs = {
    workspaceId: string
    taskId: string
    taskData: UpdateTaskRequest
}

type DeleteTaskArgs = {
    workspaceId: string
    taskId: string
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

export const createTaskAsync = createAsyncThunk<
    Task,
    CreateTaskArgs,
    { rejectValue: string }
>(
    "tasks/createTask",
    async ({ workspaceId, taskData }, thunkApi) => {
        try {
            return await createTask(workspaceId, taskData)
        } catch (error) {
            return thunkApi.rejectWithValue("Could not create task.")
        }
    }
)

export const updateTaskAsync = createAsyncThunk<
    Task,
    UpdateTaskArgs,
    { rejectValue: string }
>(
    "tasks/updateTask",
    async ({ workspaceId, taskId, taskData }, thunkApi) => {
        try {
            return await updateTask(
                workspaceId,
                taskId,
                taskData
            )
        } catch (error) {
            return thunkApi.rejectWithValue("Could not update task.")
        }
    }
)

export const deleteTaskAsync = createAsyncThunk<
    string, //to know what takId was removed (rturn)
    DeleteTaskArgs,
    { rejectValue: string }
>(
    "tasks/deleteTask",
    async ({ workspaceId, taskId }, thunkApi) => {
        try {
            await deleteTask(workspaceId, taskId)
            return taskId
        } catch (error) {
            return thunkApi.rejectWithValue("Could not delete task.")
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

            //create task
            .addCase(createTaskAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.loading = false
                state.tasks.push(action.payload)
                state.error = null
            })
            .addCase(createTaskAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not create task."
            })

            //update task
            .addCase(updateTaskAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.loading = false

                const taskIndex = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                )

                if (taskIndex !== -1) {
                    state.tasks[taskIndex] = action.payload
                }

                state.error = null
            })
            .addCase(updateTaskAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not update task."
            })

            //delete task
            .addCase(deleteTaskAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.loading = false

                state.tasks = state.tasks.filter((task) => task.id !== action.payload)

                state.error = null
            })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not delete task."
            })
    },
})

export default taskSlice.reducer