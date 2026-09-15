import type { Task, TaskPriority } from "../types/TaskTypes"
import styles from "./TaskCard.module.css"

type TaskCardProps = {
    task: Task
    priority?: TaskPriority
}

function TaskCard({ task, priority }: TaskCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>
                {task.title}
            </h3>

            <p className={styles.description}>
                {task.description}
            </p>

            {priority && (
                <p className={styles.priority}>
                    Priority: {priority.name}
                    </p>
            )}
        </div>
    )
}

export default TaskCard