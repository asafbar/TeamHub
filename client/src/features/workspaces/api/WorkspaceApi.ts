
import apiClient from "../../../api/apiClient";
import type {
   Workspace,
   WorkspaceResponse,
   WorkspacesResponse,
   WorkspaceMember,
   WorkspaceMembersResponse,
   CreateWorkspaceRequest
} from "../types/WorkspaceTypes";

async function createWorkspace(
   workspaceData: CreateWorkspaceRequest
): Promise<Workspace> {
   const response = await apiClient.post<WorkspaceResponse>(
      "/workspaces",
      workspaceData
   )

   return response.data.data
}

async function getWorkspaces(): Promise<Workspace[]> {
   const response = await apiClient.get<WorkspacesResponse>(
      "/workspaces"
   )

   return response.data.data
}

async function getWorkspaceById(
   workspaceId: string
): Promise<Workspace> {
   const response = await apiClient.get<WorkspaceResponse>(
      `/workspaces/${workspaceId}`
   )

   return response.data.data
}

async function getWorkspaceMembers(
   workspaceId: string
): Promise<WorkspaceMember[]> {
   const response = await apiClient.get<WorkspaceMembersResponse>(
      `/workspaces/${workspaceId}/members`
   )

   return response.data.data
}

export {
   createWorkspace,
   getWorkspaces,
   getWorkspaceById,
   getWorkspaceMembers
}