
import apiClient from "../../../api/apiClient";
import type {
   Workspace,
   WorkspaceResponse,
   WorkspacesResponse
} from "../types/WorkspaceTypes";

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

export {
   getWorkspaces,
   getWorkspaceById
}