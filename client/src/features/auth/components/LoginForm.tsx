import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store/store'

import { loginAsync } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const {
        loading,
        error,
        user,
        token
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>

                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div>
                <label htmlFor="password">Password</label>

                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <button type='submit' disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
                <p>{error}</p>
            )}

        </form>
    )
}

export default LoginForm