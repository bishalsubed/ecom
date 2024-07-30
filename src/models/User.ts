import mongoose,{Schema,Document} from "mongoose";

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;

}

const userSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please use a valid email address' ]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verification is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verification Code Expiry Date is required"],
    },
    isVerified:{
        type:Boolean,
        default:false

    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)


export default UserModel