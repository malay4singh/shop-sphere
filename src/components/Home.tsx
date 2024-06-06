import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Home() {

        const [username, setUsername] = useState<string | null>(null);

        useEffect( () => {
                const loginStatus = async () => {
                        if (!localStorage.getItem('token')){
                                return;
                        } else {
                                const response = await axios.get('/get-user', {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                });
        
                                if (response.status == 200){
                                        setUsername(response.data.user.username);
                                }
                        }  
                }

                loginStatus();
        }, [])

        const handleLogout = () => {
                localStorage.clear();
                window.location.reload();
        }

        return (
                <Box bgcolor={'#6A9ACB'} height={'100dvh'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={20} paddingX={20}>
                        <img src="logo-full.png" width={'50%'} />
                        <Box display={'flex'} flexDirection={'column'} gap={5}>
                                <Typography color={'#F0F0F0'} variant="h2" flexBasis={'10%'}>Where shopping goes full circle...</Typography>

                                {!username &&
                                        <Box bgcolor={'#F0F0F0'} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={7} p={5} borderRadius={2} >
                                                <Typography variant="h4">Welcome to Shop Sphere</Typography>
                                                <Box display={'flex'} justifyContent={'space-around'} width={'80%'}>
                                                        <Link to='/login'><Button variant="contained">Login</Button></Link>
                                                        <Link to='/sign-up'><Button variant="outlined">Sign up</Button></Link>
                                                </Box>
                                                <Link to='/products'><Button>Browse as Guest</Button></Link>
                                        </Box>
                                }

                                {username &&
                                        <Box bgcolor={'#F0F0F0'} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={7} p={5} borderRadius={2} >
                                                <Typography variant="h3">Welcome back, {username}</Typography>
                                                <Box display={'flex'} justifyContent={'space-around'} width={'80%'}>
                                                        <Link to='/cart'><Button variant="contained">Go to cart</Button></Link>
                                                        <Button onClick={handleLogout} variant="outlined">Logout</Button>
                                                </Box>
                                                <Link to='/products'><Button>Continue Shopping</Button></Link>
                                        </Box>
                                }
                        </Box>
                </Box>
        )
}

export default Home