// NotFound - 404 page shown for any unknown URL
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-box">

        {/* Error code */}
        <h1 className="error-code">404</h1>

        {/* Error title */}
        <h2 className="error-title">Page Not Found</h2>

        {/* Error details shown on UI */}
        <p className="error-message">
          &#128533; Oops! The page you are looking for does not exist
        </p>
        <p className="error-detail">
          The URL you entered may be incorrect or the page may have been moved or deleted.
        </p>

        <Link to="/" className="btn btn-primary">🏠 Go Back to Home</Link>

      </div>
    </div>
  );
};

export default NotFound;