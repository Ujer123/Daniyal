"use client";
import { useEffect, useState} from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { fetchProductById } from "@/lib/features/productDetail/productDetailSlice";
import HomeProducts from "@/components/Home/HomeProducts";
import { useAppContext } from "@/context/AppContext";
import { updateCartOnServer, decreaseCartOnServer, updateCartQuantity, addtoCart } from "@/lib/features/user/userSlice";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, getToken}= useAppContext()
  const {cartItem} = useSelector(state => state.user)

    const { product, loading: detailLoading, error: detailError } = useSelector(
    (state) => state.productDetail
  );
  
  const [mainImage, setMainImage] = useState(assets.placeholder);
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    id && dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    product && setMainImage(product.image[0]);
  }, [product]);

  useEffect(()=>{
    if(cartItem && cartItem[id]){
      setInputValue(cartItem[id].toString());
    }else{
      setInputValue("")
    }
  }, [cartItem, id])

  if (detailLoading) return <div className="bg-gray-100 animate-pulse rounded-lg aspect-square" />
  if (detailError) return <div>Error: {detailError}</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = ()=>{
    if(user){
      dispatch(addtoCart({user, getToken, productId: id}))
    }
  }

  const handleUpdateProduct =(productId)=>{
      dispatch(updateCartOnServer({user, getToken, productId}))
    }
  
    const handleDecreaseProduct = (productId)=>{
      dispatch(decreaseCartOnServer({user, getToken, productId}))
    }
  
    const handleQuantityChange = (productId, newQuantity)=>{
      dispatch(updateCartQuantity({user, getToken, productId, newQuantity}))
    }

    const isInCart = cartItem && cartItem[id] > 0


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
            {isInCart ?
<div className="flex items-center mt-10 gap-4">
            <div className="flex items-center md:gap-2 gap-1">
                                      <button onClick={() => handleDecreaseProduct(product._id)}>
                                        <Image
                                          src={assets.decrease_arrow}
                                          alt="decrease_arrow"
                                          className="w-4 h-auto"
                                        />
                                      </button>
                                       <input 
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty string temporarily while typing
                      if (value === "") {
                        setInputValue("");
                        return;
                      }
                      
                      const numValue = parseInt(value, 10);
                      if (!isNaN(numValue)) {
                        setInputValue(numValue.toString());
                        handleQuantityChange(numValue);
                      }
                    }}
                    type="number"
                    min="0"
                    value={inputValue}
                    className="w-12 border-0 text-center bg-transparent appearance-none focus:outline-none"
                  />
                                      <button onClick={()=> handleUpdateProduct(product._id)}>
                                        <Image
                                          src={assets.increase_arrow}
                                          alt="increase_arrow"
                                          className="w-4 h-auto"
                                        />
                                      </button>
                                      
                                    </div>
            <button
                onClick={() => {
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                Buy now
              </button>
            </div>
            : 
            <div className="flex items-center mt-10 gap-4">
              <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                  >
                  Add to Cart
                </button>

              <button
                onClick={() => {
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                Buy now
              </button>
            </div>
            
              }
          </div>
        </div>
        <HomeProducts />
      </div>{" "}
    </>
  ) 
};

export default Product;