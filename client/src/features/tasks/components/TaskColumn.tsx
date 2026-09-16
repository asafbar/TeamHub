import styles from "./TaskColumn.module.css"
import { useDroppable } from "@dnd-kit/react"

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

    const {ref} = useDroppable({id: status.id})

    return (
        <div
        ref={ref} 
        className={styles.column}
        >
            <h2 className={styles.title}>{status.name}</h2>

            {tasks.map((task, index) => {

                const priority= priorities.find(
                    (priority) => priority.id === task.priorityId
                )

                return (
                    <TaskCard 
                        key={task.id}
                        task={task}
                        priority={priority}
                        index={index}
                        onClick={onTaskClick}
                    />
                )
            })}
        </div>
    )
}

export default TaskColumn