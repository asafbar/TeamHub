import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { useEffect } from "react"
import { loadingWorkspacesAsync } from "../store/workspaceSlice"
import WorkspaceCard from "../components/WorkspaceCard"

function WorkspaceListPage() {

    const dispatch = useDispatch<AppDispatch>()

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
        <div>
            {workspaces.map((workspace) => (
                <WorkspaceCard
                    key={workspace.id}
                    workspace={workspace}
                />
            ))}

        </div>
    )
}

export default WorkspaceListPage