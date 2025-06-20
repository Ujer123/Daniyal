"use client";
import { useEffect, useState} from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useRouter, useParams } from "next/navigation";
import { fetchProductById } from "@/lib/features/productDetail/productDetailSlice";
import HomeProducts from "@/components/Home/HomeProducts";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

    const { product, loading: detailLoading, error: detailError } = useSelector(
    (state) => state.productDetail
  );
  
  const [mainImage, setMainImage] = useState(assets.placeholder);

  useEffect(() => {
    id && dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    product && setMainImage(product.image[0]);
  }, [product]);

  if (detailLoading) return <div className="bg-gray-100 animate-pulse rounded-lg aspect-square" />
  if (detailError) return <div>Error: {detailError}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="px-6 md:px-16 lg:px-32 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
             {mainImage || assets.placeholder ? (
  <Image
    src={mainImage || assets.placeholder}
    alt="Product image"
    className="w-full h-auto object-cover mix-blend-multiply"
    width={600}
    height={400}
    priority
  />
) : (
  <div className="w-full bg-gray-100 aspect-video flex items-center justify-center">
    <span>Loading image...</span>
  </div>
)}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image || assets.placeholder)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image || assets.placeholder}
                    alt={product.name}
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={600}
                    height={400}
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
                {[...Array(5)].map((_,index)=>(
<Image
key={index}
                  className="h-4 w-4"
                  src={ index < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt={index < 4 ? "Filled star" : "Empty star"}
                  />
                  )
                )}
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
        <HomeProducts />
      </div>{" "}
    </>
  ) 
};

export default Product;