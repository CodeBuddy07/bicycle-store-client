import { Instagram, Facebook, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 bg-gray-100 dark:text-white flex flex-col">
      <div className="flex flex-col items-center py-16">
        <h1 className="text-4xl font-semibold text-center">Contact Us</h1>
        <div className=" bg-gradient-to-r from-blue-500 to-transparent  p-[3px] my-2 mb-6 max-w-60 w-full"></div>
        <p className="text-lg text-center max-w-2xl mb-8">
          Whether you're looking for your next bike or need help with an
          existing one, we're here to assist you. Feel free to reach out to us.
        </p>
      </div>

      <div className="px-6 pb-6">
        <div className="w-full container mx-auto dark:bg-gray-900 bg-gray-200 p-8 rounded-lg shadow-lg">
          {/* Location Section */}
          <h2 className="text-2xl font-semibold mb-4">
            Our Location
          </h2>
          <p className="text-md dark:text-gray-300 mb-6">
            123 Bicycle Street, Cityville, Country
          </p>
          <div className="h-64 dark:bg-gray-700 rounded-lg mb-6">
            {/* Embed Google Maps iframe */}
            <iframe
              title="Google Maps Location"
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1520743773747!2d-122.41941608468749!3d37.77492927975881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809e6e24f8ef%3A0x1288f7c1a6b2b2fb!2sBicycle%20Shop!5e0!3m2!1sen!2sus!4v1689314692278!5m2!1sen!2sus"
              style={{ border: 0 }}
            />
          </div>

          {/* Contact Information Section */}
          <div className="mb-8">
            <h3 className="text-xl font-medium darKtext-gray-300 mb-2">Phone</h3>
            <p className="text-md dark:text-gray-400">+1 234 567 890</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium darK:text-gray-300 mb-2">Email</h3>
            <p className="text-md dark:text-gray-400">contact@bicycleshop.com</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium dark:text-gray-300 mb-2">
              Business Hours
            </h3>
            <p className="text-md dark:text-gray-400">Mon - Fri: 9 AM - 6 PM</p>
            <p className="text-md dark:text-gray-400">Sat - Sun: 10 AM - 4 PM</p>
          </div>

          <div>
            <h3 className="text-xl font-medium dark:text-gray-300 mb-2">
              Follow Us
            </h3>
            <p className="text-md dark:text-gray-400 mb-4">
              Stay connected with us through social media for the latest updates
              and offers!
            </p>
            <div className="flex  space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
