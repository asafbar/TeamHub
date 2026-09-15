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

export type TaskResponse = {
    success: boolean
    message: string
    data: Task[]
}