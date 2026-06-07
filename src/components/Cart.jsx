// Cart - full cart page showing all items
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';

const Cart = () => {
  // Read cart data from Redux store
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // If cart is empty show this message
  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>🛒 Your Cart</h1>
        <p>Your cart is empty. Start shopping now!</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>🛒 Your Cart</h1>

      {/* List of cart items - each needs unique key */}
      <div className="cart-items-list">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Order total and checkout button */}
      <div className="cart-summary">
        <h2>Order Total: ${cartTotal.toFixed(2)}</h2>
        <Link to="/checkout" className="btn btn-primary checkout-btn">
          Proceed to Checkout
        </Link>
        <Link to="/" className="btn btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;