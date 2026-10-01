import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router"
import type { RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { setAuth, updateAuthUser } from "../../features/auth/login/model/authSlice"
import { api } from "../../shared/config/api/api.config"
import { apiClient } from "../../shared/config/api/apiClient"
import { clearAccessToken, getAccessToken } from "../../shared/config/api/accessToken"
import type { User } from "../../entities/users/interface"

function AuthGuard() {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const dispatch = useDispatch()
    const [hasVerifiedSession, setHasVerifiedSession] = useState(false)

    useEffect(() => {
        if (!isAuth) {
            return
        }

        const token = getAccessToken()
        if (!token) {
            dispatch(setAuth(false))
            return
        }

        let isActive = true
        const handleUnauthorized = () => dispatch(setAuth(false))
        window.addEventListener("auth:unauthorized", handleUnauthorized)

        apiClient.get<{ data: User }>(api.auth.me)
            .then(({ data }) => {
                if (isActive) {
                    dispatch(updateAuthUser(data.data))
                    setHasVerifiedSession(true)
                }
            })
            .catch(() => {
                if (isActive) {
                    clearAccessToken()
                    dispatch(setAuth(false))
                }
            })

        return () => {
            isActive = false
            window.removeEventListener("auth:unauthorized", handleUnauthorized)
        }
    }, [dispatch, isAuth])

    if (!isAuth) return <Navigate to="/login" replace />
    if (!hasVerifiedSession) {
        return <div className="p-8 text-center text-accent3-hover">Checking session...</div>
    }
    return <Outlet />
}

export default AuthGuard