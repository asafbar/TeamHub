import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../../store/store"
import { useEffect } from "react"
import { loadWorkspaceAsync } from "../store/workspaceSlice"
import { loadTaskBoardAsync } from "../../tasks/store/taskSlice"
import TaskBoard from "../../tasks/components/TaskBoard"

function WorkspacePage() {

    const { workspaceId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const {
        selectedWorkspace,
        loading,
        error
    } = useSelector((state: RootState) => state.workspaces)

    const {
        tasks,
        statuses,
        priorities
    } = useSelector((state: RootState) => state.tasks)

    useEffect(() => {
        if (workspaceId) {
            dispatch(loadWorkspaceAsync(workspaceId))
            dispatch(loadTaskBoardAsync(workspaceId))
        }
    }, [dispatch, workspaceId])


    if (loading) {
        return <p>Loading workspace...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!selectedWorkspace) {
        return <p>Workspace not found.</p>
    }

    return (
        <div>

            <h1>{selectedWorkspace.name}</h1>
            <p>{selectedWorkspace.description}</p>

            <h2>Tasks</h2>

            <TaskBoard 
                tasks={tasks}
                statuses={statuses}
                priorities={priorities}
            />
        </div>
    )
}

export default WorkspacePage