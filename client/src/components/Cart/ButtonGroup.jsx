import { Button, ButtonGroup, styled } from '@mui/material';

const Component = styled(ButtonGroup)`
margin-top:20px;
`
const StyledButton = styled(Button)`
border-radius:50%;
`
// eslint-disable-next-line react/prop-types
const GroupedButton = ({ quantity, increaseQuantity, decreaseQuantity }) => {

    
    return (
        <Component>
            <StyledButton onClick={decreaseQuantity} >-</StyledButton>
            <Button disabled>{quantity}</Button>
            <StyledButton onClick={increaseQuantity}>+</StyledButton>
        </Component>

    )
}


export default GroupedButton;