import {Box,Table,TableBody,TableCell,TableRow,Typography,styled} from '@mui/material';
import PropTypes from 'prop-types';
import {LocalOffer as Badge} from '@mui/icons-material';
const date = new Date(new Date().getTime()+(5*24*60*60*1000));

const SmallText = styled (Box)`
font-size:14px;
vertical-align:baseline;
& >p {
    font-size:14px;
    margin-top:10px;
}
`
const StyledBadge =styled(Badge)`
margin-right:10px;
margin-left:10px;
color:#00cc00;
font-size:15px;
`

const ColumnText = styled(TableRow)`
font-size:14px;
vertical-align:baseline;
& > td{
    font-size:14px;
    margin-top:10px;
    border:none;
}
`
const ProductDetail = ({product})=>{
    const fassured = '/assets/ecomchoice.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    return (
<>
        <Typography> {product.title.longTitle}</Typography>
                        <Typography style={{color:'#878787', fontSize:14, marginTop: 5 }}>
                            8 Ratings & 1 Review
                            <Box component='span'><img src={fassured} alt="assured image" style={{height:50, width:57 , marginLeft:20}}/></Box>
                        </Typography>
                        <Typography>
                        <Box component='span' style={{fontSize:28}}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component='span' style={{color:'#878787'}}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component='span' style={{color:'#388E3C'}}>{product.price.discount}</Box>
                        </Typography>
                        <Typography>Available Offers</Typography>
                    <SmallText>
                    <Typography>< StyledBadge />₹500 Off on Bikes & Scooters on purchase of ₹30,000 or more T&C</Typography>
                    <Typography>< StyledBadge />Sign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹10,000*</Typography>
                    <Typography>< StyledBadge />Get extra 24% off (price inclusive of cashback/coupon)T&C</Typography>
                    <Typography>< StyledBadge />Flat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999T&C</Typography>
                    <Typography>< StyledBadge />Flat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999T&C</Typography>
                    <Typography>< StyledBadge />Flat ₹50 Instant Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per Paytm accountT&C</Typography>
                    <Typography>< StyledBadge />5% Cashback on Flipkart Axis Bank CardT&C</Typography>
                    </SmallText>
                    <Table>
                        <TableBody>
                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                                <TableCell style={{fontWeight:600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Warrenty</TableCell>
                                <TableCell>No Warrenty</TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Seller</TableCell>
                                <TableCell>
                                    <Box component='span' style={{color:'#2874f0'}}>SuperComNet</Box>
                                    <Typography>GST Invoice Available</Typography>
                                    <Typography>7 Days Replacement Policy</Typography>
                                    <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                                </TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell colSpan={2}>
                                    <img src={adURL} style={{width:390}} alt='flipcartpoints'/>
                                </TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </ColumnText>
                        </TableBody>
                    </Table>
                        </>
    )
}

ProductDetail.propTypes = {
    product:PropTypes.object
}
export default ProductDetail;