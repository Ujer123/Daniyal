'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext} from "react";
import { useAuth, useUser } from "@clerk/nextjs";


export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()
    const { user } = useUser()
    const { getToken } = useAuth()


    const value = {
        currency, router,    
        user,
        getToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}