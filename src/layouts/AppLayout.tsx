import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';



const AppLayout = () => {
  
  const [cartCount, setCartCount] = useState<number>(0);
  const cart = useSelector((state: RootState) => state.cart.items);


  // Load cart count from localStorage when the app starts
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length);
  }, [cart]);

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <main className='min-h-screen'>
        <Outlet context={{ setCartCount }} />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
