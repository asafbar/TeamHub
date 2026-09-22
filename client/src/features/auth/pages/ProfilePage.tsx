import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { use, useState } from "react"
import { getAvatarUrl } from "../../../utils/avatarUtils"
import AvatarPickerModal from "../components/AvatarPickerModal"
import { updateAvatarAsync } from "../store/authSlice"
import styles from "./ProfilePage.module.css"

function ProfilePage() {

    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch<AppDispatch>()

    const [selecetedAvatar, setSelectedAvatar] = useState(user?.
        avatar ?? null)
    const [isChangingAvatar, setIsChangingAvatar] = useState(false)

    if (!user) { return null }

    async function handleSaveAvatar() {
        if (!selecetedAvatar) { return }

        const result = await dispatch(updateAvatarAsync(selecetedAvatar))

        if (updateAvatarAsync.fulfilled.match(result)) {
            setIsChangingAvatar(false)
        }
    }

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Profile</h1>
            <p className={styles.subtitle}>Manage your profile and avatar</p>

            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    {user.avatar && (
                        <img
                            className={styles.avatar}
                            src={getAvatarUrl(user.avatar)}
                            alt={user.username}
                            width="120"
                            height="120"
                        />
                    )}

                    <div className={styles.identity}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    </div>

                </div>

                {!isChangingAvatar && (
                    <button
                        className={styles.changeAvatarButton}
                        type="button"
                        onClick={() => setIsChangingAvatar(true)}
                    >
                        Change Avatar
                    </button>
                )}

            </div>

            {isChangingAvatar && (
                <AvatarPickerModal
                    selectedAvatar={selecetedAvatar}
                    onSelect={setSelectedAvatar}
                    onCancel={() => {
                        setSelectedAvatar(user.avatar)
                        setIsChangingAvatar(false)
                    }}
                    onSave={handleSaveAvatar}
                />
            )}

        </main>
    )
}

export default ProfilePage