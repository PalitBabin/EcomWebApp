import mongoose from 'mongoose';

export const RTCPeerConnection = async (username,password)=>{
    const URL = `mongodb+srv://${username}:${password}@ecomflipkart.yl10gib.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Database Connected Successfully");
    }catch(error){
        console.log("Error while connecting with the database",error.message);
    }

}