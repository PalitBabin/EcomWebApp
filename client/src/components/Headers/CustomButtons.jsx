import {Box,Button, Typography,Badge,styled} from '@mui/material'
import {ShoppingCart} from '@mui/icons-material';
import LoginDialog from '../login/LoginDialog';
import { useState,useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const ButtonWrapper = styled(Box)(({theme})=>({
display:'flex',
marginLeft:'3%',
'& > *':{
   marginRight:'40px !important',
   fontSize:16,
   alignItems:'center',
},
[theme.breakpoints.down('md')]:{
    display:'block'
}
}));

const CartContainer = styled(Link)(({theme})=>({
  display:'flex',
  textDecoration:'none',
  color:'inherit',
  '&:hover':{
    color:'#E76161',
    cursor:'pointer',
},
[theme.breakpoints.down('md')]:{
display:'block'
}
}));

const SellerText = styled(Typography)`
margin-top:3px;
width:145px;
&:hover{
    color:#E76161;
    cursor:pointer;
}
`;
const MoreText = styled(Typography)`
margin-top:3px;
&:hover{
    color:#E76161;
    cursor:pointer;
}
`;

const LoginButton = styled(Button)`
color:#BB2525;
background-color:#ffffff;
text-transform:none;
padding:5px 40px;
border-radius:2px;
box-shadow:none;
font-weight:600;
height:32px;
&:hover{
    color:#FFFFFF;
    background-color:#016A70;
    cursor:pointer;
}
`;

const CustomButtons = ()=>{

    const [open, setOpen] = useState(false);
    const {account,setAccount}  = useContext(DataContext);
    const openDialog = ()=>{
        setOpen(true);
    }

    const {cartItems} = useSelector(state=>state.cart)
    return (
        <ButtonWrapper>
            {
                account?<Profile account={account} setAccount = {setAccount}/> :
            <LoginButton variant="contained" onClick={()=>openDialog()}>Login</LoginButton>

            }
            <SellerText >Become a Seller</SellerText>
            <MoreText style={{marginTop:3}}>More</MoreText>

            <CartContainer to='/cart'>
                <Badge badgeContent={cartItems?.length} color='secondary'>
                <ShoppingCart/>
                </Badge>
                <Typography style={{marginLeft:2}}>Cart</Typography>
            </CartContainer>
            <LoginDialog open={open} setOpen={setOpen}/>
        </ButtonWrapper>
    )
}
export default CustomButtons;