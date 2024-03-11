import mongoose from "mongoose";

const dbConnection = ()=>{
    const connectionParams = {useNewUrlParser:true}
    mongoose.connect(process.env.DB,connectionParams);
}