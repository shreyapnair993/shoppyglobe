// ProductList - shows all products in a grid with search bar
import { useSelector, useDispatch } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import { selectSearchQuery, setSearchQuery } from '../redux/searchSlice';

const ProductList = () => {
  const dispatch = useDispatch();

  // Get products using our custom hook
  const { products, loading, error } = useFetchProducts();

  // Get current search text from Redux store
  const searchQuery = useSelector(selectSearchQuery);

  // When user types, update Redux search state
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Filter products based on search query from Redux
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading message while fetching
  if (loading) return <div className="loading">Loading products...</div>;

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Failed to load products</h2>
        <p>{error}</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <h1 className="page-title">All Products</h1>

      {/* Search bar - updates Redux state on every keystroke */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Show message if no products match search */}
      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found for "{searchQuery}"</p>
      ) : (
        /* Render product grid - key prop is required for each item */
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;