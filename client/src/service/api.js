import axios from 'axios';

const URL = 'https://ecomwebapp-backend.onrender.com/';

export const authenticateSignup = async (data) => {
  try {
    const response = await axios.post(`${URL}/signup`, data);
    return response;
  } catch (error) {
    console.log("Error while calling signup API", error);

  }
};

export const authenticateLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);
    return response;
  } catch (error) {
    console.log("Error while calling login API", error);
    return error.response;
  }
};

export const payUsingRazorpay = async (data) => {
  try {
    const response = await axios.post(`${URL}/payment`, data)
    return (response.data);
  } catch (error) {
    console.log('Error while calling payment api', error);
  }
}

export const getKeyId = async () => {
  try {
   const response =  await axios.get(`${URL}/getkey`);
   return response;
  } catch (error) {
    console.log('Error in authentication of payment',error);
  }
}

