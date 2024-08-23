import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    try {
        await dbConnect();
        const products = await ProductModel.find().skip(skip).limit(limit).lean();
        const total = await ProductModel.countDocuments();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Products obtained successfully",
                data: products,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }),
            { status: 201 }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message || "Error fetching products",
            }),
            { status: 500 }
        );
    }
}
