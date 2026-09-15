export type Workspace = {
    id: string
    name: string
    description: string
}

export type WorkspacesResponse = {
    success: boolean
    message: string
    data: Workspace[]
}

export type WorkspaceResponse = {
    success: boolean
    message: string
    data: Workspace
}