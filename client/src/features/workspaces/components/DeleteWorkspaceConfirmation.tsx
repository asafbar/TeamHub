import styles from "./DeleteWorkspaceConfirmation.module.css"

type DeleteWorkspaceConfirmationProps = {
    workspaceName: string
    deleting: boolean
    onCancel: () => void
    onDelete: () => void
}

function DeleteWorkspaceConfirmation({
    workspaceName,
    deleting,
    onCancel,
    onDelete
}: DeleteWorkspaceConfirmationProps) {
    return (
        <div className={styles.confirmation}>
            <div className={styles.warning}>
                <p className={styles.warningTitle}>
                    Are you sure you want to delete{" "}
                    <strong>{workspaceName}</strong>
                </p>

                <p className={styles.warningText}>
                    Tasks, statuses, priorities and workspace memberships
                    will be permanently deleted.
                </p>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={onCancel}
                    disabled={deleting}
                >
                    Cancel
                </button>

                <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={onDelete}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete Workspace"}
                </button>
            </div>
        </div>
    )
}

export default DeleteWorkspaceConfirmation