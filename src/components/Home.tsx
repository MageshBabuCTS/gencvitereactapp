import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router';
import '../ProductCard.css';
import type { Product } from '../types/contract';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

 return (  
   <div className="product-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`}>
            <img src={product.imageUrl} alt={product.name} className="product-image rounded" />
          </Link>
          <div className="product-title">{product.name}</div>
          <div className="product-price">{product.model}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;