import { getAvatarOptions } from "../../../utils/avatarUtils"
import styles from "./AvatarPickerModal.module.css"

type AvatarPickerModalProps = {
    selectedAvatar: string | null
    onSelect: (avatar: string) => void
    onCancel: () => void
    onSave: () => void
}

function AvatarPickerModal({
    selectedAvatar,
    onSelect,
    onCancel,
    onSave
}: AvatarPickerModalProps) {

    const avatars = getAvatarOptions()

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.header}>
                    <h2>Choose your avatar</h2>

                    <button
                        className={styles.closeButton}
                        type="button"
                        onClick={onCancel}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.avatarGrid}>
                    {avatars.map((avatar) => (
                        <button
                            key={avatar.name}
                            type="button"
                            onClick={() => onSelect(avatar.name)}
                            className={`
                                ${styles.avatarOption} ${selectedAvatar === avatar.name ? styles.selected : ""} 
                                `}
                        >
                            <img
                                src={avatar.url}
                                alt={avatar.name}
                            />
                        </button>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.saveButton}
                        type="button"
                        onClick={onSave}
                        disabled={!selectedAvatar}
                    >
                        Save
                    </button>

                </div>

            </div>
        </div>
    )
}

export default AvatarPickerModal