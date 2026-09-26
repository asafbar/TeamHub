import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../../store/store"
import { useEffect, useState } from "react"
import { loadTaskBoardAsync } from "../../tasks/store/taskSlice"
import WorkspaceModal from "../components/WorkspaceModal"
import StatusManager from "../components/StatusManager"
import { loadWorkspaceAsync } from "../store/workspaceSlice"
import styles from "./WorkspaceSettingsPage.module.css"
import statusesIcon from "../../../assets/icons/statuses.svg"

function WorkspaceSettingsPage() {

    const { workspaceId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [showStatusManager, setShowStatusManager] = useState(false)

    const selectedWorkspace = useSelector(
        (state: RootState) => state.workspaces.selectedWorkspace
    )

    const statuses = useSelector(
        (state: RootState) => state.tasks.statuses
    )

    useEffect(() => {
        if (workspaceId) {
            dispatch(loadWorkspaceAsync(workspaceId))
            dispatch(loadTaskBoardAsync(workspaceId))
        }
    }, [dispatch, workspaceId])

    return (
        <main className={styles.page}>
            <nav
                className={styles.breadcrumbs}
                aria-label="Breadcrumb"
            >
                <button
                    className={styles.breadcrumbLink}
                    type="button"
                    onClick={() => navigate(`/workspaces/${workspaceId}`)}
                >
                    {selectedWorkspace?.name ?? "Workspace"}
                </button>

                <span className={styles.breadcrumbSeparator}>›</span>
                <span className={styles.breadcrumbCurrent}>Settings</span>
            </nav>

            <header className={styles.header}>
                <h1 className={styles.title}>Workspace Settings</h1>
                <p className={styles.subtitle}>
                    Manage statuses, priorities, members and workspace preferences.
                </p>
            </header>

            <section className={styles.settingsGrid}>
                <article className={styles.settingsCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardIcon}>
                            <img
                                className={styles.cardIconImage}
                                src={statusesIcon}
                                alt=""
                                aria-hidden="true"
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>Statuses</h2>
                            <p className={styles.cardDescription}>
                                Configure the workflow stages used on your task board.
                            </p>
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.cardCount}>
                            {statuses.length} statuses
                        </span>

                        <button
                            className={styles.manageButton}
                            type="button"
                            onClick={() => setShowStatusManager(true)}
                        >
                            Manage <span>›</span>
                        </button>
                    </div>
                </article>
            </section>

            {
                showStatusManager && workspaceId && (
                    <WorkspaceModal
                        title="Manage Statuses"
                        description="Add, edit, remove and reorder task statuses."
                        onClose={() => setShowStatusManager(false)}
                    >
                        <StatusManager workspaceId={workspaceId} />
                    </WorkspaceModal>

                )
            }
        </main >
    )
}

export default WorkspaceSettingsPage