// ProductDetail - shows full details of one product
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();    // get product id from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch this specific product when page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error(`Product not found (status: ${response.status})`);
        }

        const data = await response.json();
        setProduct(data);

      } catch (err) {
        setError(err.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // runs again if id in URL changes

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
    alert(`"${product.title}" added to cart!`);
  };

  if (loading) return <div className="loading">Loading product details...</div>;

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Error Loading Product</h2>
        <p>{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      {/* Back button */}
      <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
        &#8592; Go Back
      </button>

      <div className="product-detail-container">
        {/* Lazy loaded image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-detail-image"
          loading="lazy"
        />

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-brand">Brand: {product.brand}</p>
          <p className="product-detail-category">Category: {product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-rating">⭐ {product.rating} / 5</p>
          <p className="product-detail-stock">In Stock: {product.stock} units</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            &#128722; Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;