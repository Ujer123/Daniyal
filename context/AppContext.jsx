'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios, { AxiosHeaders } from "axios";


export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()
    const { user } = useUser()
    const { getToken } = useAuth()
    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})

    // const fetchProductData = async () => {
    //     try {
    //         const {data} = await axios.get('api/product/list');
    //         if(data.success){
    //             setProducts(data.products)
    //         }else{
    //             console.error(data.message)
    //         }

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    // const fetchUserData = async () => {
    //     try {
    //         if(user.publicMetadata.role === 'seller'){
    //             setIsSeller(true)
    //         }
    //         const token = await getToken()
    //         const  {data} = await axios.get('/api/user/data', {headers: {Authorization: `Bearer ${token}`}})
    //         if(data.success){
    //             setUserData(data.user)
    //             setCartItems(data.user.cartItems)
    //         }else{
    //             console.error(data.message)
    //         }
    //     } catch (error) {
    //         console.error(error.message)            
    //     }
    // }

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
    }

    const getTotalCartItems = () =>{
        return Object.keys(cartItems).length;
    }



    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    // useEffect(() => {
    //     fetchProductData()
    // }, [])

    // useEffect(() => {
    //     if(user){
    //         fetchUserData()
    //     }
    // }, [user])

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, 
        // fetchUserData,
        products, 
        // fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartAmount,
        getTotalCartItems, user,
        getToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}