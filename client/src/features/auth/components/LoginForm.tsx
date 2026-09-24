import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store/store'
import { loginAsync } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import styles from "./LoginForm.module.css"

function LoginForm() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const {
        loading,
        error
    } = useSelector((state: RootState) => state.auth)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const result = await dispatch(
            loginAsync({
                email,
                password
            })
        )

        if (loginAsync.fulfilled.match(result)) {
            navigate("/")
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
                    htmlFor="email"
                >
                    Email
                </label>

                <input
                    className={styles.input}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Enter your email'
                    autoComplete='email'
                    required
                />
            </div>

            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="password"
                >
                    Password
                </label>

                <input
                    className={styles.input}
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Enter your password'
                    autoComplete='current-password'
                    required
                />
            </div>

            {error && (
                <p
                    className={styles.error}
                    role='alert'
                >
                    {error}
                </p>
            )}

            <button
                className={styles.submitButton}
                type='submit'
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

        </form>
    )
}

export default LoginForm