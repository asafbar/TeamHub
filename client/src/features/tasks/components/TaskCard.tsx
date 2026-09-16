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
        id: task.id ,
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

            <button
                ref={handleRef}
                type="button"
                aria-label="Drag task"
            >
                ☰
            </button>

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