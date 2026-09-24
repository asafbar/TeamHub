import apiClient from "../../../api/apiClient";
import type {
    Task,
    TaskResponse,
    TaskStatus,
    TaskPriority,
    TaskPrioritiesResponse,
    TaskStatusesResponse,
    CreateTaskRequest,
    UpdateTaskRequest,
    ReorderTaskRequest,
    CreateTaskStatusRequest,
    UpdateTaskStatusRequest,
    ReorderTaskStatusesRequest
} from "../types/TaskTypes";

async function getWorkspaceTasks(
    workspaceId: string
): Promise<Task[]> {
    const response = await apiClient.get<TaskResponse>(
        `/workspaces/${workspaceId}/tasks`
    )

    return response.data.data
}

async function getTaskStatuses(
    workspaceId: string
): Promise<TaskStatus[]> {
    const response = await apiClient.get<TaskStatusesResponse>(
        `/workspaces/${workspaceId}/tasks/statuses`
    )

    return response.data.data
}

async function createTaskStatus(
    workspaceId: string,
    statusData: CreateTaskStatusRequest
): Promise<TaskStatus> {
    const response = await apiClient.post(
        `/workspaces/${workspaceId}/tasks/statuses`,
        statusData
    )

    return response.data.data
}

async function updateTaskStatus(
    workspaceId: string,
    statusId: string,
    statusData: UpdateTaskStatusRequest
): Promise<TaskStatus> {
    const response = await apiClient.patch(
        `/workspaces/${workspaceId}/tasks/statuses/${statusId}`,
        statusData
    )

    return response.data.data
}

async function deleteTaskStatus(
    workspaceId: string,
    statusId: string
): Promise<void> {
    await apiClient.delete(
        `/workspaces/${workspaceId}/tasks/statuses/${statusId}`
    )
}

async function reorderTaskStatuses(
    workspaceId: string,
    reorderData: ReorderTaskStatusesRequest
): Promise<TaskStatus[]> {
    const response = await apiClient.patch(
        `/workspaces/${workspaceId}/tasks/statuses/reorder`,
        reorderData
    )

    return response.data.data
}

async function getTaskPriorities(
    workspaceId: string
): Promise<TaskPriority[]> {
    const response = await apiClient.get<TaskPrioritiesResponse>(
        `/workspaces/${workspaceId}/tasks/priorities`
    )

    return response.data.data
}

async function createTask(
    workspaceId: string,
    taskData: CreateTaskRequest
): Promise<Task> {
    const response = await apiClient.post(
        `/workspaces/${workspaceId}/tasks`,
        taskData
    )

    return response.data.data
}

async function updateTask(
    workspaceId: string,
    taskId: string,
    taskData: UpdateTaskRequest
): Promise<Task> {
    const response = await apiClient.patch(
        `/workspaces/${workspaceId}/tasks/${taskId}`,
        taskData
    )

    return response.data.data
}

async function deleteTask(
    workspaceId: string,

    taskId: string): Promise<void> {
    await apiClient.delete(
        `/workspaces/${workspaceId}/tasks/${taskId}`
    )
}

async function reorderTasks(
    workspaceId: string,
    reorderData: ReorderTaskRequest
): Promise<Task[]> {
    const response = await apiClient.patch(
        `/workspaces/${workspaceId}/tasks/reorder`,
        reorderData
    )

    return response.data.data
}

export {
    getWorkspaceTasks,
    getTaskStatuses,
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus,
    reorderTaskStatuses,
    getTaskPriorities,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks
}