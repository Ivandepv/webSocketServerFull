import mongoose from "mongoose";


export const dbConnection = async()=>{
    const url: string = process.env.MONGODB_CNN || '';

    // I can't put init options but in js I can
    await mongoose.connect(url);

    console.log('dabatase running');
    
}

