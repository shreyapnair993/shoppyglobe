// CartItem - one single product row inside the cart
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">

      {/* Product image - lazy loaded */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="cart-item-image"
        loading="lazy"
      />

      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>

        {/* Quantity controls */}
        <div className="quantity-controls">

          {/* Minus button - disabled when quantity is 1 */}
          <button
            className="qty-btn"
            onClick={() => dispatch(decreaseQuantity(item.id))}
            disabled={item.quantity === 1}
          >
            −
          </button>

          <span className="quantity-display">{item.quantity}</span>

          {/* Plus button */}
          <button
            className="qty-btn"
            onClick={() => dispatch(increaseQuantity(item.id))}
          >
            +
          </button>
        </div>

        <p className="cart-item-subtotal">
          Item Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove button - removes item from cart completely */}
      <button
        className="btn btn-danger remove-btn"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        Remove
      </button>

    </div>
  );
};

export default CartItem;