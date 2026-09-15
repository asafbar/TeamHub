import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayouts";
import TaskBoardPage from "../features/tasks/pages/TaskBoardPage";
import WorkspaceListPage from "../features/workspaces/pages/workspaceListPage";
import ProtectedRoute from "./ProtectedRoute";

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