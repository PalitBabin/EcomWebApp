
import { navData } from "../../constants/data";
import { Box, Typography,styled } from "@mui/material";

const Component = styled(Box)(({theme})=>({
display:'flex',
justifyContent:'space-between',
margin: '65px 130px 0 130px',
overflow:'overlay',
[theme.breakpoints.down('lg')]:{
    margin:0,
}
}));

const Container = styled(Box)`
padding:12px 8px;
text-align:center;
height:auto;
&:hover {
    img {
      filter: brightness(1.2); 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); 
    }
  }
`
const Text = styled(Typography)`
font-size:14px;
font-weight:600;
font-family:inherit;
`
const NavBar = ()=>{
    return(
        <Box style={{background:'#FFFFFF'}}>
        <Component>
            {
        navData.map((data,index)=>(
            <Container key={index}>
                <img src={data.url} alt="nav icon" style={{width:64}}/>
                <Text>{data.text}</Text>
            </Container>
        ))
       }
        </Component>
        </Box>
    )
}
export default NavBar;