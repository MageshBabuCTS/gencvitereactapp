import { Outlet, NavLink } from "react-router"; // Changed Link to NavLink
import { logout } from '../utils/auth';
import { useState } from "react";
import type { LayoutProps } from '../types/LayoutProps';

const CustomerLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`grid-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="grid-item sidebar">                
                <div className="hamburger" onClick={toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>                  
                <nav>
                    <ul className="nav-links">
                        <li><NavLink to="/home" className={({ isActive }) => isActive ? "active-nav-link" : ""} >Customer Home</NavLink></li>
                         <li><NavLink to="/products/:id " className={({ isActive }) => isActive ? "active-nav-link" : ""} >Product Detail page</NavLink></li>                          
                        <li> <button onClick={logout}>Logout</button></li>                   
                    </ul>
                </nav>
            </div>
            <div className="grid-item header">
                <h1>Customer Header</h1>
            </div>
            <div className="grid-item main-content">
                {/* Render children or fallback to Outlet */}
                {children ?? <Outlet />}
            </div>
            <div className="grid-item footer">
               Customer Footer
            </div>
        </div>
    );
}

export default CustomerLayout;