// Header component - top navigation bar with logo and cart icon
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/cartSlice';

const Header = () => {
  // Get total number of items in cart from Redux
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo - clicking takes you home */}
        <Link to="/" className="logo">ShoppyGlobe</Link>

        {/* Navigation links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart
            {/* Show red badge with count only when cart has items */}
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;