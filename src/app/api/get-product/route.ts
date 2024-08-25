import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/Product";

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        if (!id) {
            return Response.json({
                success: false,
                message: "Unable to find id of the product"
            }, { status: 400 })
        }
        const existingProduct = await ProductModel.findById(id)
        if (!existingProduct) {
            return Response.json({
                success: false,
                message: "Unable to find the product"
            }, { status: 400 })
        }
        return Response.json({
            success: true,
            message: "Product Obtained",
            data: existingProduct
        }, { status: 200 })
    } catch (error) {
        console.error("Error Obtaining Product", error)
        return Response.json({
            success: false,
            message: "Error Obtaining Product"
        }, { status: 500 })
    }
}