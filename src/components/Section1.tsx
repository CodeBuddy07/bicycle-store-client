import { Truck, ShieldCheck, Headset } from "lucide-react";
import Title from "./Shared/Title";

const Section1 = () => {
  return (
    <section  className="bg-gray-800 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12">

        <Title title="Why Choose Us?" description="Enjoy the best services for your biking needs with unbeatable perks."/>

    
        <div className="grid gap-10 md:grid-cols-3">

          <div className="flex flex-col items-center text-center">
            <div className="dark:bg-gray-700 bg-blue-100 p-4 rounded-full mb-4">
              <Truck size={40} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">Fast Delivery</h3>
            <p className="mt-2 text-gray-400">
              Get your bike delivered to your doorstep in record time.
            </p>
          </div>


          <div className="flex flex-col items-center text-center">
            <div className="dark:bg-gray-700 bg-blue-100 p-4 rounded-full mb-4">
              <ShieldCheck size={40} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">Quality Assurance</h3>
            <p className="mt-2 text-gray-400">
              All our bikes are inspected for top-notch quality and durability.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="dark:bg-gray-700 bg-blue-100 p-4 rounded-full mb-4">
              <Headset size={40} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">24/7 Support</h3>
            <p className="mt-2 text-gray-400">
              Our team is always available to answer your questions and assist you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1
