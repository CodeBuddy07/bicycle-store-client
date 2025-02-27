import { NavLink } from "react-router-dom";


const Banner = () => {
  return (
    <div style={{ background: 'url(/headerBanner.png)' }} className=" bg-cover bg-center text-white">
      <header className=" py-10 md:py-16 lg:py-40">
        <div className="container mx-auto px-6 md:px-12 lg:flex lg:items-center lg:gap-10">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Ride the Future
            </h1>

            <div className=' bg-gradient-to-r from-blue-500 to-transparent md:p-1 p-[2px] lg:my-5 mt-2  max-w-60'></div>

            <p className="mt-4 text-gray-300 md:text-lg">
              Discover the best bicycles designed for comfort, speed, and style.
              Upgrade your ride today with the latest models!
            </p>
            <div className="mt-6 flex lg:justify-start gap-4">

              <NavLink to={'/shop'} >
                <button className="px-6 py-2 text-white border border-white rounded-lg hover:border-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
                  Buy
                </button>
              </NavLink>

              <NavLink to={'/shop'}>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                  See More
                </button>
              </NavLink>
            </div>
          </div>

          <div className="mt-8">
            <img
              src="/blueCycle.png"
              alt="Bicycle"
              className="w-full"
            />
          </div>
        </div>
      </header>

    </div>
  );
};

export default Banner;