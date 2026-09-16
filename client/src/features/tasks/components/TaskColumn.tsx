import styles from "./TaskColumn.module.css"

import type {
    Task,
    TaskStatus,
    TaskPriority
} from "../types/TaskTypes"
import TaskCard from "./TaskCard"

type TaskColumnProps = {
    status: TaskStatus
    tasks: Task[]
    priorities: TaskPriority[]
    onTaskClick: (task: Task) => void
}

function TaskColumn({
    status,
    tasks,
    priorities,
    onTaskClick
}: TaskColumnProps) {
    return (
        <div className={styles.column}>
            <h2 className={styles.title}>{status.name}</h2>

            {tasks.map((task) => {

                const priority= priorities.find(
                    (priority) => priority.id === task.priorityId
                )

                return (
                    <TaskCard 
                        key={task.id}
                        task={task}
                        priority={priority}
                        onClick={onTaskClick}
                    />
                )
            })}
        </div>
    )
}

export default TaskColumn