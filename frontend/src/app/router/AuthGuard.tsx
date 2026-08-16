import { Navigate, Outlet, useLocation } from "react-router"
import type { RootState } from "../../store/store"
import { useSelector } from "react-redux"

function AuthGuard() {
    const isAuth = useSelector((state:RootState) => state.auth.isAuth)
    const location = useLocation()
    const publicRoutes:string[] = ["/login","/register"]

    if (isAuth && publicRoutes.includes(location.pathname)) {
        return <Navigate to="/app" replace/>
    }
    if (!isAuth && location.pathname === '/app') {
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}

export default AuthGuard