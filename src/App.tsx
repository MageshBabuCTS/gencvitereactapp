import { Routes, Route, Navigate } from "react-router";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetailPage from "./components/ProductDetailPage";
import ProtectedNotFoundPage from "./components/ProtectedNotFoundPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (    
      <Routes>
         <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="*" element={<WelcomePage />} />   
        <Route element={<ProtectedRoute />}>  {/* Handles both auth and layout */}
                {/* These routes will be wrapped in the appropriate layout based on user role */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/add-product" element={<AddProductPage />} />
                 <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="*" element={<ProtectedNotFoundPage />} />
          </Route>                      
      </Routes>  
  );
}

export default App;
