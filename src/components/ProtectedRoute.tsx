import { Navigate, Outlet } from "react-router";


export  default function ProtectedRoute() {
    const isAuthenticated  = !! localStorage.getItem('jwt');
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}