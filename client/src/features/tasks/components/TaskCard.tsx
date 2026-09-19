import type { Task, TaskPriority } from "../types/TaskTypes"
import styles from "./TaskCard.module.css"
import { useSortable } from "@dnd-kit/react/sortable"

type TaskCardProps = {
    task: Task
    priority?: TaskPriority
    index: number
    onClick: (task: Task) => void
}

function TaskCard({
    task,
    priority,
    index,
    onClick
}: TaskCardProps) {

    const { ref, handleRef } = useSortable({
        id: task.id,
        index,
        group: task.statusId,
        type: "task",
        accept: "task"
    })

    return (
        <div
            ref={ref}
            className={styles.card}
            onClick={() => onClick(task)}
        >
            <div
                ref={handleRef}
                className={styles.dragHeader}
                aria-label="Drag task"
            >
                <h3 className={styles.title}>
                    {task.title}
                </h3>

                <span className={styles.dragIndicator}>
                    ⋮⋮
                </span>
            </div>

            <p className={styles.description}>
                {task.description}
            </p>

            {priority && (
                <span
                    className={styles.priority}
                    style={{
                        borderColor: priority.color ?? "#64748b",
                        color: priority.color ?? "#94a3b8"
                    }}
                >
                    <span
                        className={styles.priorityDot}
                        style={{
                            backgroundColor: priority.color ?? "#64748b"
                        }}
                    />
                    {priority.name}
                </span>
            )}
        </div >
    )
}

export default TaskCard