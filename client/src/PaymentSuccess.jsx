import {Box,Typography,styled} from '@mui/material'
import { useSearchParams,Link} from 'react-router-dom';

const Component =styled(Box)`
height:100vh;
width:100%;
display:flex;
justify-content:center;
`

const Container = styled(Box)`
align-self:center;
flex-direction:column;
align-item:center;
`
const Text =styled(Typography)`
font-size:22px;
font-weight:600;
text-align:center;
`
const CartButton = styled(Link)`
display:flex;
justify-content:center;
text-decoration:none;
padding:5px;
background:#2874f0;
`
const PaymentSuccess = ()=>{

    const searchQuery = useSearchParams()[0];

    const referenceID = searchQuery.get("reference")
    return (
        <Component>
            <Container>
                <Text>Order Successful</Text>
                <Typography>Reference No:{referenceID}</Typography>
                <CartButton to='/cart' variant="outlined">Go Back</CartButton>
            </Container>
        </Component>
    )
}

export default PaymentSuccess;