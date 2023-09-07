import { InputBase, Box,List,ListItem ,styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
background:#fff;
margin-left:20px;
width:38%;
border-radius:2px;
display:flex;
transition: box-shadow 0.3s;
&:focus-within {
    box-shadow: 0 0 5px 2px #FFFFDD;
}
`;
const InputSearchBase = styled(InputBase)`
padding-left:20px;
width:100%;
font-size:unset;
`;
const SearchIconWrapper = styled(Box)`
color:#BB2525;
padding:5px;
display:flex;
`;
const ListWrapper =styled(List)`
position:absolute;
background:#ffffff;
color:#000;
margin-top:36px;
`;
const Search = () => {
     const [text,setText] = useState('');

    const getText =(e)=>{
        setText(e.target.value)
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    const {products} = useSelector(state=>state.getProducts);


    return (
        <SearchContainer>
            <InputSearchBase
             placeholder='Search for products, brands and more'
             onChange={(e)=>getText(e)} 
             value={text}
             />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>

            {
                text && 
                <ListWrapper>
                        {
                            products && products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                <ListItem key={product.id}>
                                    <Link to={`product/${product.id}`}
                                    onClick={()=>setText('')}
                                    style={{textDecoration:'none', color:"inherit"}}
                                    >
                                    {product.title.longTitle}
                                    </Link>
                                    
                                </ListItem>
                            ))
                        }
                </ListWrapper>
            }
        </SearchContainer>

    )
}
export default Search;