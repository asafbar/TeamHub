import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import TaskBoardPage from "../features/tasks/pages/TaskBoardPage";
import WorkspaceListPage from "../features/workspaces/pages/WorkspaceListPage";
import ProtectedRoute from "./ProtectedRoute";
import WorkspacePage from "../features/workspaces/pages/WorkspacePage";
import ProfilePage from "../features/auth/pages/ProfilePage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import WorkspaceSettingsPage from "../features/workspaces/pages/WorkspaceSettingsPage";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicLayout>
                        <LoginPage />
                    </PublicLayout>
                } />

                <Route path="/" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <WorkspaceListPage />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <ProfilePage />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                <Route path="/settings" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <SettingsPage />
                        </AppLayout>
                    </ProtectedRoute>
                }
                />

                <Route path="/workspaces/:workspaceId"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <WorkspacePage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/workspaces/:workspaceId/settings"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <WorkspaceSettingsPage />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/tasks" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <TaskBoardPage />
                        </AppLayout>
                    </ProtectedRoute>
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter