import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
    //When you call useAuthStore as a hook within your component, you are essentially "subscribing" that component to the store.
    const jwt = useAuthStore((state) => state.jwt);
    const isAuthenticated = !!jwt;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}