
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const DashboardWelcome = () => {
  const { user } = useSelector((state: RootState) => state.auth);



  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-600">Welcome, {user?.name}! 🎉</h2>
        <p className="text-gray-600 mt-2">
          You are now in your dashboard. Explore and manage your account easily!
        </p>
      </div>
    </div>
  );
};

export default DashboardWelcome;
