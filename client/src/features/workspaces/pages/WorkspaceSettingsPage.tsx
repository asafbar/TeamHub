import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import type { AppDispatch } from "../../../store/store"
import { useEffect, useState } from "react"
import { loadTaskBoardAsync } from "../../tasks/store/taskSlice"
import WorkspaceModal from "../components/WorkspaceModal"
import StatusManager from "../components/StatusManager"

function WorkspaceSettingsPage() {

    const { workspaceId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const [showStatusManager, setShowStatusManager] = useState(false)

    useEffect(() => {
        if (workspaceId) {
            dispatch(loadTaskBoardAsync(workspaceId))
        }
    }, [dispatch, workspaceId])

    return (
        <div>
            <h1>Workspace Settings</h1>
            <p>Manage workspace statuses and priorities.</p>

            <section>
                <h2>Statuses</h2>

                <button
                    type="button"
                    onClick={() => setShowStatusManager(true)}
                >
                    Manage Statuses
                </button>
            </section>

            {showStatusManager && workspaceId && (
                <WorkspaceModal
                    title="Manage Statuses"
                    description="Add, edit, remove and reorder task statuses."
                    onClose={() => setShowStatusManager(false)}
                >
                    <StatusManager workspaceId={workspaceId} />
                </WorkspaceModal>
            )}

        </div>
    )
}

export default WorkspaceSettingsPage