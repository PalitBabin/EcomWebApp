
import { instance } from "../index.js";
import crypto from 'crypto';

export const addPaymentGateway = async(request,response)=>{
    try{
        const options = {
            amount: request.body.amount*100, 
            currency: "INR",
          };
          const order = await instance.orders.create(options);
     
          response.status(200).json(order);
    }catch(error){
        console.log('Error while fetching payment api data',error);
    }
}

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_API_KEY_SECRET;
    const data = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto.createHmac('sha256', secret).update(data).digest('hex');
    
    if (generated_signature === razorpay_signature) {
      
      res.redirect(`https://ecom-web-app-omega.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`);
    }
  } catch (error) {
    res.status(400).json({success: false});
  }
}