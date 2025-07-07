import { useState } from 'react';
import api from '../utils/api';

function AddProduct() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [spec, setSpec] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate file type
    if (image && !['image/jpeg', 'image/png'].includes(image.type)) {
      setError('Only JPEG or PNG images are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('productData', JSON.stringify({ name, model, spec }));
    if (image) formData.append('image', image);

    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setName('');
      setModel('');
      setSpec('');
      setImage(null);
      e.target.reset(); // Reset file input
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>Add Product</h2>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Model"
        required
      />
      <textarea
        value={spec}
        onChange={(e) => setSpec(e.target.value)}
        placeholder="Specifications"
        required
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/jpeg,image/png"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;