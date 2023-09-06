import { Dialog, Box, styled, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { authenticateLogin, authenticateSignup } from '../../service/api';
import { DataContext } from '../../context/DataProvider';


const Component = styled(Box)(({theme})=>({
    height:'70vh',
    width:'90vh',
    [theme.breakpoints.down('md')]:{
        height:'40vh',
    width:'50vh',
    },
}))


const Image = styled(Box)`
background: #016A70 url(assets/ecom.png) center 85% no-repeat;
background-size:50%;
height:82.8%;
width:30%;
padding:45px 35px;
& > h5, & >p {
    color:#ffffff;
    font-weight:600;
}
`
const Wrapper = styled(Box)`
display:flex;
flex-direction:column;
padding:25px 35px;
flex:1;
& > div, & > button, & > p{
    margin-top:20px;
}
`

const LoginButton = styled(Button)`
text-transform:none;
background:#016A70;
color:#fff;
height:48px;
border-radius:2px;
&:hover{
    color:#FFFFFF;
    background-color:#016A70;
    cursor:pointer;
}
`
const RequestOTP = styled(Button)`
text-transform:none;
background:#fff;
color:#016A70;
height:48px;
border-radius:2px;
box-shadow:0 2px 4px 0 rgb(0 0 0/20%);
`
const Text = styled(Typography)`
font-size:12px;
color:#878787;
`
const CreateAccount = styled(Typography)`
font-size:14px;
font-weight:600;
color:#016A70;
text-align:center;
cursor:pointer;
`
const Error = styled(Typography)`
    font-size:10px;
    line-height:0;
    color:#ff6161;
    margin-top:10px;
    font-weight:600;
`
const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subheading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: 'Looks like you\'re new here!',
        subheading: 'Sign up with your mobile number to get started'
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}
const LoginDialog = ({ open, setOpen }) => {

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const { setAccount } = useContext(DataContext);
    const [login, setLogin] = useState(loginInitialValues)
    const [error, setError] = useState(false);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });

    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const signupUser = () => {
        authenticateSignup(signup);
        if (!Response) return;
        handleClose();
        setAccount(signup.firstname);
    }

    const loginUser = async () => {
        let response = await authenticateLogin(login)
        if (response.status === 200) {
            handleClose();
            setAccount(response.data.data.firstname)
        }else{
            setError(true)
        }
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }} >
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant='h5'>{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subheading}</Typography>
                    </Image>
                    {account.view === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name="username" label="Enter Username"></TextField>
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name="password" label="Enter Password"></TextField>
                            {error && <Error>Please enter valid username or password</Error>}

                            <Text>By continuing, you agree to Ecom&apos;s Terms of Use and Privacy Policy.</Text>
                            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignup()}>New to Ecom? Create an account</CreateAccount>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label="Enter First Name"></TextField>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label="Enter Last Name"></TextField>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Enter Username"></TextField>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label="Enter Email"></TextField>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter Password"></TextField>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label="Enter Phone"></TextField>
                            <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

LoginDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}

export default LoginDialog;