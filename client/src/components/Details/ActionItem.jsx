import { Box, Button,styled } from '@mui/material'
import PropTypes from 'prop-types';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useState } from 'react';
import { payUsingRazorpay,getKeyId} from '../../service/api';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}));
const Image = styled('img')(({ theme }) => ({
    width: '95%',
    padding: '15px',
    [theme.breakpoints.down('md')]: {
        width: '90%'
    }
}));
const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: 50,
    borderRadius: 2,
    [theme.breakpoints.down('lg')]: {
        width: '46%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%'
    }
}));

const ActionItem = ({ product }) => {
    // eslint-disable-next-line no-unused-vars
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = product;
    const { price: { cost } } = product;

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity))
        navigate('/cart');
    }
    const buyNow = async (cost) => {
        const response = await payUsingRazorpay({ amount: cost });
        const {amount,id} = response;
        const authKey = await getKeyId()
        
        const {data:{key}} = authKey;
        const options = {
            key: key, 
            amount: amount, 
            currency: "INR",
            name: "Babu",
            description: "Test Transaction",
            image: "https://e1.pxfuel.com/desktop-wallpaper/595/1008/desktop-wallpaper-shin-chan-cartoon-most-popular-sinchan-mobile-thumbnail.jpg",
            order_id:id, 
            callback_url: "http://localhost:8000/verification",
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
        const razor = new window.Razorpay(options);
            razor.open();
        }
    
    return (


        <LeftContainer>
            <Box style={{ border: '1px solid #f0f0f0', padding: '15px 20px', marginBottom: 10 }}>
                <Image src={product.detailUrl} alt='product image' />
            </Box>
            <StyledButton variant='contained' style={{ marginRight: 10, background: '#ff9f00' }} onClick={() => addItemToCart()}><Cart />Add to Cart</StyledButton>
            <StyledButton variant='contained' onClick={() => buyNow(cost+40)} style={{ background: '#fb541b' }}><Flash />Buy Now</StyledButton>
        </LeftContainer>
    );
}

ActionItem.propTypes = {
    product: PropTypes.object,
}
export default ActionItem;