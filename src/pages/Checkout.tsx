/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { removeItem, updateQuantity } from "../Redux/features/api/cartSlice";
import { useProcessPaymentMutation } from "../Redux/features/api/endpoints/order";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const { user } = useSelector((state: RootState) => state.auth);

  const [totalPrice, setTotalPrice] = useState(0);
  const [userData, setUserData] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const [pay, {isLoading}] = useProcessPaymentMutation();

  useEffect(() => {
    const total = cart.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  useEffect(() => {
    setIsFormValid(!!(userData.name.trim() && userData.phone.trim() && userData.address.trim()));
  }, [userData]);

  console.log(cart);

  const handleCheckout = async() => {
    if (!isFormValid) return;
    const newUserData = { 
      ...userData,
      email: user?.email || "",
    };
    try{
      const x = {
        cart: cart,
        userData: newUserData,
      }
      const { data } = await pay({paymentData: x});
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to process payment: ", error);
    }
    console.log("Proceeding to payment", userData);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-5xl flex justify-center items-center gap-8">
        {/* Left: User Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold dark:text-gray-100 mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white outline-none"
            />
            <textarea
              placeholder="Shipping Address"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white outline-none h-24"
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md min-h-80 min-w-96">
          <h2 className="text-2xl font-semibold dark:text-gray-100 mb-4">Order Summary</h2>
          {cart?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">Your cart is empty.</p>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto space-y-4">
                {cart?.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="dark:text-white font-semibold">{item.name}</p>
                      <p className="text-sm dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 bg-gray-400 dark:bg-gray-600 text-white rounded-l disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-white dark:bg-gray-800 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="px-3 py-1 bg-gray-400 dark:bg-gray-600 text-white rounded-r"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="ml-3 px-3 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4 dark:text-gray-100">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className={`w-full mt-4 py-3 rounded-lg text-white font-semibold ${
                  isFormValid ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
                onClick={handleCheckout}
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
