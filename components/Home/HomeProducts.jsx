'use client'
import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/products/productSlice";

const HomeProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button
        onClick={() => router.push('/all-products')}
        className="px-12 py-2.5 bg-orange-600 rounded-full text-white  transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;