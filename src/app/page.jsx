"use client";
import { useState, useEffect } from "react";
import PurchaseModal from "@/components/PurchaseModal";
import Header from "@/components/Header";
import { getProduct } from "@/services/services";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsloading(true);
      try {
        console.log("LOg1: Buscando produto");
        const pruductData = await getProduct(10);
        setProducts(pruductData);
      } catch (error) {
        console.error("LOG 2: FALHA CRÍTICA NA API:", error);
      } finally {
    
        setIsloading(false);
      }
    };
    fetchProduct();
  }, []);

  const product = products[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando produto...</p>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Produto não encontrado</p>
      </div>
    );
  }
  return (
    <main className="container mx-auto p-8">
      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8" data-cy="product-catalog">
        {products.map((product) => (
          <div
            key={product.id}
            className="g-white p-4 rounded-lg shadow-xl flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />

            <h1 className="text-lg font-semibold mb-2">{product.title}</h1>
            <p className="text-xl text-green-600 mb-4">${product.price}</p>
            <p className="text-gray-500 mb-6">{product.description}</p>

            <button
              onClick={() => setSelectedProduct(product)}
              className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              Comprar Agora
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
