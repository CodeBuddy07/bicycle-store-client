/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { Camera, User } from "lucide-react";
import { useRegisterUserMutation } from "../Redux/features/api/endpoints/auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }]: any = useRegisterUserMutation();


  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("address", formData.address);
    data.append("phone", formData.phone);
    if (photo) data.append("photo", photo);

    try {
      const response = await registerUser(data).unwrap();
      toast.success(response.message || "Registration successful!");
      navigate('/login')
    } catch (err: any) {
      if (err && err.data) {
        toast.error(err.data.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
      
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
                />
              ) : (
                <div className="w-32 h-32 flex justify-center items-center rounded-full border border-gray-300 dark:border-gray-600 object-cover dark:text-white">
                    <User   size={55} />
                </div>
              )}
              <label
                htmlFor="photo"
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-600"
              >
                <Camera size={18} />
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
            >
               {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account? 
          <a href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Login
          </a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
