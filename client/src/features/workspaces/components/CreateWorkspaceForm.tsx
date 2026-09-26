import { useState, type SyntheticEvent } from "react"
import { useDispatch } from "react-redux"
import { createWorkspaceAsync } from "../store/workspaceSlice"
import type { AppDispatch } from "../../../store/store"
import styles from "./CreateWorkspaceForm.module.css"

type CreateWorkspaceFormProps = {
    onCancel: () => void
    onCreated: () => void
}

function CreateWorkspaceForm({
    onCancel,
    onCreated
}: CreateWorkspaceFormProps) {

    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(
        event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) {
        event.preventDefault()

        const trimmedName = name.trim()
        const trimmedDescription = description.trim()

        if (!trimmedName) {
            setError("Workspace name is required.")
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            await dispatch(
                createWorkspaceAsync({
                    name: trimmedName,
                    description: trimmedDescription || undefined
                })
            ).unwrap()

            onCreated()
        } catch (error) {
            setError("Could not create workspace.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="workspace-name"
                >
                    Workspace name
                </label>

                <input
                    id="workspace-name"
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. iOS Team"
                    disabled={isSubmitting}
                    required
                    autoFocus
                />
            </div>

            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="workspace-description"
                >
                    Description
                </label>

                <textarea
                    id="workspace-description"
                    className={styles.textarea}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What will your team work on?"
                    disabled={isSubmitting}
                    rows={4}
                />
            </div>

            {error && (
                <p className={styles.error}>
                    {error}
                </p>
            )}

            <div className={styles.actions}>
                <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>

                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Creating..."
                        : "Create Workspace"}
                </button>
            </div>
        </form>
    )
}

export default CreateWorkspaceForm