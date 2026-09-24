import { useEffect, type CSSProperties, type ReactNode } from "react"
import styles from "./WorkspaceModal.module.css"

type SettingsModalProps = {
    title: string
    description?: string
    children: ReactNode
    onClose: () => void
    height?: CSSProperties["height"]
}

function WorkspaceModal({
    title,
    description,
    children,
    onClose,
    height = "520px"
}: SettingsModalProps) {

    useEffect(() => {
        const previousOverflow = document.body.style.overflow

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    return (
        <div
            className={styles.overlay}
            onMouseDown={onClose}
        >
            <div
                className={styles.modal}
                style={{ height }}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <header className={styles.header}>
                    <div>
                        <h2 className={styles.title}>
                            {title}
                        </h2>

                        {description && (
                            <p className={styles.description}>
                                {description}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </header>

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default WorkspaceModal