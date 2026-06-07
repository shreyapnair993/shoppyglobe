// Custom hook - fetches all products from API
import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);  // stores products list
  const [loading, setLoading] = useState(true);  // true while fetching
  const [error, setError] = useState(null);      // stores error if fetch fails

  useEffect(() => {
    // This function runs when component first loads
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://dummyjson.com/products');

        // If server returns error, throw it
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products); // save products to state

      } catch (err) {
        // Save error message to show on screen
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false); // stop loading whether success or fail
      }
    };

    fetchProducts();
  }, []); // empty array = run only once when component mounts

  return { products, loading, error };
};

export default useFetchProducts;