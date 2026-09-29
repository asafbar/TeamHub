import { useState, type SyntheticEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { registerAsync } from "../store/authSlice"
import styles from "./LoginForm.module.css"

type RegisterFormProps = {
    onRegistrationSuccess: () => void
}

function RegisterForm({
    onRegistrationSuccess
}: RegisterFormProps) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector(
        (state: RootState) => state.auth.loading
    )
    const error = useSelector(
        (state: RootState) => state.auth.error
    )

    async function handleSubmit(
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) {
        event.preventDefault()

        const result = await dispatch(
            registerAsync({
                username,
                email,
                password
            })
        )

        if (registerAsync.fulfilled.match(result)) {
            onRegistrationSuccess()
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
                    htmlFor="username"
                >
                    Username
                </label>

                <input
                    className={styles.input}
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="register-email"
                >
                    Email
                </label>

                <input
                    className={styles.input}
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="register-password"
                >
                    Password
                </label>

                <input
                    className={styles.input}
                    id="register-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>

            {error && (
                <p className={styles.error}>
                    {error}
                </p>
            )}

            <button
                className={styles.submitButton}
                type="submit"
                disabled={loading}
            >
                {loading ? "Creating Account..." : "Create Account"}
            </button>
        </form>
    )
}

export default RegisterForm