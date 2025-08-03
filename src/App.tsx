import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedNotFoundPage from "./components/ProtectedNotFoundPage";
import PublicNotFoundPage from "./components/PublicNotFoundPage";
import ProductDetailPage from "./components/ProductDetailPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route element={<ProtectedRoute /> }>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-product" element={<AddProductPage />} />          
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<ProtectedNotFoundPage />} />
          </Route>
        </Route>
       <Route path="*" element={<PublicNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
