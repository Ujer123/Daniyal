import Product from "@/models/Product";
import dbConnect from "@/config/db";

export async function GET(request, { params }) {
  const { id } = await params;
  
  try {
    await dbConnect();
    const product = await Product.findById(id);
    
    if (!product) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, product }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || "Failed to fetch product" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}