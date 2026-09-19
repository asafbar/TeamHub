import { useDispatch } from "react-redux"
import type {
    Task,
    TaskStatus,
    TaskPriority
} from "../types/TaskTypes"
import type { AppDispatch } from "../../../store/store"
import React, { useState } from "react"
import {
    createTaskAsync,
    updateTaskAsync,
    deleteTaskAsync
} from "../store/taskSlice"
import type { WorkspaceMember } from "../../workspaces/types/WorkspaceTypes"
import styles from './TaskForm.module.css'

type TaskFormProps = {
    workspaceId: string
    statuses: TaskStatus[]
    priorities: TaskPriority[]
    members: WorkspaceMember[]
    task?: Task
    onCancel: () => void
    onCreated: () => void
    onDelete?: () => void
}

function TaskForm({
    workspaceId,
    statuses,
    priorities,
    members,
    task,
    onCancel,
    onCreated,
    onDelete
}: TaskFormProps) {

    const dispatch = useDispatch<AppDispatch>()

    const [title, setTitle] = useState(task?.title ?? "")
    const [description, setDescription] = useState(task?.description ?? "")
    const [statusId, setStatusId] = useState(task?.statusId ?? statuses[0]?.id ?? "")
    const [priorityId, setPriorityId] = useState(task?.priorityId ?? priorities[0]?.id ?? "")
    const [assigneeMembershipId, setAssigneeMembershipId] = useState(task?.assigneeMembershipId ?? "")
    const [dueDate, setDueDate] = useState(task?.dueDate?.slice(0, 10) ?? "")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!title.trim() || !statusId || !priorityId) {
            return
        }

        //on update task case
        if (task) {
            const result = await dispatch(
                updateTaskAsync({
                    workspaceId,
                    taskId: task.id,
                    taskData: {
                        title: title.trim(),
                        description: description.trim(),
                        statusId,
                        priorityId,
                        assigneeMembershipId: assigneeMembershipId || null,
                        dueDate: dueDate || null,
                    }
                })
            )

            if (updateTaskAsync.fulfilled.match(result)) {
                onCreated()
            }

            return
        }

        //on new task case
        const result = await dispatch(
            createTaskAsync({
                workspaceId,
                taskData: {
                    title: title.trim(),
                    description: description.trim(),
                    statusId,
                    priorityId,
                    assigneeMembershipId: assigneeMembershipId || null,
                    dueDate: dueDate || null
                }
            })
        )

        if (createTaskAsync.fulfilled.match(result)) {
            onCreated()
        }
    }

    async function handleDelete() {
        if (!task) { return }

        const confirmed = window.confirm(`Delete "${task.title}"`)

        if (!confirmed) { return }

        const result = await dispatch(
            deleteTaskAsync({
                workspaceId,
                taskId: task.id
            })
        )

        if (deleteTaskAsync.fulfilled.match(result)) {
            onDelete?.()
        }
    }

    return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
            <div>
                <h2 className={styles.title}>
                    {task ? "Edit Task" : "New Task"}
                </h2>

                <p className={styles.subtitle}>
                    {task
                        ? "Update the task details below."
                        : "Add a new task to your workspace."}
                </p>
            </div>

            <button
                type="button"
                className={styles.closeButton}
                onClick={onCancel}
                aria-label="Close"
            >
                ×
            </button>
        </div>

        <div className={styles.field}>
            <label htmlFor="task-title">Title</label>
            <input
                id="task-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter task title"
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="task-description">Description</label>
            <textarea
                id="task-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add a description..."
            />
        </div>

        <div className={styles.fieldRow}>
            <div className={styles.field}>
                <label htmlFor="task-status">Status</label>
                <select
                    id="task-status"
                    value={statusId}
                    onChange={(event) => setStatusId(event.target.value)}
                >
                    {statuses
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="task-priority">Priority</label>
                <select
                    id="task-priority"
                    value={priorityId}
                    onChange={(event) => setPriorityId(event.target.value)}
                >
                    {priorities
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((priority) => (
                            <option key={priority.id} value={priority.id}>
                                {priority.name}
                            </option>
                        ))}
                </select>
            </div>
        </div>

        <div className={styles.fieldRow}>
            <div className={styles.field}>
                <label htmlFor="task-assignee">Assignee</label>
                <select
                    id="task-assignee"
                    value={assigneeMembershipId}
                    onChange={(event) => setAssigneeMembershipId(event.target.value)}
                >
                    <option value="">Unassigned</option>

                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.user.username}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="task-due-date">Due Date</label>
                <input
                    id="task-due-date"
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />
            </div>
        </div>

        <div className={styles.actions}>
            <div>
                {task && (
                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={handleDelete}
                    >
                        Delete Task
                    </button>
                )}
            </div>

            <div className={styles.mainActions}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    {task ? "Save Changes" : "Create Task"}
                </button>
            </div>
        </div>
    </form>
)
}

export default TaskForm