import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { useEffect, useState } from "react"
import { loadingWorkspacesAsync } from "../store/workspaceSlice"
import WorkspaceCard from "../components/WorkspaceCard"
import styles from "./WorkspaceListPage.module.css"
import WorkspaceModal from "../components/WorkspaceModal"
import CreateWorkspaceForm from "../components/CreateWorkspaceForm"

function WorkspaceListPage() {

    const dispatch = useDispatch<AppDispatch>()

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const {
        workspaces,
        loading,
        error
    } = useSelector((state: RootState) => state.workspaces)

    useEffect(() => {
        dispatch(loadingWorkspacesAsync())
    }, [dispatch])

    if (loading) {
        return <p>Loading workspaces...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Your Workspaces</h1>
                    <p className={styles.subtitle}>
                        Select a workspace to manage your projects and tasks.
                    </p>
                </div>

                <button
                    className={styles.createButton}
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    + New Workspace
                </button>
            </header>

            <div className={styles.workspaceGrid}>
                {workspaces.map((workspace) => (
                    <WorkspaceCard
                        key={workspace.id}
                        workspace={workspace}
                    />
                ))}
            </div>

            {isCreateModalOpen && (
                <WorkspaceModal
                    title="Create Workspace"
                    description="Create a new workspace for your team and projects."
                    onClose={() => setIsCreateModalOpen(false)}
                    height="auto"
                >
                    <CreateWorkspaceForm
                        onCancel={() => setIsCreateModalOpen(false)}
                        onCreated={() => setIsCreateModalOpen(false)}
                    >

                    </CreateWorkspaceForm>
                </WorkspaceModal>
            )}

        </main>
    )
}

export default WorkspaceListPage