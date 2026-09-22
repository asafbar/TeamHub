import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { useState } from "react"
import { getAvatarUrl } from "../../../utils/avatarUtils"
import AvatarPickerModal from "../components/AvatarPickerModal"
import { updateAvatarAsync } from "../store/authSlice"

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
        <>
            <h1>Profile</h1>
            <p>Manage your profile and avatar</p>

            {user.avatar && (
                <img
                    src={getAvatarUrl(user.avatar)}
                    alt={user.username}
                    width="120"
                    height="120"
                />
            )}

            <div>
                <p>
                    <strong>Username:</strong> {user.username}
                </p>

                <p>
                    <strong>Email:</strong> {user.email}
                </p>

                <p>
                    <strong>Avatar:</strong> {user.avatar ?? "Not selected"}
                </p>
            </div>

            {!isChangingAvatar && (
                <button
                    type="button"
                    onClick={() => setIsChangingAvatar(true)}
                >
                    Change Avatar
                </button>
            )}

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

        </>
    )
}

export default ProfilePage