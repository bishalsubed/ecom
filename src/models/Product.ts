import mongoose, {Schema,Document} from "mongoose";

export interface Product extends Document{
    title:string;
    desc: string;
    price:number;
    category:string;
    stock:number;
    image:string;
    rating:number;
    slug:string;
    size:string;
    color:string;
    createdAt: Date;
}

const productSchema:Schema<Product> = new Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    size:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
})

const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || mongoose.model<Product>("Product",productSchema)


export default ProductModel