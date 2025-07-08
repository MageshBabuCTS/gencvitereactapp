import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/v1/products');
        setProducts(response.data);
      } catch (err) {
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
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
            <Link to={`/product/${product.id}`} className='product-list-link'>
              {product.name}  - {product.model}
            </Link>
        </li>
      ))}
    </ul>
  );
}

export default Home;