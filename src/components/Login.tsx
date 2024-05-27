import axios from '../api/axios';
import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from './Error';

interface Details {
        username: String,
        passwd: String
}

function Login() {
        const navigate = useNavigate();

        useEffect(() => {
                const isLoggedIn = () => {
                        if (localStorage.getItem('token')){
                                navigate('/products');
                        }
                }

                isLoggedIn();
        }, [])

        const [loginDetails, setLoginDetails] = useState<Details>({
                username: '',
                passwd: ''
        })

        const [loginFailed, setLoginFailed] = useState<boolean>(false);

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
                e.preventDefault();

                try{
                        const response = await axios.post('/login', loginDetails);

                        if (response.status == 200){
                                localStorage.setItem('token', response.data.token);
                                navigate('/products');
                        }
                } catch (err) {
                        setLoginFailed(true);
                }
        }

        const removeError = () => {
                setLoginFailed(false);
        }

        return (
                <Box bgcolor={'#6A9ACB'} height={'100dvh'} display={'flex'} alignItems={'center'} justifyContent={'center'} >

                        <Box display={'flex'} height={'75%'} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}>

                                <img src="login-art.jpg" height={'100%'} />

                                <Box bgcolor={'#F0F0F0'} padding={8} display={'flex'} alignItems={'center'}>
                                        <form onSubmit={handleSubmit}>
                                                <Box display={'flex'} flexDirection={'column'} gap={5}>

                                                        <Box display={'flex'} flexDirection={'column'} marginBottom={4}>
                                                                <Typography variant="h4">Login</Typography>
                                                                <Typography variant="overline">Welcome Back, Please login to your account.</Typography>
                                                        </Box>

                                                        <TextField label="Username" variant="outlined" name="username" onChange={(e) => {
                                                                setLoginDetails({...loginDetails, username: e.target.value})
                                                        }} />
                                                        <TextField label="Password" variant="outlined" name="passwd" type='password' onChange={(e) => {
                                                                setLoginDetails({...loginDetails, passwd: e.target.value})
                                                        }} />

                                                        <Box marginTop={4} display={'flex'} px={1.5} justifyContent={'space-between'}>
                                                                <Link to={'/sign-up'}><Button size="large" variant="outlined">Create Account</Button></Link>
                                                                <Button type={"submit"} size="large" variant="contained">Login</Button>
                                                        </Box>

                                                </Box>
                                        </form>
                                </Box>

                        </Box>

                        {loginFailed &&
                                <Error message='Invalid Credentials' onClose={removeError} />
                        }
                        
                </Box>
        )
}

export default Login;