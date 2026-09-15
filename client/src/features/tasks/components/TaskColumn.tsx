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
}

function TaskColumn({
    status,
    tasks,
    priorities
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
                    />
                )
            })}
        </div>
    )
}

export default TaskColumn