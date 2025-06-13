import { clerkClient } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

const authSeller = async(request)=>{
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(request.userId);
    if(user.publicMetadata.role === 'seller'){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return NextResponse.json({success: false, message: error.message});
  }
}

export default authSeller;