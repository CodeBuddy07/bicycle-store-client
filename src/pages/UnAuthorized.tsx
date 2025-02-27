import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <AlertTriangle size={60} className="text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
