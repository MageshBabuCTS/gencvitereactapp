import { Navigate, Outlet, useLocation } from "react-router";
import AdminLayout from './AdminLayout';
import CustomerLayout from './CustomerLayout';
import DefaultLayout from './DefaultLayout';

export default function ProtectedRoute() {
    const user = JSON.parse(localStorage.getItem("user") as string);   
    const isAuthenticated = !!localStorage.getItem('jwt') && !!user?.role;
    const location = useLocation();
    
    if (!isAuthenticated) {
        console.log(location.pathname," ProtectedRoute: User not authenticated, redirecting to login.");
        return <Navigate to="/welcome" replace />;
    }
     console.log("ProtectedRoute user:", user.role);
    // Select layout based on user role
    const getLayout = () => {
        switch (user.role) {
            case 'Admin':
                return AdminLayout;
            case 'customer':
                return CustomerLayout;
            default:
                return DefaultLayout;
        }
    };

    const Layout = getLayout();
    
    return Layout ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Outlet />
    );
}