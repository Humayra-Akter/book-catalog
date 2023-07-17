import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';
import PrivateRoute from './PrivateRoutes';
import { AddBookForm } from '@/pages/AddBookForm';
import WishlistPage from '@/pages/WishlistPage';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/addBook',
        element: (
          <PrivateRoute>
            <AddBookForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
