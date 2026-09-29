import { useNavigate } from "react-router-dom"
import type { Workspace } from "../types/WorkspaceTypes"
import styles from "./WorkspaceCard.module.css"
import { workspaceIcons } from "../../../assets/icons/workspaces/workspaceIcons"

type WorkspaceCardProps = {
    workspace: Workspace
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {

    const navigate = useNavigate()

    const workspaceIcon = workspaceIcons.find(
        (icon) => icon.id === workspace.icon
    )

    function handleClick() {
        navigate(`/workspaces/${workspace.id}`)
    }

    return (
        <article
            className={styles.card}
            onClick={handleClick}
        >
            <div
                className={styles.icon}
                style={{
                    color: workspace.color,
                    backgroundColor: `color-mix(in srgb, ${workspace.color} 12%, transparent)`
                }}
            >
                {workspaceIcon && (
                    <span
                        className={styles.iconImage}
                        style={{
                            backgroundColor: workspace.color,
                            mask: `url("${workspaceIcon.src}") center / contain no-repeat`,
                            WebkitMask: `url("${workspaceIcon.src}") center / contain no-repeat`
                        }}
                        aria-hidden="true"
                    >

                    </span>
                )}
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