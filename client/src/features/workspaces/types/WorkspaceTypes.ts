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

export type WorkspaceMemberUser = {
    id: string
    username: string
    email: string
    avatar: string | null
}

export type WorkspaceMember = {
    id: string
    user: WorkspaceMemberUser
    role: string
    joinedAt: string
}

export type WorkspaceMembersResponse = {
    success: boolean
    message: string
    data: WorkspaceMember[]
}