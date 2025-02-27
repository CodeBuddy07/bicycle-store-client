import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearCart } from "../Redux/features/api/cartSlice";

const PaymentStatus = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useParams();

  useEffect(() => {

    dispatch(clearCart());

    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-lg w-full p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
        {status === "success" ? (
          <>
            <div className="text-green-500 text-6xl mb-4">✔</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Thank you for your purchase. Redirecting to homepage...
            </p>
          </>
        ) : (
          <>
            <div className="text-red-500 text-6xl mb-4">✖</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Payment {status}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Something went wrong. Please try again.
            </p>
          </>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
