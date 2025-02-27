import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBicycleQuery, useUpdateBicycleMutation } from "../../../Redux/features/api/endpoints/bicycle";

const UpdateBicycle = () => {
  const { id } = useParams(); // Get bicycle ID from URL
  const navigate = useNavigate();
  
  const { data: bicycle, isLoading } = useGetBicycleQuery(id!);
  const [updateBicycle, { isLoading: updating }] = useUpdateBicycleMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    type: "Mountain",
    description: "",
    quantity: 0,
    inStock: true,
    photos: [] as File[], // Store files before uploading
  });

  useEffect(() => {
    if (bicycle) {
        console.log(bicycle);
      setFormData({
        name: bicycle.data.name,
        brand: bicycle.brand,
        price: bicycle.price,
        type: bicycle.type,
        description: bicycle.description,
        quantity: bicycle.quantity,
        inStock: bicycle.inStock,
        photos: [],
      });
    }
  }, [bicycle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle multiple file selection (Max 5)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
      setFormData((prev) => ({
        ...prev,
        photos: filesArray,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("name", formData.name);
      formDataUpload.append("brand", formData.brand);
      formDataUpload.append("price", String(formData.price));
      formDataUpload.append("type", formData.type);
      formDataUpload.append("description", formData.description);
      formDataUpload.append("quantity", String(formData.quantity));
      formDataUpload.append("inStock", String(formData.inStock));
      formData.photos.forEach((photo) => formDataUpload.append("photos", photo));

      await updateBicycle({ id: id!, formData: formDataUpload }).unwrap();

      toast.success("Bicycle updated successfully!");
      navigate("/dashboard/bicycles");
      
    } catch (error) {
        console.log(error);
      toast.error("Failed to update bicycle");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Update Bicycle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
          <option value="BMX">BMX</option>
          <option value="Electric">Electric</option>
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded"></textarea>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
          <span>In Stock</span>
        </label>

        {/* Image Upload Section */}
        <label className="block font-semibold">Upload Images (Max 5)</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <div className="flex space-x-2 mt-2">
          {bicycle?.photos?.map((photo, index) => (
            <img key={index} src={photo} alt={`Bike ${index}`} className="w-20 h-20 object-cover rounded-md shadow-md" />
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {updating ? "Updating..." : "Update Bicycle"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBicycle;
