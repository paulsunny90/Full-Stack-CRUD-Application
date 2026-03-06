import mongoose  from "mongoose";

const connectdb =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db conected")
        
    } catch (error) {
        console.log("not conected");
        
    }
}

export  default connectdb