import { Box, Typography, Button, styled } from "@mui/material"
import { PropTypes } from "prop-types";
import { addEllipsis } from "../../Utils/common-utils";
import GroupedButton from "./ButtonGroup";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { useState } from "react";


const Component = styled(Box)`
border:1px solid #f0f0f0;
display:flex;
background:#fff;
`;
const LeftComponent = styled(Box)`
margin:20px;
display:flex;
flex-direction:column;
`;
const Image = styled('img')({
    filter: 'brightness(1.2)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
});

const LongTitle = styled(Typography)`
text-decoration:none;
color:#000;
`;
const SellerText = styled(Typography)`
color:#878787;
font-size:14px;
margin-top:10px;
`;
const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 
    transform: translateY(-4px); 
  }
`;


const CartItem = ({ item }) => {
    const fassured = 'assets/ecomchoice.png';

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(item.quantity);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id))
    }

    const increaseQuantity = () => {
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
        dispatch(updateCartItemQuantity(item.id, updatedQuantity)); 
      };
    
      const decreaseQuantity = () => {
        if (quantity > 1) {
          const updatedQuantity = quantity - 1;
          setQuantity(updatedQuantity);
          dispatch(updateCartItemQuantity(item.id, updatedQuantity)); 
        }
      };
   
    return (
        <Component>
            <LeftComponent>
                <Link to={`/product/${item.id}`}>
                    <Image src={item.url} alt='cart item image' style={{ width: 120 }} />
                </Link>
                <GroupedButton 
                quantity={quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                />
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Link to={`/product/${item.id}`}>
                    <LongTitle>{addEllipsis(item.title.longTitle)}</LongTitle>
                </Link>
                <SellerText>Seller:RetailNet
                    <Box component='span'><img src={fassured} alt='flipkart' style={{ width: 50, marginLeft: 20 }} /></Box>
                </SellerText>
                <Typography style={{ margin: '20px 0' }}>
                    <Box component='span' style={{ fontWeight: 600, fontSize: 18 }}>₹{item.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component='span' style={{ color: '#878787' }}><strike>₹{item.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                    <Box component='span' style={{ color: '#388E3C' }}>{item.price.discount}</Box>
                </Typography>
                <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Component>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem;