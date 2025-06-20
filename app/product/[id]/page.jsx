"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { fetchProductById } from "@/lib/features/productDetail/productDetailSlice";
import { fetchProducts } from "@/lib/features/products/productSlice";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const productDetailState = useSelector((state) => state.productDetail);
  const { product, loading: detailLoading, error: detailError } = productDetailState;

  // Get products list from products slice
  const productsState = useSelector((state) => state.products);
  const { products: productList, loading: listLoading, error: listError } = productsState;
  
  const [mainImage, setMainImage] = useState(assets.placeholder);

  // Fetch product when ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // Fetch products if not already loaded
  useEffect(() => {
    if (Array.isArray(productList) && productList.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productList]);

  useEffect(() => {
    if (product && 
        Array.isArray(product.image) && 
        product.image.length > 0 && 
        product.image[0]) {
      setMainImage(product.image[0]);
    }
  }, [product]);

  // Handle loading and error states
  if (detailLoading) return <div>Loading...</div>;
  if (detailError) return <div>Error: {detailError}</div>;
  if (!product) return <div>Product not found</div>;
  
  // Filter out invalid images with proper array check
  const validImages = (Array.isArray(product.image) 
    ? product.image.filter(img => img && typeof img === 'string' && img.trim() !== "") 
    : []);

  return (
    <>
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
             {mainImage || assets.placeholder ? (
  <Image
    src={mainImage || assets.placeholder}
    alt="Product image"
    className="w-full h-auto object-cover mix-blend-multiply"
    width={1280}
    height={720}
    priority
    onError={(e) => {
      e.target.src = assets.placeholder; // Fallback on error
    }}
  />
) : (
  <div className="w-full bg-gray-100 aspect-video flex items-center justify-center">
    <span>Loading image...</span>
  </div>
)}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {validImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image || assets.placeholder)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image || assets.placeholder}
                    alt="alt"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className="text-gray-600 mt-3">{product.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${product.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${product.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{product.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                  onClick={() => dispatch(addToCart(product._id))}
                  className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {productList.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 bg-orange-600 rounded-full  text-white">
            See more
          </button>
        </div>
      </div>{" "}
    </>
  ) 
};

export default Product;