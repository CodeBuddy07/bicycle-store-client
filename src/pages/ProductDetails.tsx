/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext, useParams } from "react-router-dom";
import { Button, Carousel, InputNumber } from "antd";
import { useGetBicycleQuery } from "../Redux/features/api/endpoints/bicycle";
import { toast } from "react-toastify";
import { useState } from "react";
import { RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/features/api/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading: loading } = useGetBicycleQuery(id);
  const product = data?.data;
  const { setCartCount } = useOutletContext<{ setCartCount: (count: number) => void }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // State for quantity selection
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    if (!product) return;

    if (!user) {
      toast.error("Please login to add items to cart!");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the item is already in the cart
    const existingItem = cartItems.find((item: any) => item.id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ id: product._id, price: product.price, name: product.name, quantity });
      dispatch(addItem({ id: product._id, price: product.price, name: product.name, quantity }));
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartCount(cartItems.length);
    toast.success(`Added ${quantity} ${product.name} to cart! 🛒`);
  };

  if (loading) return <p className="text-center mt-10 text-lg dark:text-gray-300">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 dark:text-white transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide">{product.name}</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400">{product.brand}</p>

      {/* Main Content Layout */}
      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Image Carousel */}
        <div className="w-full p-5 max-w-lg mx-auto shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
          <Carousel autoplay>
            {product?.photos?.map((photo: { url: string; publicId: string }) => (
              <img
                key={photo.publicId}
                src={photo.url}
                alt={product.name}
                className="w-full rounded-lg"
              />
            ))}
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <p className="text-xl font-semibold">Type: <span className="font-normal">{product.type}</span></p>
          <p className="text-lg leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${product.price}</p>
          <p className={`text-lg font-medium ${product.inStock ? "text-green-500" : "text-red-500"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <p className="text-lg font-medium">Quantity:</p>
            <InputNumber
              min={1}
              max={product.quantity}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
              className="w-20 text-center"
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            type="primary"
            className="w-full md:w-64 py-2 px-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200"
            onClick={addToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? `Add ${quantity} to Cart` : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
