'use client'
import React, {useCallback} from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, selectCartItemsWithDetails } from "@/lib/features/cart/cartSelectors";
import { updateCartOnServer, decreaseCartOnServer, removeCartOnServer, updateCartQuantity } from "@/lib/features/user/userSlice";

const Cart = () => {
  const {router, user, getToken } = useAppContext()
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItemsWithDetails);

  const cartCount = useSelector(selectCartCount);  

  const handleUpdateProduct =useCallback((productId)=>{
    dispatch(updateCartOnServer({user, getToken, productId}))
  }, [dispatch, user, getToken])

  const handleDecreaseProduct = useCallback((productId)=>{
    dispatch(decreaseCartOnServer({user, getToken, productId}))
  },[dispatch, user, getToken])

  const handleRemoveProduct = useCallback((productId)=>{
    dispatch(removeCartOnServer({user, getToken, productId}))
  }, [dispatch, user, getToken])

  const handleQuantityChange = useCallback((productId, newQuantity)=>{
    dispatch(updateCartQuantity({user, getToken, productId, newQuantity}))
  }, [dispatch, user, getToken])

  const handleContinueShopping = useCallback(()=>{
    router.push('/all-products');
  }, [router])


  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{cartCount} Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                    <tr key={item.product._id}>
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <div>
                          <div className="rounded-lg overflow-hidden bg-gray-500/10">
                            <Image
                              src={item.product.image[0]}
                              alt={item.product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                              width={64}
                              height={64}
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-orange-600 mt-1"
                            onClick={() => handleRemoveProduct(item.product._id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-sm hidden md:block">
                          <p className="text-gray-800">{item.product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => handleRemoveProduct(item.product._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">${item.product.offerPrice}</td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                          <button onClick={() => handleDecreaseProduct(item.product._id)}>
                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-auto"
                            />
                          </button>
                          <input onChange={e => handleQuantityChange(item.product._id, Number(e.target.value))} type="number" value={item.quantity} className="w-8 border text-center appearance-none"></input>
                          <button onClick={()=> handleUpdateProduct(item.product._id)}>
                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-auto"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">${item.subtotal.toFixed(2)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <button onClick={handleContinueShopping} className="group flex items-center mt-6 gap-2 text-orange-600">
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
