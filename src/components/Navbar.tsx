import { NavLink } from 'react-router-dom';
import { User, ShoppingCart } from "lucide-react";
import ThemeToggle from './ThemeToggler';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Badge, Button } from 'antd';



const Navbar = ({ cartCount }: { cartCount: number }) => {



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);



  return (
    <div className="navbar sticky top-0 z-10 bg-gray-900 py-2">
      <div className="container flex justify-between items-center mx-auto px-4 md:px-8">
        {/* Logo Section */}
        <div className="logo">
          <NavLink to={'/'}><img src="/logo.png" alt="Logo" className="h-10 cursor-pointer" /></NavLink>
        </div>

        {/* Menu Button for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white hover:text-blue-500 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18m-6 6h6"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center items-center gap-5 text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 p-1 border-b-2 border-blue-500 rounded-t-md"
                  : "px-4 p-1 border-b-2 border-gray-900 hover:border-blue-500 transition-colors duration-200 rounded-t-md"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 p-1 border-b-2 border-blue-500 rounded-t-md"
                  : "px-4 p-1 border-b-2 border-gray-900 hover:border-blue-500 transition-colors duration-200 rounded-t-md"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 p-1 border-b-2 border-blue-500 rounded-t-md"
                  : "px-4 p-1 border-b-2 border-gray-900 hover:border-blue-500 transition-colors duration-200 rounded-t-md"
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 p-1 border-b-2 border-blue-500 rounded-t-md"
                  : "px-4 p-1 border-b-2 border-gray-900 hover:border-blue-500 transition-colors duration-200 rounded-t-md"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Icon Section */}
        <div className="hidden md:flex justify-center items-center space-x-5">
          <NavLink to={user ? "/dashboard" : "/login"}>
            {user ? <Button > Dashboard</Button> : <User size={25} className="text-white hover:text-blue-500 cursor-pointer" />}
          </NavLink>
          <NavLink to="/checkout">
            <Badge count={cartCount} size="small">
              <ShoppingCart className="text-white hover:text-blue-500 cursor-pointer" />
            </Badge>
          </NavLink>
          <ThemeToggle />
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-64 h-full bg-gray-900 z-50 p-5 transition-transform transform"
            style={{ transform: "translateX(0)" }}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-blue-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ul className="flex flex-col justify-center items-start gap-5 mt-10 text-white">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-white hover:text-blue-500 transition-colors duration-200"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-white hover:text-blue-500 transition-colors duration-200"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-white hover:text-blue-500 transition-colors duration-200"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-white hover:text-blue-500 transition-colors duration-200"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Icon Section */}
            <div className=" flex justify-center items-center space-x-5 mt-5">
              <NavLink to={user ? "/dashboard" : "/login"}>
                {user ? <Button > Dashboard</Button> : <User size={25} className="text-white hover:text-blue-500 cursor-pointer" />}
              </NavLink>
              <NavLink to="/checkout">
                <Badge count={cartCount} size="small">
                  <ShoppingCart className="text-white hover:text-blue-500 cursor-pointer" />
                </Badge>
              </NavLink>
              <ThemeToggle />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};



// <nav>

//   {token ? (
//     <>
//       <Link to="/dashboard">Dashboard</Link>
//       <button onClick={handleLogout}>Logout</button>
//     </>
//   ) : (
//     <Link to="/login">Login</Link>
//   )}
// </nav>


export default Navbar;
