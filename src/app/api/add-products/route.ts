import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { uploadOnCloudinary } from "@/helpers/uploadOnCloudinary";

function generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
export async function POST(request: Request) {
    await dbConnect();

    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const desc = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const category = formData.get('category') as string;
        const stock = parseInt(formData.get('stock') as string, 10);
        const color = formData.get('color') as string;
        const productImage = formData.get("image") as File | null;

        if (!title?.trim() || !desc?.trim() || isNaN(price) || !category?.trim() ||
            isNaN(stock)  || !color?.trim()) {
            return Response.json({ message: "All fields should be provided" }, { status: 400 });
        }
        if (!productImage) {
            return Response.json({ message: "No image file found" }, { status: 400 });
        }

        if (!(productImage instanceof File)) {
            return Response.json({ message: "Invalid file object" }, { status: 400 });
        }

        const fileBuffer = await productImage.arrayBuffer();
        const mimeType = productImage.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = `data:${mimeType};${encoding},${base64Data}`;

        const res = await uploadOnCloudinary(fileUri, productImage.name);

        if (!(res?.success && res?.result)) {
            return Response.json({ message: "failure" }, { status: 500 });
        }

        const imgUrl = res.result.data.secure_url;
        const slug = generateSlug(title);

        const newProduct = new ProductModel({
            title,
            desc,
            price,
            category,
            stock,
            image: imgUrl,
            slug,
            color,
        });

        await newProduct.save();

        return Response.json({
            success: true,
            message: "Product Registered Successfully."
        }, { status: 201 });


    } catch (error) {
        console.error("Error registering the product", error);
        return Response.json({
            success: false,
            message: "Error registering product"
        }, { status: 500 });
    }
}
