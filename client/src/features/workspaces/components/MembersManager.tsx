import styles from "./MembersManager.module.css"
import { useEffect, useState, type SyntheticEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import {
    loadWorkspaceMembersAsync,
    addWorkspaceMemberAsync
} from "../store/workspaceSlice"
import { getAvatarUrl } from "../../../utils/avatarUtils"

type MembersManagerProps = {
    workspaceId: string
}

function MembersManager({
    workspaceId
}: MembersManagerProps) {

    const dispatch = useDispatch<AppDispatch>()

    const [email, setEmail] = useState("")
    const [role, setRole] = useState("member")
    const [isAdding, setIsAdding] = useState(false)
    const [addError, setAddError] = useState<string | null>(null)

    const members = useSelector(
        (state: RootState) => state.workspaces.members
    )

    useEffect(() => {
        dispatch(loadWorkspaceMembersAsync(workspaceId))
    }, [dispatch, workspaceId])

    async function handleAddMember(
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) {
        event.preventDefault()

        const trimmedEmail = email.trim()

        if (!trimmedEmail || isAdding) {
            return
        }

        try {
            setIsAdding(true)
            setAddError(null)

            await dispatch(
                addWorkspaceMemberAsync({
                    workspaceId,
                    memberData: {
                        email: trimmedEmail,
                        role
                    }
                })
            ).unwrap()

            setEmail("")
            setRole("member")
        } catch (error) {
            setAddError(
                typeof error === "string"
                    ? error
                    : "Could not add workspace member."
            )
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className={styles.manager}>
            <section className={styles.addSection}>
                <div>
                    <h3 className={styles.sectionTitle}>
                        Add Member
                    </h3>

                    <p className={styles.sectionDescription}>
                        Add an existing TeamHub user to this workspace.
                    </p>
                </div>

                <form
                    className={styles.addForm}
                    onSubmit={handleAddMember}
                >
                    <input
                        className={styles.emailInput}
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isAdding}
                    />

                    <select
                        className={styles.roleSelect}
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        disabled={isAdding}
                    >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        className={styles.addButton}
                        type="submit"
                        disabled={isAdding || !email.trim()}
                    >
                        {isAdding ? "Adding..." : "Add Member"}
                    </button>
                </form>

                {addError && (
                    <p className={styles.addError}>
                        {addError}
                    </p>
                )}
            </section>

            <section className={styles.membersSection}>
                <div className={styles.membersHeader}>
                    <h3 className={styles.sectionTitle}>
                        Workspace Members
                    </h3>

                    <span className={styles.memberCount}>
                        {members.length} {members.length === 1 ? "member" : "members"}
                    </span>
                </div>

                {members.map((member) => {
                    const avatarUrl = member.user.avatar
                        ? getAvatarUrl(member.user.avatar)
                        : undefined

                    return (
                        <div
                            className={styles.memberRow}
                            key={member.id}
                        >
                            <div className={styles.memberIdentity}>
                                {avatarUrl ? (
                                    <img
                                        className={styles.memberAvatar}
                                        src={avatarUrl}
                                        alt=""
                                    />
                                ) : (
                                    <div className={styles.avatarFallback}>
                                        {member.user.username.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div className={styles.memberDetails}>
                                    <strong className={styles.memberName}>
                                        {member.user.username}
                                    </strong>

                                    <span className={styles.memberEmail}>
                                        {member.user.email}
                                    </span>
                                </div>
                            </div>

                            <span className={styles.roleBadge}>
                                {member.role}
                            </span>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export default MembersManager