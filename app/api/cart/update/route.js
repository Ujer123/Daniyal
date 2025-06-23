import dbConnect from "@/config/db"
import User from "@/models/User"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
        const {userId} = getAuth(request)
        console.log("userId:", userId)
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        console.log("Request body:", body)
        const {cartItem} = body

        if (!cartItem) {
            return NextResponse.json({ success: false, message: "No cartItem provided" }, { status: 400 })
        }

        await dbConnect()
        const user = await User.findById(userId)
        console.log("User found:", user)

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }

        user.cartItem = cartItem
        await user.save()

        return NextResponse.json({success: true})

    } catch (error) {
        console.error("Error in /api/cart/update:", error)
        return NextResponse.json({success: false, message: error.message}, { status: 500 })
    }
}