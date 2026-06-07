// App.jsx - sets up all routes using createBrowserRouter
// React.lazy loads each component only when needed (performance)
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Lazy load all components
const Header = lazy(() => import('./components/Header'));
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

// Shown while any component is loading
const LoadingFallback = () => <div className="loading">Loading...</div>;

// Layout wraps every page with Header on top
const Layout = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Header />
    <main className="main-content">
      <Outlet /> {/* This renders whichever page matches the URL */}
    </main>
  </Suspense>
);

// Define all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // home page
        element: <Suspense fallback={<LoadingFallback />}><ProductList /></Suspense>
      },
      {
        path: 'product/:id', // dynamic route - :id changes per product
        element: <Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>
      },
      {
        path: 'cart',
        element: <Suspense fallback={<LoadingFallback />}><Cart /></Suspense>
      },
      {
        path: 'checkout',
        element: <Suspense fallback={<LoadingFallback />}><Checkout /></Suspense>
      },
      {
        path: '*', // catches any unknown URL - shows 404 page
        element: <Suspense fallback={<LoadingFallback />}><NotFound /></Suspense>
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;