import NavBar from "./NavBar";
import Banner from "./Banner";
import {Box,styled} from "@mui/material";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector} from "react-redux";

const Container = styled(Box)`
padding:10px;
background:#F5F5F
`

const Home = ()=>{

    const {products} = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch]);
    
    return(
        <>
        <NavBar />
        <Container>
        <Banner />
        <MidSlide products={products} title='Deal of the day' timer={true}/>
        <MidSection />  
        <Slide products={products}  title='Discounts for You' timer={false}/>
        <Slide products={products}  title='Suggested Items' timer={false}/>
        <Slide products={products}  title='Top selection' timer={false}/>
        <Slide products={products}  title='Recommended Items' timer={false}/>
        <Slide products={products}  title='Top Selling' timer={false}/>
        </Container>
       
        </>
        
    )
}
export default Home;