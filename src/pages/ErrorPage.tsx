import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
