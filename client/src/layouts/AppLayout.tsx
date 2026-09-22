import type { ReactNode } from "react"
import { logoutUser } from "../features/auth/services/AuthService"
import { useDispatch } from "react-redux"
import { logout } from "../features/auth/store/authSlice"
import { useLocation, useNavigate } from "react-router-dom"
import type { AppDispatch } from "../store/store"
import "./AppLayout.css"

type AppLayoutProps = {
    children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logoutUser()
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div className="app-layout">

            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">👥</div>

                    <div>
                        <h2>TeamHub</h2>
                        <span>Work Together</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button className={`sidebar-nav-item ${
                        location.pathname === "/" ||
                        location.pathname.startsWith("/workspace")
                        ? "active"
                        :
                        ""
                    }`}
                        onClick={() => navigate("/")}>
                        Workspaces
                    </button>

                    <button className="sidebar-nav-item">
                        Notifications
                    </button>

                    <button className={`sidebar-nav-item ${
                        location.pathname === "/profile" ? "active" : ""
                    }`}
                        onClick={() => navigate("/profile")}>
                        Profile
                    </button>

                    <button className="sidebar-nav-item">
                        Settings
                    </button>
                </nav>

                <button
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </aside>

            <main className="app-content">
                {children}
            </main>

        </div>
    )
}

export default AppLayout