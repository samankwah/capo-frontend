import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

type ProductCardProps = {
  id: string; 
  name: string;
  price: number;
  image: string;
  description?: string;
};

const ProductCard = ({ id, name, price, image, description }: ProductCardProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <>
      {/* Product Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4">
        <img
          loading="lazy"
          src={image}
          alt={name}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-green-500 font-bold mt-1">
          {formatPrice(price)}
        </p>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            Add to Cart
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            View
          </button>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6 relative shadow-lg">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold text-lg"
            >
              &times;
            </button>

            <img
              loading="lazy"
              src={image}
              alt={name}
              className="w-full h-64 object-contain mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{name}</h2>

            <p className="text-green-500 font-bold text-xl mb-4">
              {formatPrice(price)}
            </p>

            {description && (
              <p className="text-gray-700 dark:text-gray-200 mb-4">{description}</p>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;