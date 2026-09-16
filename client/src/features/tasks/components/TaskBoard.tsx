import type { Task, TaskPriority, TaskStatus } from "../types/TaskTypes"
import styles from "./TaskBoard.module.css"
import TaskColumn from "./TaskColumn"

type TaskBoardProps = {
    tasks: Task[]
    statuses: TaskStatus[]
    priorities: TaskPriority[]
    onTaskClick: (task: Task) => void
}
function TaskBoard({
    tasks,
    statuses,
    priorities,
    onTaskClick
}: TaskBoardProps) {
    return (
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
    )
}

export default TaskBoard