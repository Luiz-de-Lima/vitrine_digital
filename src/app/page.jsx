"use client";
import { useState, useEffect } from "react";
import { getProduct } from "@/services/services";
export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const pruductData = await getProduct(1);
        setProduct(pruductData);
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
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-1/2 md:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-2">${product.price}</p>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <div className="mt-8">
          
          </div>
        </div>
      </div>
    </main>
  );
}
