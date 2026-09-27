import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import styles from "./PriorityManager.module.css"
import PriorityRow from "./PriorityRow"
import { useEffect, useRef, useState } from "react"
import {
    createTaskPriorityAsync,
    reorderTaskPrioritiesAsync
} from "../../tasks/store/taskSlice"
import { DragDropProvider } from "@dnd-kit/react"

type PriorityManageProps = {
    workspaceId: string
}

function PriorityManager({ workspaceId }: PriorityManageProps) {

    const dispatch = useDispatch<AppDispatch>()

    const priorities = useSelector(
        (state: RootState) => state.tasks.priorities
    )

    const [newPriorityName, setNewPriorityName] = useState("")
    const [newPriorityColor, setNewPriorityColor] = useState("#3b82f6")
    const [editingPriorityId, setEditingPriorityId] = useState<string | null>(null)
    const priorityListRef = useRef<HTMLDivElement | null>(null)
    const [canScrollDown, setCanScrollDown] = useState(false)

    function updateScrollingIndicator() {
        const list = priorityListRef.current

        if (!list) {
            return
        }

        setCanScrollDown(
            list.scrollTop + list.clientHeight < list.scrollHeight - 1
        )
    }

    async function handleAddPriority() {
        const name = newPriorityName.trim()

        if (!name) { return }

        const result = await dispatch(
            createTaskPriorityAsync({
                workspaceId,
                priorityData: {
                    name,
                    color: newPriorityColor
                }
            })
        )

        if (createTaskPriorityAsync.fulfilled.match(result)) {
            setNewPriorityName("")
        }
    }

    async function handleDragEnd(event: any) {
        const { source } = event.operation

        if (!source) { return }

        const sourceIndex = source.initialIndex
        const targetIndex = source.index

        if (
            sourceIndex === targetIndex ||
            sourceIndex < 0 ||
            targetIndex < 0
        ) { return }

        const reorderedPriorities = [...priorities]

        const [movedPriority] = reorderedPriorities.splice(
            sourceIndex,
            1
        )

        reorderedPriorities.splice(
            targetIndex,
            0,
            movedPriority
        )

        const priorityUpdates = reorderedPriorities.map(
            (priority, index) => ({
                priorityId: priority.id,
                position: index
            })
        )

        await dispatch(
            reorderTaskPrioritiesAsync({
                workspaceId,
                reorderData: {
                    priorityUpdates
                }
            })
        ).unwrap()
    }

    useEffect(() => {
        updateScrollingIndicator()
    }, [priorities])

    return (
        <div className={styles.manager}>

            <div className={styles.createSection}>
                <input
                    type="text"
                    className={styles.nameInput}
                    value={newPriorityName}
                    onChange={(event) => setNewPriorityName(event.target.value)}
                    placeholder="New priority name"
                />

                <input
                    type="color"
                    className={styles.colorInput}
                    value={newPriorityColor}
                    onChange={(event) => setNewPriorityColor(event.target.value)}
                    placeholder="Priority color"
                />

                <button
                    type="button"
                    className={styles.addButton}
                    disabled={!newPriorityName.trim()}
                    onClick={handleAddPriority}
                >
                    Add Priority
                </button>
            </div>

            <DragDropProvider onDragEnd={handleDragEnd}>
                <div
                    ref={priorityListRef}
                    className={styles.priorityList}
                    onScroll={updateScrollingIndicator}
                >
                    {priorities.map((priority) => (
                        <PriorityRow
                            key={priority.id}
                            workspaceId={workspaceId}
                            priority={priority}
                            isEditing={editingPriorityId === priority.id}
                            onEdit={() => setEditingPriorityId(priority.id)}
                            onCloseEdit={() => setEditingPriorityId(null)}
                        />
                    ))}
                </div>
            </DragDropProvider>

            <div
                className={`${styles.scrollIndicator} ${canScrollDown ? styles.scrollIndicatorVisible : ""}`}
            >
                Scroll for more ↓
            </div>
        </div>
    )
}

export default PriorityManager