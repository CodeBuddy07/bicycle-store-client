import { Button, Input } from "antd";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start space-y-3">
          <img
            src="/logo.png" // Replace this with your logo path
            alt="Bicycle Shop Logo"
            className="w-32"
          />
        </div>

        {/* Newsletter Section */}
        <div className="text-center lg:text-left">
          <h4 className="text-lg font-semibold">Newsletter</h4>
          <p className="text-sm mb-3">
            Subscribe to our latest offers and updates.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()} // Prevent default form submission
            className="flex items-center"
          >
            <Input type="email" placeholder="Your Email" className="py-2 px-3 rounded-l-lg !rounded-r-0 text-gray-800 focus:outline-none" />

            <Button color="default" variant="solid" htmlType="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-4 rounded-r-lg">
              Submit
            </Button>
          </form>
        </div>

        {/* Payment Section */}
        <div className="text-center lg:text-left">
          <h4 className="text-lg font-semibold">Payment Method</h4>
          <p className="text-sm mb-3">Secured Payment</p>
          <div className="flex space-x-3">
            <img
              src="/masterCard.png" // Replace these paths
              alt="MasterCard"
              className="w-10 h-6"
            />
            <img src="/crypto.png" alt="Visa" className="w-10 h-6" />
            <img src="/paypal.png" alt="PayPal" className="w-10 h-6" />
          </div>
        </div>

        {/* Navigation and Social Media */}
        <div className="text-center lg:text-right">
          {/* Navigation Links */}
          <div className="flex justify-center lg:justify-end space-x-6 mb-3">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About Us
            </Link>
            <Link to="/shop" className="hover:text-gray-300">
              Shop
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
          {/* Social Media Icons */}
          <div className="flex justify-center lg:justify-end space-x-4">
            <a href="#" className="hover:text-gray-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
