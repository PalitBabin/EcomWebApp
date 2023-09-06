import Carousel from 'react-multi-carousel';
import PropTypes from 'prop-types';
import 'react-multi-carousel/lib/styles.css';
import { Box, Typography, Button, Divider, styled } from '@mui/material'
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        
    }
};

const Component = styled(Box)`
    margin-top:10px;
    background:#FFFFFF;
 `;


const Deal = styled(Box)`
padding:15px 25px;
display:flex;
`;
const Timer = styled(Box)`
display:flex;
margin-left:10px;
align-items:center;
color:#7f7f7f;
`;
const DealText = styled(Typography)`
font-size:22px;
font-weight:600;
margin-right: 25px;
line-height: 32px;
`;
const ViewAllButton = styled(Button)`
margin-left:auto;
font-size:13px;
background:#FF6969;
border-radius:2px;
font-weight:600;
&:hover{
    background-color:#016A70;
}
`;
const Image = styled('img')({
  width: '200px',
  height: '160px', 
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out', 
  boxShadow: ' -1px 1px 34px -6px rgba(239,189,189,0.75)',
webkitBoxShadow: '-1px 1px 34px -6px rgba(239,189,189,0.75)',
mozBoxShadow: '-1px 1px 34px -6px rgba(239,189,189,0.75)',
  '&:hover': {
    transform: 'scale(1.08)',
    filter:' brightness(1.05)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
});

const Text = styled(Typography)`
font-size:14px;
margin-top:5px;
`;

const ProductBox = styled(Box)`


`;
const Slide = ({ products=[], title, timer }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return <Box variant='span'>{hours}:{minutes}:{seconds} Left</Box>;
    }
    
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    timer && <Timer>
                        <img src={timerURL} alt='timer' style={{ width: 24 }} />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                }

                <ViewAllButton variant='contained' color='primary'>View All</ViewAllButton>
            </Deal>
            <Divider />
            {
                products.length !== 0 ?
                    (<Carousel
                        responsive={responsive}
                        swipeable={false}
                        draggable={false}
                        infinite={true}
                        slidesToSlide={1}
                        keyBoardControl={true}
                        centerMode={true}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {

                            products.map((product, index) => (
                                <Link key={index} to={`product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <ProductBox textAlign='center' style={{ padding: '25px 15px' }}>
                                        <Image src={product.url} alt='product images' />
                                        <Text style={{ fontWeight: 600, color: '#212121' }}>{product.title.shortTitle}</Text>
                                        <Text style={{ color: 'green' }}>{product.discount}</Text>
                                        <Text style={{ color: '#212121', opacity: ".6" }}>{product.tagline}</Text>
                                    </ProductBox>
                                </Link>

                            ))
                        }
                    </Carousel>)
                    :
                    (<Carousel
                        responsive={responsive}
                        swipeable={false}
                        draggable={false}
                        infinite={true}
                        slidesToSlide={1}
                        keyBoardControl={true}
                        centerMode={true}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        <Box textAlign='center' style={{ padding: '25px 15px' }}>
                            <Typography>No products to display.</Typography>
                        </Box>
                    </Carousel>)
            }
        </Component>
    )
}

Slide.propTypes = {
    products: PropTypes.array,
    title: PropTypes.string.isRequired,
    timer: PropTypes.bool.isRequired,
}
export default Slide;