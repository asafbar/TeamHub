import { useDispatch } from "react-redux"
import type { TaskStatus } from "../../tasks/types/TaskTypes"
import type { AppDispatch } from "../../../store/store"
import { useState } from "react"
import {
    updateTaskStatusAsync,
    deleteTaskStatusAsync
} from "../../tasks/store/taskSlice"
import { useSortable } from "@dnd-kit/react/sortable"
import styles from "./StatusRow.module.css"

type StatusRowProps = {
    workspaceId: string
    status: TaskStatus
}

function StatusRow({
    workspaceId,
    status
}: StatusRowProps) {

    const { ref, handleRef } = useSortable({
        id: status.id,
        index: status.position
    })

    const dispatch = useDispatch<AppDispatch>()
    const [isEditing, setIsEditing] = useState(false)
    const [editingName, setEditingName] = useState(status.name)
    const [deleteError, setDeleteError] = useState<string | null>(null)

    function handleStartEdit() {
        setEditingName(status.name)
        setIsEditing(true)
    }

    function handleCancelEdit() {
        setEditingName(status.name)
        setIsEditing(false)
    }

    async function handleSaveEdit() {
        const name = editingName.trim()

        if (!name) { return }

        await dispatch(
            updateTaskStatusAsync({
                workspaceId,
                statusId: status.id,
                statusData: {
                    name
                }
            })
        ).unwrap()

        setIsEditing(false)
    }

    async function handleToggleCompleted() {
        await dispatch(
            updateTaskStatusAsync({
                workspaceId,
                statusId: status.id,
                statusData: {
                    isCompleted: !status.isCompleted
                }
            })
        ).unwrap()
    }

    async function handleDeleteStatus() {
        setDeleteError(null)

        try {
            await dispatch(
                deleteTaskStatusAsync({
                    workspaceId,
                    statusId: status.id
                })
            ).unwrap()
        } catch (error) {
            const message = typeof error == "string" ? error : "Could not delete status."
            setDeleteError(message)

            window.setTimeout(()=> {
                setDeleteError(null)
            }, 4000)
        }
    }

    return (
        <div
            ref={ref}
            className={styles.row}
        >
            {isEditing ? (
                <div className={styles.content}>
                    <input
                        className={styles.editInput}
                        type="text"
                        value={editingName}
                        onChange={(event) => setEditingName(event.target.value)
                        }
                    />
                    <div className={styles.actions}>
                        <button
                            className={`${styles.actionButton} ${styles.saveButton}`}
                            type="button"
                            onClick={handleSaveEdit}
                            disabled={!editingName.trim()}
                        >
                            Save
                        </button>

                        <button
                            className={styles.actionButton}
                            type="button"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.content}>
                    <button
                        className={styles.dragHandle}
                        type="button"
                        ref={handleRef}
                        aria-label="Drag status"
                    >
                        ⠿
                    </button>

                    <span className={styles.statusName}>
                        {status.name}
                    </span>

                    <label className={styles.completedLabel}>
                        <input
                            className={styles.completedCheckbox}
                            type="checkbox"
                            checked={status.isCompleted}
                            onChange={handleToggleCompleted}
                        />
                        Completed
                    </label>

                    <div className={styles.actions}>
                        <button
                            className={styles.actionButton}
                            type="button"
                            onClick={handleStartEdit}
                        >
                            Edit
                        </button>

                        <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                            type="button"
                            onClick={handleDeleteStatus}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            {deleteError && (
                <p className={styles.error}>
                    {deleteError}
                    </p>
            )}
        </div>
    )
}

export default StatusRow