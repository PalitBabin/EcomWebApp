import { useDispatch, useSelector} from "react-redux";
import { Grid, Typography, Box, Button, styled } from '@mui/material'
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./EmptyCart";
import { payUsingRazorpay,getKeyId} from '../../service/api';
import { removeFromCart } from "../../redux/actions/cartActions";

const Container = styled(Grid)(({theme})=>({
padding:'30px 135px',
[theme.breakpoints.down('md')]:{
    padding:'15px 0'
}
}));
const Header = styled(Box)`
padding:15px 24px;
background:#fff;
`
const ButtonWrapper = styled(Box)`
background:#fff;
padding:16px 22px;
box-shadow:0 -2px 10px 0 rgb(0 0 0 /10%);
border-top: 1px solid #f0f0f0;
`
const StyledButton = styled(Button)`
display:flex;
margin-left:auto;
background: #BB2525;
color: #fff;
border-radius: 2px;
width: 250px;
height: 51px;
&:hover{
    background-color:#016A70;
    cursor:pointer;
}
`
const LeftComponent = styled(Grid)(({theme})=>({
paddingRight:15,
[theme.breakpoints.down('md')]:{
    marginBottom:15
}
}));
const Cart = () => {

    const { cartItems } = useSelector(state => state.cart);
    
    const getTotalCost = () => {
        return cartItems.reduce((total, item) => (total + item.price.cost * item.quantity), 0);
      };

      const cost = getTotalCost();

    const dispatch = useDispatch();

    const buyNow = async (cost) => {
        const response = await payUsingRazorpay({ amount: cost });
        const {amount,id} = response;
        const authKey = await getKeyId();
        const {data:{key}} = authKey;

        const options = {
            key: key, 
            amount: amount, 
            currency: "INR",
            name: "Babu",
            description: "Test Transaction",
            image: "https://e1.pxfuel.com/desktop-wallpaper/595/1008/desktop-wallpaper-shin-chan-cartoon-most-popular-sinchan-mobile-thumbnail.jpg",
            order_id:id, 
            callback_url:'https://ecomwebapp-backend.onrender.com/verification' ,
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                color: "#121212"
            }
        };
    
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return;
          }
        const razor = new window.Razorpay(options);
             razor.open(); 
             // eslint-disable-next-line no-unused-vars
             razor.on("payment.success", (request,response) => {
                console.log(request);
                for (const item of cartItems) {
                  dispatch(removeFromCart(item.id));
                }
              });
              
        }

        
       
    return (
        <>
            {
                cartItems.length ?
                    < Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My cart ({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map((item, index) => (
                                    <CartItem key={index} item={item} />
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton variant="contained" onClick={()=>buyNow(cost+40)}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalBalance cartItems={cartItems}/>
                        </Grid>
                    </ Container>
                    :
                    <EmptyCart />
            }
        </>
    )
}
export default Cart;