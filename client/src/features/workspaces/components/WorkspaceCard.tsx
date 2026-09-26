import { useNavigate } from "react-router-dom"
import type { Workspace } from "../types/WorkspaceTypes"
import styles from "./WorkspaceCard.module.css"

type WorkspaceCardProps = {
    workspace: Workspace
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(`/workspaces/${workspace.id}`)
    }

    return (
        <article
            className={styles.card}
            onClick={handleClick}
        >
            <div className={styles.icon}>
                {workspace.name.charAt(0).toUpperCase()}
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>
                    {workspace.name}
                </h2>

                <p className={styles.description}>
                    {workspace.description}
                </p>
            </div>

            <div className={styles.footer}>
                <span>Open workspace</span>
                <span aria-hidden="true">›</span>
            </div>

        </article>
    )
}

export default WorkspaceCard