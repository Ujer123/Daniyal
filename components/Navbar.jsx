"use client"
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import Image from "next/image";
import { FaCartFlatbed } from "react-icons/fa6";
import { useClerk, UserButton, useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "@/lib/features/user/userSlice";

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {user}  = useUser();
  const { getToken } = useAuth();
  const { isSeller, userData, loading, error, cartItem } = useSelector((state) => state.user);


  const {openSignIn} = useClerk()

  const getTotalCartItems =()=> Object.values(cartItem).length

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData({ user, getToken }));
    }
  }, [dispatch, user]);


  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.Logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Link className="relative" href='/cart'>
        <span className="absolute bottom-3 text-xs bg-orange-500 text-white h-5 w-5 rounded-full flex justify-center items-center left-3">{getTotalCartItems()}</span>
        <FaCartFlatbed/>
        </Link>
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user 
        ? <>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={()=> router.push('/cart')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={()=> router.push('/my-orders')}/>
          </UserButton.MenuItems>
        </UserButton>
        </>
        :<button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        {user 
        ? <>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={()=> router.push('/')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={()=> router.push('/all-products')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={()=> router.push('/cart')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={()=> router.push('/my-orders')}/>
          </UserButton.MenuItems>
        </UserButton>
        </>
        :<button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;