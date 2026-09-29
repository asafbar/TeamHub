import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../../store/store"
import { useEffect, useState } from "react"
import { loadTaskBoardAsync } from "../../tasks/store/taskSlice"
import WorkspaceModal from "../components/WorkspaceModal"
import StatusManager from "../components/StatusManager"
import {
    loadWorkspaceAsync,
    deleteWorkspaceAsync
} from "../store/workspaceSlice"
import styles from "./WorkspaceSettingsPage.module.css"
import statusesIcon from "../../../assets/icons/statuses.svg"
import priorityIcon from "../../../assets/icons/priorities.svg"
import settingsIcon from "../../../assets/icons/settings.svg"
import trashIcon from "../../../assets/icons/trash.svg"
import membersIcon from "../../../assets/icons/members.svg"
import PriorityManager from "../components/PriorityManager"
import WorkspaceDetailsManager from "../components/WorkspaceDetailsManager"
import DeleteWorkspaceConfirmation from "../components/DeleteWorkspaceConfirmation"

function WorkspaceSettingsPage() {

    const { workspaceId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [showStatusManager, setShowStatusManager] = useState(false)
    const [showPriorityManager, setShowPriorityManager] = useState(false)
    const [showWorkspaceDetails, setShowWorkspaceDetails] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const selectedWorkspace = useSelector(
        (state: RootState) => state.workspaces.selectedWorkspace
    )

    const statuses = useSelector(
        (state: RootState) => state.tasks.statuses
    )
    const priorities = useSelector(
        (state: RootState) => state.tasks.priorities
    )

    async function handleDeleteWorkspace() {
        if (!workspaceId || isDeleting) { return }

        try {
            setIsDeleting(true)

            await dispatch(deleteWorkspaceAsync(workspaceId)).unwrap()

            navigate("/")
        } catch (error) {
            setIsDeleting(false)
        }
    }

    function handleCloseDeleteConfirmation() {
        if (isDeleting) { return }

        setShowDeleteConfirmation(false)
    }

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

                <article className={styles.settingsCard}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.cardIcon} ${styles.priorityCardIcon}`}>
                            <img
                                className={styles.cardIconImage}
                                src={priorityIcon}
                                alt=""
                                aria-hidden="true"
                            />
                        </div>

                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>Priorities</h2>
                            <p className={styles.cardDescription}>
                                Configure task priorities and their colors.
                            </p>
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.cardCount}>
                            {priorities.length} priorities
                        </span>

                        <button
                            className={styles.manageButton}
                            type="button"
                            onClick={() => setShowPriorityManager(true)}
                        >
                            Manage <span>›</span>
                        </button>
                    </div>
                </article>

                <article className={styles.settingsCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardIcon}>
                            <img
                                className={styles.cardIconImage}
                                src={settingsIcon}
                                alt=""
                            />
                        </div>

                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>
                                Workspace Details
                            </h2>

                            <p className={styles.cardDescription}>
                                Manage workspace name, description and appearance.
                            </p>
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.cardCount}>
                            General Settings
                        </span>

                        <button
                            className={styles.manageButton}
                            type="button"
                            onClick={() => setShowWorkspaceDetails(true)}
                        >
                            Manage <span>›</span>
                        </button>
                    </div>
                </article>

                <article className={`${styles.settingsCard} ${styles.dangerCard}`}>
                    <div className={styles.cardHeader}>
                        <div
                            className={`${styles.cardIcon} ${styles.dangerCardIcon}`}
                        >
                            <img
                                className={styles.cardIconImage}
                                src={trashIcon}
                                alt=""
                            />
                        </div>

                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>
                                Danger Zone
                            </h2>
                            <p className={styles.cardDescription}>
                                Permanently delete this workspace and all of its data.
                            </p>
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.cardCount}>
                            Permanent action
                        </span>

                        <button
                            className={`${styles.manageButton} ${styles.deleteButton}`}
                            type="button"
                            onClick={() => setShowDeleteConfirmation(true)}
                        >
                            Delete Workspace
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

            {showPriorityManager && workspaceId && (
                <WorkspaceModal
                    title="Manage Priorities"
                    description="Create, edit, reorder and customize task priorities."
                    onClose={() => setShowPriorityManager(false)}
                >
                    <PriorityManager
                        workspaceId={workspaceId}
                    />
                </WorkspaceModal>
            )}

            {showWorkspaceDetails && (
                <WorkspaceModal
                    title="Workspace Details"
                    description="Manage workspace information and appearance."
                    onClose={() => setShowWorkspaceDetails(false)}
                >
                    <WorkspaceDetailsManager
                        onClose={() => setShowWorkspaceDetails(false)}
                    />
                </WorkspaceModal>
            )}

            {showDeleteConfirmation && (
                <WorkspaceModal
                    title="Delete Workspace"
                    description="This action permanently deletes the workspace and all of its data."
                    onClose={handleCloseDeleteConfirmation}
                    height="auto"
                >
                    <DeleteWorkspaceConfirmation
                        workspaceName={selectedWorkspace?.name ?? "this workspace"}
                        deleting={isDeleting}
                        onCancel={handleCloseDeleteConfirmation}
                        onDelete={handleDeleteWorkspace}
                    />
                </WorkspaceModal>
            )}
        </main >
    )
}

export default WorkspaceSettingsPage