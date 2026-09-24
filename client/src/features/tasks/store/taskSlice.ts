import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
    Task,
    TaskStatus,
    TaskPriority,
    CreateTaskRequest,
    UpdateTaskRequest,
    ReorderTaskRequest,
    CreateTaskStatusRequest,
    UpdateTaskStatusRequest,
    ReorderTaskStatusesRequest
} from "../types/TaskTypes"
import {
    getTaskPriorities,
    getTaskStatuses,
    getWorkspaceTasks,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus,
    reorderTaskStatuses
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

type ReorderTasksArgs = {
    workspaceId: string
    reorderData: ReorderTaskRequest
}

type CreateTaskStatusArgs = {
    workspaceId: string
    statusData: CreateTaskStatusRequest
}

type UpdateTaskStatusArgs = {
    workspaceId: string
    statusId: string
    statusData: UpdateTaskStatusRequest
}

type DeleteTaskStatusArgs = {
    workspaceId: string
    statusId: string
}

type ReorderTaskStatusesArgs = {
    workspaceId: string
    reorderData: ReorderTaskStatusesRequest
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

export const reorderTasksAsync = createAsyncThunk<
    Task[],
    ReorderTasksArgs,
    { rejectValue: string }
>(
    "tasks/reorderTasks",
    async ({ workspaceId, reorderData }, thunkApi) => {
        try {
            return await reorderTasks(
                workspaceId,
                reorderData
            )
        } catch (error) {
            return thunkApi.rejectWithValue("Could not reorder tasks.")
        }
    }
)

export const createTaskStatusAsync = createAsyncThunk<
    TaskStatus,
    CreateTaskStatusArgs,
    { rejectValue: string }
>(
    "tasks/createTaskStatus",
    async ({ workspaceId, statusData }, thunkApi) => {
        try {
            return await createTaskStatus(
                workspaceId,
                statusData
            )
        } catch (error) {
            return thunkApi.rejectWithValue("Could not create task status.")
        }
    }
)

export const updateTaskStatusAsync = createAsyncThunk<
    TaskStatus,
    UpdateTaskStatusArgs,
    { rejectValue: string }
>(
    "tasks/updateTaskStatus",
    async ({ workspaceId, statusId, statusData }, thunkApi) => {
        try {
            return await updateTaskStatus(
                workspaceId,
                statusId,
                statusData
            )
        } catch (error) {
            return thunkApi.rejectWithValue("Could not update task status.")
        }
    }
)

export const deleteTaskStatusAsync = createAsyncThunk<
    string,
    DeleteTaskStatusArgs,
    { rejectValue: string }
>(
    "tasks/deleteTaskStatus",
    async ({ workspaceId, statusId }, thunkApi) => {
        try {
            await deleteTaskStatus(
                workspaceId,
                statusId
            )

            return statusId
        } catch (error) {
            if(axios.isAxiosError(error)){
                return thunkApi.rejectWithValue(
                    error.response?.data?.message ??
                    "Could not delete task status."
                )
            }
            return thunkApi.rejectWithValue("Could not delete task status.")
        }
    }
)

export const reorderTaskStatusesAsync = createAsyncThunk<
    TaskStatus[],
    ReorderTaskStatusesArgs,
    { rejectValue: string }
>(
    "tasks/reorderTaskStatuses",
    async ({ workspaceId, reorderData }, thunkApi) => {
        try {
            return await reorderTaskStatuses(
                workspaceId,
                reorderData
            )
        } catch (error) {
            return thunkApi.rejectWithValue("Could not reorder task statuses.")
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

            //reorder tasks
            .addCase(reorderTasksAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(reorderTasksAsync.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
                state.error = null
            })
            .addCase(reorderTasksAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not reorder tasks."
            })

            // create task status
            .addCase(createTaskStatusAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createTaskStatusAsync.fulfilled, (state, action) => {
                state.loading = false
                state.statuses.push(action.payload)
                state.error = null
            })
            .addCase(createTaskStatusAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not create task status."
            })

            //update task status
            .addCase(updateTaskStatusAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
                state.loading = false
                const statusIndex = state.statuses.findIndex(
                    (status) => status.id === action.payload.id
                )

                if (statusIndex !== -1) {
                    state.statuses[statusIndex] = action.payload
                }

                state.error = null
            })
            .addCase(updateTaskStatusAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not update task status."
            })

            // delete task status
            .addCase(deleteTaskStatusAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteTaskStatusAsync.fulfilled, (state, action) => {
                state.loading = false

                state.statuses = state.statuses.filter(
                    (status) => status.id !== action.payload
                )

                state.error = null
            })
            .addCase(deleteTaskStatusAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not delete task status."
            })

            // reorder task statuses
            .addCase(reorderTaskStatusesAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(reorderTaskStatusesAsync.fulfilled, (state, action) => {
                state.loading = false
                state.statuses = action.payload
                state.error = null
            })
            .addCase(reorderTaskStatusesAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Could not reorder task statuses."
            })
    },
})

export default taskSlice.reducer