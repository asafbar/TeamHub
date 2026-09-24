import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { useState, useRef, useEffect } from "react"
import {
    createTaskStatusAsync,
    reorderTaskStatusesAsync
} from "../../tasks/store/taskSlice"
import StatusRow from "./StatusRow"
import { DragDropProvider } from "@dnd-kit/react"
import styles from "./StatusManager.module.css"

type StatusManagerProps = {
    workspaceId: string
}

function StatusManager({
    workspaceId
}: StatusManagerProps) {

    const dispatch = useDispatch<AppDispatch>()
    const [newStatusName, setNewStatusName] = useState("")
    const [canScrollDown, setCanScrollDown] = useState(false)
    const statusListRef = useRef<HTMLDivElement>(null)

    const statuses = useSelector(
        (state: RootState) => state.tasks.statuses
    )

    function updateScrollIndicator() {
        const element = statusListRef.current

        if (!element) { return }

        const hasMoreContent = element.scrollTop + element.clientHeight < element.scrollHeight - 1

        setCanScrollDown(hasMoreContent)
    }

    async function handleCreateStatus() {
        const name = newStatusName.trim()
        if (!name) { return }

        await dispatch(
            createTaskStatusAsync({
                workspaceId,
                statusData: {
                    name
                }
            })
        ).unwrap()

        setNewStatusName("")
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
        ) {
            return
        }

        const reorderedStatuses = [...statuses]

        const [movedStatus] = reorderedStatuses.splice(sourceIndex, 1)

        reorderedStatuses.splice(
            targetIndex,
            0,
            movedStatus
        )

        const statusUpdates = reorderedStatuses.map(
            (status, index) => ({
                statusId: status.id,
                position: index
            })
        )

        await dispatch(
            reorderTaskStatusesAsync({
                workspaceId,
                reorderData: {
                    statusUpdates
                }
            })
        ).unwrap()
    }

    useEffect(() => {
        updateScrollIndicator()
    }, [statuses])

    return (
        <div className={styles.manager}>
            <div className={styles.createSection}>
                <input
                    type="text"
                    className={styles.nameInput}
                    value={newStatusName}
                    onChange={(event) => setNewStatusName(event.target.value)}
                    placeholder="New status name"
                />

                <button
                    type="button"
                    className={styles.addButton}
                    onClick={handleCreateStatus}
                    disabled={!newStatusName.trim()}
                >
                    Add Status
                </button>
            </div>
            <DragDropProvider onDragEnd={handleDragEnd}>
                <div
                    ref={statusListRef}
                    className={styles.statusList}
                    onScroll={updateScrollIndicator}
                >
                    {statuses.map((status) => (
                        <StatusRow
                            key={status.id}
                            workspaceId={workspaceId}
                            status={status}
                        />
                    ))}
                </div>
            </DragDropProvider>

            {canScrollDown && (
                <div
                    className={`${styles.scrollIndicator} ${canScrollDown ? styles.scrollIndicatorVisible : ""}`}
                    aria-hidden={!canScrollDown}
                >
                    More statuses below ↓
                </div>
            )}

        </div>
    )
}

export default StatusManager