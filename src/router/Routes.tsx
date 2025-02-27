
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login';
import ErrorPage from '../pages/ErrorPage';
import AppLayout from '../layouts/AppLayout';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import Shop from '../pages/Shop';
import Register from '../pages/Register';
import DashboardLayout from '../Dashboard/Layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Unauthorized from '../pages/UnAuthorized';
import UpdateBicycle from '../Dashboard/AdminDashboard/Pages/UpdateBicycle';
import AllUsers from '../Dashboard/AdminDashboard/Pages/AllUsers';
import AddProducts from '../Dashboard/AdminDashboard/Pages/AddProducts';
import ManageProducts from '../Dashboard/AdminDashboard/Pages/ManageProducts';
import ProductDetails from '../pages/ProductDetails';
import CheckoutPage from '../pages/Checkout';
import PaymentSuccess from '../pages/Success';
import ManageOrders from '../Dashboard/AdminDashboard/Pages/ManageOrders';
import CustomerOrders from '../Dashboard/CustomerDashboard/CustomerOrders';
import CustomerPasswordUpdate from '../Dashboard/CustomerDashboard/CustomerPassChange';
import DashboardWelcome from '../Dashboard/Shared/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />, 
        errorElement: <ErrorPage />, 
        children: [
          {
            index: true,
            element: <Home />, 
          },
          {
            path: 'login',
            element: <Login />, 
          },
          {
            path: 'register',
            element: <Register/>, 
          },
          {
            path: 'shop',
            element: <Shop />, 
          },
          {
            path: 'shop/:id',
            element: <ProductDetails />, 
          },
          {
            path: 'about-us',
            element: <AboutUs />, 
          },
          {
            path: 'contact',
            element: <Contact />, 
          },
          {
            path: 'checkout',
            element: <CheckoutPage />, 
          },
          {
            path: 'payment/:status',
            element: <PaymentSuccess />,
          },
        ],
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute allowedRoles={['admin', "customer"]} element={<DashboardLayout />} />, 
      errorElement: <ErrorPage />, 
      children: [
        {
          index: true,
          element: <DashboardWelcome/>, 
        },
        {
          path: 'add-product',
          element:<ProtectedRoute allowedRoles={['admin']} element={<AddProducts />} /> , 
        },
        {
          path: 'manage-products',
          element:<ProtectedRoute allowedRoles={['admin']} element={<ManageProducts />} /> , 
        },
        {
          path: 'manage-orders',
          element:<ProtectedRoute allowedRoles={['admin']} element={<ManageOrders />} /> , 
        },
        {
          path: 'manage-customer-orders',
          element:<ProtectedRoute allowedRoles={['customer']} element={<CustomerOrders />} /> , 
        },
        {
          path: 'update-password',
          element:<ProtectedRoute allowedRoles={['customer']} element={<CustomerPasswordUpdate />} /> , 
        },
        {
          path: 'update/:id',
          element:<ProtectedRoute allowedRoles={['admin']} element={<UpdateBicycle />} /> , 
        },
        {
          path: 'users',
          element:<ProtectedRoute allowedRoles={['admin']} element={<AllUsers />} /> , 
        },
        
      ],
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />, 
    },    
]);

export default router;
