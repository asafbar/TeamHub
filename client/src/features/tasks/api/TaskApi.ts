import apiClient from "../../../api/apiClient";
import type {
    Task,
    TaskResponse,
    TaskStatus,
    TaskPriority,
    TaskPrioritiesResponse,
    TaskStatusesResponse
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

async function getTaskPriorities(
    workspaceId: string
): Promise<TaskPriority[]> {
    const response = await apiClient.get<TaskPrioritiesResponse>(
        `/workspaces/${workspaceId}/tasks/priorities`
    )

    return response.data.data
}

export {
    getWorkspaceTasks,
    getTaskStatuses,
    getTaskPriorities
}