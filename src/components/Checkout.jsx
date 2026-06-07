// Checkout - form for user details + order summary + place order
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart data from Redux
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Form fields stored in local state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Update form field when user types
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When Place Order is clicked
  const handlePlaceOrder = () => {
    // Check all fields are filled
    const allFilled = Object.values(formData).every(val => val.trim() !== '');
    if (!allFilled) {
      alert('Please fill in all fields.');
      return;
    }

    // Show success message
    setOrderPlaced(true);

    // Clear the cart in Redux
    dispatch(clearCart());

    // Redirect to home after 3 seconds
    setTimeout(() => navigate('/'), 3000);
  };

  // Show success screen after order placed
  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-box">
          <h1>✅ Order Placed!</h1>
          <p>Thank you for shopping with ShoppyGlobe.</p>
          <p>Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Your cart is empty.</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>&#129534; Checkout</h1>

      <div className="checkout-container">

        {/* Left side - user details form */}
        <div className="checkout-form">
          <h2>Delivery Details</h2>
          <input type="text" name="name" placeholder="Full Name"
            value={formData.name} onChange={handleInputChange} className="form-input" />
          <input type="email" name="email" placeholder="Email Address"
            value={formData.email} onChange={handleInputChange} className="form-input" />
          <input type="tel" name="phone" placeholder="Phone Number"
            value={formData.phone} onChange={handleInputChange} className="form-input" />
          <input type="text" name="address" placeholder="Street Address"
            value={formData.address} onChange={handleInputChange} className="form-input" />
          <input type="text" name="city" placeholder="City"
            value={formData.city} onChange={handleInputChange} className="form-input" />
          <input type="text" name="pincode" placeholder="Pincode"
            value={formData.pincode} onChange={handleInputChange} className="form-input" />
        </div>

        {/* Right side - order summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {/* List of items in cart - each needs unique key */}
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.title} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="summary-total">
            <strong>Total: ${cartTotal.toFixed(2)}</strong>
          </div>

          {/* Place Order button */}
          <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;