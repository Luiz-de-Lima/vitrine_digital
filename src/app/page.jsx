"use client";
import { useState, useEffect } from "react";
import { getProduct } from "@/services/services";
export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const pruductData = await getProduct(10);
        setProduct(pruductData);
        console.log(product);
      } catch (error) {
      } finally {
        setIsloading(false);
      }
    };
    fetchProduct();
  }, []);
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {product.map((product) => (
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
            <p className="ext-xl text-green-600 mb-4">${product.price}</p>
            <p className="text-gray-500 mb-6">{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
