import { AppBar, Toolbar, styled, Box, IconButton ,Drawer,ListItemIcon,ListItemButton} from '@mui/material';
import Search from './Search';
import CustomButtons from './CustomButtons';
import {Link} from 'react-router-dom'; 
import {Menu} from '@mui/icons-material';
import { useState } from 'react';

const StyleHeader = styled(AppBar)`
    height:55px;
    background:#BB2525;
    `;
  
const ComponentBox = styled(Link)`
margin-left:12%;
line-height:0;
color:inherit;
text-decoration: none;
`


const CustomButtonWrapper = styled(Box)(({theme})=>({
margin:' 0 5% 0 auto',
[theme.breakpoints.down('md')]:{
    display:'none'
 }
}));
const MenuButton = styled(IconButton)(({theme})=>({
    display:'none',
    [theme.breakpoints.down('md')]:{
        display:'block'
     } 
}));


const Header = () => {

    const [open, setOpen] = useState(false);

    const logoURL = "/assets/ecom.png";

    const handleOpen = ()=>{
        setOpen(true);
    }

    const handleClose =()=>{
        setOpen(false);
    }
    const list = ()=>{
        return(
        <Box style={{width:200}} onClick={handleClose}>
            <ListItemButton>
                <ListItemIcon>
                    <CustomButtons />
                </ListItemIcon>
            </ListItemButton>
            </Box>
        )
    }
    return (
        <StyleHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton color='inherit' onClick={handleOpen}>
                    <Menu />
                </MenuButton>
                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
                <ComponentBox to='/'>
                    <img src={logoURL} alt="Ecom Logo" style={{ width: 120 }} />
                </ComponentBox>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>

            </Toolbar>
        </StyleHeader>
    )
}
export default Header;