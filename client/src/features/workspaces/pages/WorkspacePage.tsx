import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../../store/store"
import { useEffect, useState } from "react"
import {
    loadWorkspaceAsync,
    loadWorkspaceMembersAsync
} from "../store/workspaceSlice"
import { loadTaskBoardAsync } from "../../tasks/store/taskSlice"
import TaskBoard from "../../tasks/components/TaskBoard"
import TaskForm from "../../tasks/components/TaskForm"
import type { Task } from "../../tasks/types/TaskTypes"

function WorkspacePage() {

    const { workspaceId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const [showTaskForm, setShowTaskForm] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const {
        selectedWorkspace,
        members,
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
            dispatch(loadWorkspaceMembersAsync(workspaceId))
            dispatch(loadTaskBoardAsync(workspaceId))
        }
    }, [dispatch, workspaceId])


    if (loading) {
        return <p>Loading workspace...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if(!workspaceId) {
        return <p>Invalid workspace</p>
    }

    if (!selectedWorkspace) {
        return <p>Workspace not found.</p>
    }

    return (
        <div>

            <h1>{selectedWorkspace.name}</h1>
            <p>{selectedWorkspace.description}</p>

            <h2>Tasks</h2>

            <button
                onClick={() => {
                    setSelectedTask(null)
                    setShowTaskForm(true)
                }}>
                + New Task
            </button>

            {showTaskForm && workspaceId && (
                <TaskForm
                    workspaceId={workspaceId}
                    statuses={statuses}
                    priorities={priorities}
                    members={members}
                    task={selectedTask ?? undefined}
                    onCancel={() => setShowTaskForm(false)}
                    onCreated={() => setShowTaskForm(false)}
                    onDelete={() => setShowTaskForm(false)}
                />
            )}

            <TaskBoard
                workspaceId={workspaceId}
                tasks={tasks}
                statuses={statuses}
                priorities={priorities}
                onTaskClick={(task) => {
                    setSelectedTask(task)
                    setShowTaskForm(true)
                }}
            />
        </div>
    )
}

export default WorkspacePage