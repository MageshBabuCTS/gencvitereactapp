import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
    const jwt = useAuthStore((state) => state.jwt);
    const _hasHydrated = useAuthStore((state) => state._hasHydrated);

    if (!_hasHydrated) {
        // Optionally, render a loading spinner or null while hydration is pending
        return null;
    }

    const isAuthenticated = !!jwt;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}