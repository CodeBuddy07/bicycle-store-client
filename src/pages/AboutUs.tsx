

const AboutUs: React.FC = () => {
  return (
    <div className="dark:bg-gray-800 bg-gray-100 dark:text-white py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center py-16">
          <h1 className="text-4xl font-semibold text-center ">About Us</h1>
          <div className=" bg-gradient-to-r from-blue-500 to-transparent  p-[3px] my-2 mb-6 max-w-60 w-full"></div>
          <p className="text-lg text-center max-w-2xl mb-8">
            Discover who we are, what drives us, and why we’re passionate about
            what we do.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="p-6 dark:bg-gray-700 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="dark:text-gray-300 text-gray-600">
              Our mission is to revolutionize how people explore the world on
              two wheels. We strive to deliver high-quality bicycles and
              services that empower our customers to ride with confidence,
              passion, and purpose.
            </p>
          </div>

          {/* Vision Section */}
          <div className="p-6 dark:bg-gray-700 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="dark:text-gray-300 text-gray-600">
              To become the most trusted and innovative cycling brand, creating
              experiences that inspire adventure, sustainability, and personal
              well-being across the globe.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Example Team Members */}
            {["Alice", "Bob", "Charlie", "Diana"].map((name, index) => (
              <div
                key={index}
                className="dark:bg-gray-700 bg-gray-200 rounded-lg shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-600 mb-4">
                  <img
                    className="rounded-full"
                    src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                    alt=""
                  />
                </div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="dark:text-gray-300 text-gray-600 text-sm">Cycling Expert</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
          <p className="dark:text-gray-300 text-gray-600 text-lg mb-6">
            Join us in our mission to inspire riders of all kinds. Explore our
            collection and start your journey today!
          </p>
          <a
            href="/shop"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            View Our Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
