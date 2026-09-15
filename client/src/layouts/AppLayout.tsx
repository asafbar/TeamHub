import type { ReactNode } from "react"
import { logoutUser } from "../features/auth/services/AuthService"
import { useDispatch } from "react-redux"
import { logout } from "../features/auth/store/authSlice"
import { useNavigate } from "react-router-dom"
import type { AppDispatch } from "../store/store"

type AppLayoutProps = {
    children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
    
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    
    function handleLogout() {
        logoutUser()
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div>
            <header>
                <h2>TeamHub</h2>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <main>
                {children}
            </main>
        </div>
    )
}

export default AppLayout