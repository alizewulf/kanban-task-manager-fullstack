import { Navigate, Outlet, useLocation } from "react-router"
import type { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { getAuthStorageState } from "../../features/auth/login/model/authStorage"

function AuthGuard() {
    const reduxIsAuth = useSelector((state:RootState) => state.auth.isAuth)
    const rememberedIsAuth = getAuthStorageState()
    const isAuth = reduxIsAuth || rememberedIsAuth
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