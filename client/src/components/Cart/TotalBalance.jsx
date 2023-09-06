import { Box, Typography, styled } from '@mui/material';
import { PropTypes } from "prop-types";
import { useState, useEffect } from 'react';

const Header = styled(Box)`
padding:15px 24px;
background:#fff;
border-bottom:1px solid #f0f0f0;
`
const Heading = styled(Typography)`
color:#878787;
`
const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
    & > h6{
        margin-bottom: 20px;  
    }
`;
const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
    font-weight:600;
`
const Price = styled(Typography)`
    float: right;
`;
const TotalBalance = ({ cartItems}) => {

    // eslint-disable-next-line no-unused-vars
    const [price, setPrice] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [discount, setDiscount] = useState(0);

    useEffect(()=>{
        totalAmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartItems])

    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            price += (item.price.mrp)*item.quantity;
            discount += (item.price.mrp - item.price.cost)*item.quantity;
        })
        setPrice(price);
        setDiscount(discount);
    }
console.log(cartItems);
    return (
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({cartItems?.length} item)
                    <Price component='span'>₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component='span'>-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component='span'>₹40</Price>
                </Typography>
                <Typography variant='h6'>Total Amount
                    <Price component='span'>₹{price-discount+40}</Price>
                </Typography>
                <Discount >You Will save ₹{price-discount+40} on this order</Discount >
            </Container>
        </Box>
    )
}

TotalBalance.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  
}
export default TotalBalance;