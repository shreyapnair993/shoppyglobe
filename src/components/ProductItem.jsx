// ProductItem - displays one product as a card
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  // When Add to Cart is clicked, send product to Redux store
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
  };

  return (
    <div className="product-card">

      {/* loading="lazy" means image loads only when visible - performance */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
        loading="lazy"
      />

      <div className="product-info">
        {/* Clicking title goes to product detail page */}
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-rating">&#128230; {product.rating} / 5</p>

        {/* Add to Cart button */}
        <button className="btn btn-primary" onClick={handleAddToCart}>
          &#128722; Add to Cart
        </button>
      </div>

    </div>
  );
};

export default ProductItem;