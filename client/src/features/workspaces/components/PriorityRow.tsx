import type { TaskPriority } from "../../tasks/types/TaskTypes"
import styles from "./PriorityRow.module.css"
import {
    deleteTaskPriorityAsync,
    updateTaskPriorityAsync
} from "../../tasks/store/taskSlice"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../store/store"
import { useState } from "react"
import { useSortable } from "@dnd-kit/react/sortable"

type PriorityRowProps = {
    workspaceId: string
    priority: TaskPriority
    isEditing: boolean
    onEdit: () => void
    onCloseEdit: () => void
}

function PriorityRow({
    workspaceId,
    priority,
    isEditing,
    onEdit,
    onCloseEdit
}: PriorityRowProps) {

    const defaultColor = "#3b82f6"

    const dispatch = useDispatch<AppDispatch>()

    const { ref, handleRef } = useSortable({
        id: priority.id,
        index: priority.position
    })

    const [editingName, setEditingName] = useState(priority.name)
    const [editingColor, setEditingColor] = useState(priority.color ?? defaultColor)
    const [deleteError, setDeleteError] = useState<string | null>(null)

    function handleEdit() {
        setEditingName(priority.name)
        setEditingColor(priority.color ?? defaultColor)
        onEdit()
    }

    function handleCancel() {
        setEditingName(priority.name)
        setEditingColor(priority.color ?? defaultColor)
        onCloseEdit()
    }

    async function handleSave() {
        const name = editingName.trim()

        if (!name) { return }

        const result = await dispatch(
            updateTaskPriorityAsync({
                workspaceId,
                priorityId: priority.id,
                priorityData: {
                    name,
                    color: editingColor
                }
            })
        )

        if (updateTaskPriorityAsync.fulfilled.match(result)) {
            onCloseEdit()
        }
    }

    async function handleDelete() {
        setDeleteError(null)

        const result = await dispatch(
            deleteTaskPriorityAsync({
                workspaceId,
                priorityId: priority.id
            })
        )

        if (deleteTaskPriorityAsync.rejected.match(result)) {
            setDeleteError(
                result.payload ?? "Could not delete task priority."
            )

            window.setTimeout(() => {
                setDeleteError(null)
            }, 4000)
        }
    }

    return (
        <div
            ref={ref}
            className={styles.row}
        >

            <div className={styles.content}>
                <button
                ref={handleRef}
                    className={styles.dragHandle}
                    type="button"
                    aria-label="Drag priority"
                >
                    ⠿
                </button>

                {isEditing ? (
                    <>
                        <input
                            type="color"
                            className={styles.editColor}
                            value={editingColor}
                            onChange={(event) => setEditingColor(event.target.value)}
                            aria-label="Priority color"
                        />

                        <input
                            type="text"
                            className={styles.editInput}
                            value={editingName}
                            onChange={(event) => setEditingName(event.target.value)}
                        />

                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={`${styles.actionButton} ${styles.saveButton}`}
                                disabled={!editingName.trim()}
                                onClick={handleSave}
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className={styles.actionButton}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <span
                            className={styles.colorDot}
                            style={{ backgroundColor: priority.color ?? "transparent" }}
                        />

                        <span className={styles.name}>
                            {priority.name}
                        </span>

                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={styles.actionButton}
                                onClick={handleEdit}
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>

            {deleteError && (
                <p className={styles.error}>
                    {deleteError}
                </p>
            )}
        </div>
    )
}

export default PriorityRow