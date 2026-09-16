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
                        position: Date.now()
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
                    dueDate: dueDate || null,
                    position: Date.now()
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                ></textarea>
            </div>

            <div>
                <label>Status</label>
                <select
                    value={statusId}
                    onChange={(event) => setStatusId(event.target.value)}
                >
                    {statuses
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((status) => (
                            <option
                                key={status.id}
                                value={status.id}
                            >
                                {status.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label>Priority</label>
                <select
                    value={priorityId}
                    onChange={(event) => setPriorityId(event.target.value)}
                >
                    {priorities
                        .slice()
                        .sort((a, b) => a.position - b.position)
                        .map((priority) => (
                            <option
                                key={priority.id}
                                value={priority.id}
                            >
                                {priority.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <label>
                Assignee
                <select
                    value={assigneeMembershipId}
                    onChange={(event) => setAssigneeMembershipId(event.target.value)}
                >
                    <option value="">
                        Unassigned
                    </option>

                    {members.map((member) => (
                        <option
                            key={member.id}
                            value={member.id}
                        >
                            {member.user.username}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Due Date
                <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />
            </label>

            <button type="submit">
                {task ? "Save Changes" : "Create Task"}
            </button>

            <button
                type="button"
                onClick={onCancel}
            >
                Cancel
            </button>

            {task && (
                <button
                    type="button"
                    onClick={handleDelete}
                >
                    Delete Task
                </button>
            )
            }

        </form>
    )
}

export default TaskForm