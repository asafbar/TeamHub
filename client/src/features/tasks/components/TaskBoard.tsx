import type { Task, TaskPriority, TaskStatus } from "../types/TaskTypes"
import styles from "./TaskBoard.module.css"
import TaskColumn from "./TaskColumn"
import { DragDropProvider } from "@dnd-kit/react"
import { Feedback } from "@dnd-kit/dom"
import { isSortable } from "@dnd-kit/react/sortable"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../store/store"
import { useEffect, useState, useRef } from "react"
import type { WorkspaceMember } from "../../workspaces/types/WorkspaceTypes"
import {
    reorderTasksAsync
} from "../store/taskSlice"

type TaskBoardProps = {
    workspaceId: string
    tasks: Task[]
    statuses: TaskStatus[]
    priorities: TaskPriority[]
    members: WorkspaceMember[]
    onTaskClick: (task: Task) => void
}
function TaskBoard({
    workspaceId,
    tasks,
    statuses,
    priorities,
    members,
    onTaskClick
}: TaskBoardProps) {

    const dispatch = useDispatch<AppDispatch>()

    const [boardTasks, setBoardTasks] = useState<Task[]>(tasks)

    const draggedElementRef = useRef<HTMLElement | null>(null)
    const originalParentRef = useRef<HTMLElement | null>(null)
    const originalNextSiblingRef = useRef<Node | null>(null)

    function handleDragStart(event: any) {
        const source = event.operation.source
        const element = source?.element

        if (!element) { return }

        draggedElementRef.current = element
        originalParentRef.current = element.parentElement
        originalNextSiblingRef.current = element.nextSibling
    }

    function handleDragEnd(event: any) {

        //Get the dragged task data after the drag operation ends.
        const source = event.operation.source

        if (!source) { return }

        // Restore the dragged DOM element before React updates the board state.
        const draggedElement = draggedElementRef.current
        const originalParent = originalParentRef.current
        const originalNextSibling = originalNextSiblingRef.current

        if (
            draggedElement &&
            originalParent &&
            draggedElement.parentElement !== originalParent
        ) {
            if (
                originalNextSibling &&
                originalNextSibling.parentNode === originalParent
            ) {
                originalParent.insertBefore(
                    draggedElement,
                    originalNextSibling
                )
            } else {
                originalParent.appendChild(draggedElement)
            }
        }

        //Drag information: task, old/new status and old/new position.
        const taskId = String(source.id)
        const initialStatusId = String(source.initialGroup)
        const initialIndex = source.initialIndex

        const target = event.operation.target

        let currentStatusId = String(source.group)
        let currentIndex = source.index

        // A plain droppable target represents a column, including an empty one.
        if (target && !isSortable(target)) {
            currentStatusId = String(target.id)

            currentIndex = boardTasks.filter(
                (task) => task.statusId === currentStatusId
            ).length
        }

        // The task did not actually change position.
        if (initialStatusId === currentStatusId &&
            initialIndex === currentIndex) {
            return
        }

        // Get only tasks from this status, ordered by their saved position.
        const sourceTasks = boardTasks
            .filter((task) => task.statusId === initialStatusId)
            .sort((a, b) => a.position - b.position)

        // Handle reorder inside the same status
        if (initialStatusId === currentStatusId) {

            // Copy the array so we don't modify the original Redux data.
            const reorderedTasks = [...sourceTasks]

            // Find the dragged task in the ordered list.
            const taskIndex = reorderedTasks.findIndex(
                (task) => task.id === taskId
            )

            if (taskIndex === -1) { return }

            //Remove the dragged task from its old position.
            // Example: [A, B, C] -> move A => [B, C]
            const [movedTask] = reorderedTasks.splice(taskIndex, 1)

            //Insert it into its new position.
            // Example: [B, C] => insert A at index 2 => [B, C, A]
            reorderedTasks.splice(
                currentIndex,
                0,
                movedTask
            )

            // Build the updated task positions for the backend.
            const taskUpdates = reorderedTasks.map((task, index) => ({
                taskId: task.id,
                statusId: currentStatusId,
                position: index
            }))

            setBoardTasks((currentTasks) => [
                ...currentTasks.filter(
                    (task) => task.statusId !== currentStatusId
                ),
                ...reorderedTasks.map((task, index) => ({
                    ...task,
                    position: index
                }))
            ])

            // Save the new order in the server/database
            dispatch(
                reorderTasksAsync({
                    workspaceId,
                    reorderData: {
                        taskUpdates
                    }
                })
            )
            draggedElementRef.current = null
            originalParentRef.current = null
            originalNextSiblingRef.current = null

            return
        }

        // Get tasks from the destination column, ordered by their saved position.
        const destinationTasks = boardTasks
            .filter((task) => task.statusId === currentStatusId)
            .sort((a, b) => a.position - b.position)

        // Find the dragged task in the source column.
        const movedTask = sourceTasks.find((task) => task.id === taskId)

        if (!movedTask) { return }

        // Remove the dragged task from the source column.
        const updatedSourceTasks = sourceTasks.filter((task) => task.id !== taskId)

        // Copy the destination column before changing its order.
        const updatedDestinationTasks = [...destinationTasks]

        //Insert the dragged task into its new position.
        updatedDestinationTasks.splice(
            currentIndex,
            0,
            movedTask
        )

        setBoardTasks((currentTasks) => [
            ...currentTasks.filter(
                (task) =>
                    task.statusId !== initialStatusId &&
                    task.statusId !== currentStatusId
            ),

            ...updatedSourceTasks.map((task, index) => ({
                ...task,
                statusId: initialStatusId,
                position: index
            })),

            ...updatedDestinationTasks.map((task, index) => ({
                ...task,
                statusId: currentStatusId,
                position: index
            }))
        ])

        //Build the new position for both affected columns.
        const taskUpdates = [
            ...updatedSourceTasks.map((task, index) => ({
                taskId: task.id,
                statusId: initialStatusId,
                position: index
            })),

            ...updatedDestinationTasks.map((task, index) => ({
                taskId: task.id,
                statusId: currentStatusId,
                position: index
            }))
        ]

        // Save both columns in one request
        dispatch(
            reorderTasksAsync({
                workspaceId,
                reorderData: {
                    taskUpdates
                }
            })
        )
        draggedElementRef.current = null
        originalParentRef.current = null
        originalNextSiblingRef.current = null

        return
    }

    useEffect(() => {
        setBoardTasks(tasks)
    }, [tasks])

    return (
        <DragDropProvider
            plugins={(defaults) =>
                defaults.map((plugin) =>
                    plugin === Feedback
                        ? Feedback.configure({
                            dropAnimation: null
                        })
                        : plugin
                )
            }
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={styles.board}>
                {statuses
                    .slice()
                    .sort((a, b) => a.position - b.position)
                    .map((status) => {
                        const statusTasks = boardTasks
                            .filter((task) => task.statusId === status.id)
                            .sort((a, b) => a.position - b.position)

                        return (
                            <TaskColumn
                                key={status.id}
                                status={status}
                                tasks={statusTasks}
                                priorities={priorities}
                                members={members}
                                onTaskClick={onTaskClick}
                            />
                        )
                    })
                }
            </div>
        </DragDropProvider>
    )
}

export default TaskBoard