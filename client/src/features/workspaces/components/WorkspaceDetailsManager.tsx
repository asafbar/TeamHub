import { useState, useRef, useEffect } from "react"
import styles from "./WorkspaceDetailsManager.module.css"
import { workspaceIcons } from "../../../assets/icons/workspaces/workspaceIcons"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { updateWorkspaceAsync } from "../store/workspaceSlice"

type WorkspaceDetailsManagerProps = {
    onClose: () => void
}

function WorkspaceDetailsManager({
    onClose
}: WorkspaceDetailsManagerProps) {

    const workspace = useSelector((state: RootState) => state.workspaces.selectedWorkspace)

    const loading = useSelector((state: RootState) => state.workspaces.loading)
    const error = useSelector((state: RootState) => state.workspaces.error)

    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState(workspace?.name ?? "")
    const [description, setDescription] = useState(workspace?.description ?? "")
    const [selectedColor, setSelectedColor] = useState(workspace?.color ?? "#3b82f6")
    const [selectedIcon, setSelectedIcon] = useState(workspace?.icon ?? "kanban")
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [canScrollDown, setCanScrollDown] = useState(false)

    function updateScrollIndicator() {
        const content = contentRef.current

        if (!content) { return }

        setCanScrollDown(content.scrollTop + content.clientHeight < content.scrollHeight - 1)
    }

    async function handleSave() {
        if (!workspace) { return }

        try {
            await dispatch(
                updateWorkspaceAsync({
                    workspaceId: workspace.id,
                    workspaceData: {
                        name,
                        description,
                        color: selectedColor,
                        icon: selectedIcon
                    }
                })
            ).unwrap()
        } catch {
            // The error is handled by the Redux state
        }

        onClose()
    }

    useEffect(() => {
        updateScrollIndicator()
    }, [])

    return (
        <div className={styles.manager}>


            <div
                ref={contentRef}
                className={styles.content}
                onScroll={updateScrollIndicator}
            >
                <div className={styles.field}>
                    <label htmlFor="workspace-name">Workspace Name</label>

                    <input
                        id="workspace-name"
                        type="text"
                        placeholder="Enter workspace name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="workspace-description">Description</label>

                    <textarea
                        id="workspace-description"
                        placeholder="Describe your workspace..."
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                </div>

                <section className={styles.appearance}>
                    <div>
                        <h3 className={styles.sectionTitle}>Appearance</h3>
                        <p className={styles.sectionDescription}>
                            Choose a color and icon for this workspace.
                        </p>
                    </div>

                    <div className={styles.field}>
                        <label>Workspace Color</label>

                        <div className={styles.colorOptions}>
                            <button
                                className={`${styles.colorOption} 
                            ${selectedColor === "#3b82f6" ? styles.colorOptionSelected : ""}`}
                                type="button"
                                style={{ backgroundColor: "#3b82f6" }}
                                aria-label="Blue"
                                onClick={() => setSelectedColor("#3b82f6")}
                            />

                            <button
                                className={`${styles.colorOption} 
                            ${selectedColor === "#8b5cf6" ? styles.colorOptionSelected : ""}`}
                                type="button"
                                style={{ backgroundColor: "#8b5cf6" }}
                                aria-label="Purple"
                                onClick={() => setSelectedColor("#8b5cf6")}
                            />

                            <button
                                className={`${styles.colorOption} 
                            ${selectedColor === "#ec4899" ? styles.colorOptionSelected : ""}`}
                                type="button"
                                style={{ backgroundColor: "#ec4899" }}
                                aria-label="Pink"
                                onClick={() => setSelectedColor("#ec4899")}
                            />

                            <button
                                className={`${styles.colorOption} 
                            ${selectedColor === "#ef4444" ? styles.colorOptionSelected : ""}`}
                                type="button"
                                style={{ backgroundColor: "#ef4444" }}
                                aria-label="Red"
                                onClick={() => setSelectedColor("#ef4444")}
                            />

                            <button
                                className={`${styles.colorOption} 
                            ${selectedColor === "#f59e0b" ? styles.colorOptionSelected : ""}`}
                                type="button"
                                style={{ backgroundColor: "#f59e0b" }}
                                aria-label="Orange"
                                onClick={() => setSelectedColor("#f59e0b")}
                            />

                            <button
                                className={`${styles.colorOption} 
                            ${selectedColor === "#10b981" ? styles.colorOptionSelected : ""}`}
                                type="button"
                                style={{ backgroundColor: "#10b981" }}
                                aria-label="Green"
                                onClick={() => setSelectedColor("#10b981")}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>Workspace Icon</label>

                        <div className={styles.iconOptions}>
                            {workspaceIcons.map((icon) => (
                                <button
                                    key={icon.id}
                                    className={`${styles.iconOption}
                            ${selectedIcon === icon.id
                                            ? styles.iconOptionSelected
                                            : ""
                                        }`}
                                    type="button"
                                    aria-label={icon.label}
                                    title={icon.label}
                                    onClick={() => setSelectedIcon(icon.id)}
                                >
                                    <img src={icon.src} alt="" />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div
                className={`${styles.scrollIndicator} ${canScrollDown ? styles.scrollIndicatorVisible : ""}`}
            >
                ↓
            </div>

            {error && (
                <p className={styles.errorMessage}>
                    {error}
                </p>
            )}

            <div className={styles.actions}>
                <button
                    className={styles.saveButton}
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    )
}

export default WorkspaceDetailsManager