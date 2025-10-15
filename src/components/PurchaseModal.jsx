import { useState, useMemo } from "react";
import PurchaseConfirmationModal from "./PurchaseConfirmationModal";
import { calculateTotalPrice } from "@/utils/calculations";

export default function PurchaseModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  const handleQuantity = (change) => {
    setQuantity((prevQ) => {
      const newQ = prevQ + change;
      return newQ >= 0 ? newQ : 0;
    });
  };
  const handlePurchase = () => {
    setTimeout(() => {
      setPurchaseConfirmed(true);
    }, 1000);
  };

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(product.price, quantity);
  }, [product.price, quantity]);
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      {purchaseConfirmed && (
        <PurchaseConfirmationModal
          quantity={quantity}
          productTitle={product.title}
          onClose={onClose}
        />
      )}

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          {product.title}
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-contain rounded-md"
            />
            <div>
              <p className="text-xl font-semibold" data-cy="total-price">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Preço Unitário</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Quantidade</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantity(-1)}
                disabled={quantity === 1}
                className="px-4 py-2 border rounded-md text-xl font-bold bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                -
              </button>
              <span
                className="text-2xl font-semibold"
                data-cy="quantity-display"
              >
                {quantity}
              </span>
              <button
                onClick={() => handleQuantity(1)}
                data-cy="quantity-increment"
                className="px-4 py-2 border rounded-md text-xl font-bold bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Preço Total:</h3>
              <p
                className="text-3xl font-bold text-indigo-600"
                data-cy="total-price"
              >
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handlePurchase}
              data-cy="buy-button"
              className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
