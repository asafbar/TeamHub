import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Navigate, replace } from "react-router-dom"


type ProtectedRouteProps = {
    children: ReactNode
}

function ProtectedRoute({children}: ProtectedRouteProps) {
    const token = useSelector(
        (state: RootState) => state.auth.token
    )

    if(!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute