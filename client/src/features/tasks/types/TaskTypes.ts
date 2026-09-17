export type TaskStatus = {
    id: string
    workspaceId: string
    name: string
    position: number
    isCompleted: boolean
}

export type TaskPriority = {
    id: string
    workspaceId: string
    name: string
    position: number
}

export type TaskStatusesResponse = {
    success: boolean
    message: string
    data: TaskStatus[]
}

export type TaskPrioritiesResponse = {
    success: boolean
    message: string
    data: TaskPriority[]
}

export type Task = {
    id: string
    workspaceId: string
    title: string
    description: string
    statusId: string
    priorityId: string
    assigneeMembershipId: string | null
    createdByUserId: string
    dueDate: string | null
    position: number
}

export type CreateTaskRequest = {
    title: string
    description: string
    statusId: string
    priorityId: string
    assigneeMembershipId: string | null
    dueDate: string | null
    position: number
}

export type UpdateTaskRequest = {
    title?: string
    description?: string
    statusId?: string
    priorityId?: string
    assigneeMembershipId?: string | null
    dueDate?: string | null
    position?: number
}

export type TaskPositionUpdate = {
    taskId: string
    statusId: string
    position: number
}

export type ReorderTaskRequest = {
    taskUpdates: TaskPositionUpdate[]
}

export type TaskResponse = {
    success: boolean
    message: string
    data: Task[]
}