import type { Task, TaskPriority, TaskStatus } from "../types/TaskTypes"
import styles from "./TaskBoard.module.css"
import TaskColumn from "./TaskColumn"
import { DragDropProvider } from "@dnd-kit/react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../store/store"
import { updateTaskAsync } from "../store/taskSlice"

type TaskBoardProps = {
    workspaceId: string
    tasks: Task[]
    statuses: TaskStatus[]
    priorities: TaskPriority[]
    onTaskClick: (task: Task) => void
}
function TaskBoard({
    workspaceId,
    tasks,
    statuses,
    priorities,
    onTaskClick
}: TaskBoardProps) {

    const dispatch = useDispatch<AppDispatch>()

    function handleDragEnd(event: any) {

        const taskId = event.operation.source?.id
        const statusId = event.operation.target?.id

        if (!taskId || !statusId) { return }

        const task = tasks.find((task) => task.id === taskId)

        if (!task || task.statusId === statusId) { return }

        dispatch(
            updateTaskAsync({
                workspaceId,
                taskId: String(taskId),
                taskData: {
                    statusId: String(statusId)
                }
            })
        )
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div className={styles.board}>
                {statuses
                    .slice()
                    .sort((a, b) => a.position - b.position)
                    .map((status) => {
                        const statusTasks = tasks
                            .filter((task) => task.statusId === status.id)
                            .sort((a, b) => a.position - b.position)

                        return (
                            <TaskColumn
                                key={status.id}
                                status={status}
                                tasks={statusTasks}
                                priorities={priorities}
                                onTaskClick={onTaskClick}
                            />
                        )
                    })
                }
            </div>
        </DragDropProvider>
    )
}

export default TaskBoard