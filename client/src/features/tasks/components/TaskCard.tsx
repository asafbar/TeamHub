import type { Task, TaskPriority } from "../types/TaskTypes"
import styles from "./TaskCard.module.css"

type TaskCardProps = {
    task: Task
    priority?: TaskPriority
    onClick: (task: Task) => void
}

function TaskCard({
    task,
    priority,
    onClick
}: TaskCardProps) {
    return (
        <div 
        className={styles.card}
        onClick={() => onClick(task)}
        >
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