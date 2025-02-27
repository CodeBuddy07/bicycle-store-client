
const Section2 = () => {
    return (
        <div
      style={{ backgroundImage: 'url("/section2.png")' }}
      className="bg-cover bg-center text-white text-right py-20"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        <div className="max-w-lg ml-auto">

          <p className="text-white text-2xl font-bold">ALL THE PRODUCTS</p>
          

          <h1 className="text-5xl md:text-7xl font-bold text-blue-400 mt-2">
            <span>20</span>% discount
          </h1>
          

          <p className="mt-4 text-gray-300 text-lg md:text-lg">
            Don’t miss this opportunity to grab your favorite bikes at the best price! 
            Offer valid for a limited time only.
          </p>
          

          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300">
            See More
          </button>
        </div>
      </div>
    </div>
    );
};

export default Section2;