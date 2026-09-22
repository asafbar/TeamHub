import type { Task, TaskPriority } from "../types/TaskTypes"
import styles from "./TaskCard.module.css"
import { useSortable } from "@dnd-kit/react/sortable"
import type { WorkspaceMember } from "../../workspaces/types/WorkspaceTypes"
import { getAvatarUrl } from "../../../utils/avatarUtils"

type TaskCardProps = {
    task: Task
    priority?: TaskPriority
    assignee?: WorkspaceMember
    index: number
    onClick: (task: Task) => void
}

function TaskCard({
    task,
    priority,
    assignee,
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

            {(assignee || task.dueDate) && (
                <div className={styles.meta}>
                    {assignee && (
                        <div className={styles.assignee}>
                            <div className={styles.avatar}>
                                {assignee.user.avatar ? (
                                    <img src={getAvatarUrl(assignee.user.avatar)}
                                        alt={assignee.user.username}
                                    />
                                ) : (
                                    <span>
                                        {assignee.user.username.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <span className={styles.assigneeName}>
                                {assignee.user.username}
                            </span>
                        </div>
                    )}

                    {task.dueDate && (
                        <div className={styles.dueDate}>
                            <span className={styles.calendarIcon}>▣</span>
                            {new Date(task.dueDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short"
                            })}
                        </div>
                    )}
                </div>
            )}
        </div >
    )
}

export default TaskCard