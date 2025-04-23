'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import store from "@/lib/store";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

// export const metadata = {
//   title: "Daniyal Perfumes",
//   description: "E-Commerce with Next.js ",
// };

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Provider store={store}>
          <Toaster />
          <AppContextProvider>
          <Navbar/>
            {children}
          <Footer/>
          </AppContextProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
