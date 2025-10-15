"use client";
import { useMemo } from "react";
import { calculateTotalPrice } from "../utils/calculations";

export default function ProductDetailsSection({
  product,
  quantity,
  onQuantityChange,
  onPurchase,
}) {
  const basePrice = product.price;
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(basePrice, quantity);
  }, [basePrice, quantity]);

  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-bold mb-3">{product.title}</h2>
      <p className="text-xl text-gray-600 mb-6">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-6 border-b pb-4">
        {product.description.substring(0, 80)}...
      </p>

      {/* SELETOR DE QUANTIDADE */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Quantidade</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onQuantityChange(-1)}
            data-cy="quantity-decrement" // ADICIONADO
            className="px-4 py-2 border rounded-md text-xl font-bold bg-gray-100 hover:bg-gray-200"
            disabled={quantity === 0} // BOA PRÁTICA: Desativa o botão se for 0
          >
            -
          </button>
          <span data-cy="quantity-display" className="text-2xl font-semibold">{quantity}</span> {/* ADICIONADO */}
          <button
            onClick={() => onQuantityChange(1)}
            data-cy="quantity-increment" // ADICIONADO
            className="px-4 py-2 border rounded-md text-xl font-bold bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* PREÇO TOTAL */}
      <div className="pt-4 flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Preço Total:</h3>
          <p 
            data-cy="total-price" // ADICIONADO
            className="text-3xl font-bold text-indigo-600"
          >
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* BOTÃO DE COMPRA */}
        <button
          onClick={onPurchase}
         data-cy="buy-button"          
          disabled={quantity === 0} // Desativa o botão se for 0
          className={`w-full px-8 py-3 font-bold rounded-lg transition shadow-lg
            ${quantity === 0 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white" 
          }
       `}
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
}