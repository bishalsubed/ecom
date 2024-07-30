import mongoose, { Schema, Document } from "mongoose";
import { Product as ProductModel } from "./Product";

export interface Order extends Document {
    username: string;
    phoneNumber: number;
    address: string;
    amount: number;
    products: ProductModel[];
    createdAt: Date;
}


const orderSchema: Schema<Order> = new Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v: number) {
                return /^[0-9]{10}$/.test(v.toString());
            },
            message: 'Phone number must be a 10-digit number'
        }
    },
    address: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", orderSchema);

export default OrderModel;