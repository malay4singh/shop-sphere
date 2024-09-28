import { Avatar, Badge, Box, Button, Typography } from "@mui/material";
import axios from "../api/axios";
import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {

        const navigate = useNavigate();

        const [username, setUsername] = useState<string | null>(null);
        const [roleID, setRoleID] = useState<number | null>(null);
        const [cartNumber, setCartNumber] = useState<number>(0);

        useEffect( () => {
                const loginStatus = async () => {
                        if (!localStorage.getItem('token')){
                                return;
                        } else {
                                const response = await axios.get('/get-user', {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                                });
        
                                if (response.status == 200){
                                        setUsername(response.data.user.username);
                                        setRoleID(response.data.user.roleID)
                                        setCartNumber(response.data.user.cart.length);
                                }
                        }  
                }

                loginStatus();
        }, [])

        const secondary = {
                color: '#F0F0F0'
        }

        const handleLogout = () => {
                localStorage.clear();
                navigate('/products');
                window.location.reload();
        }

        return (
                <Box width={'100dvw'} height={'9dvh'} bgcolor={'rgba(42, 93, 156, 0.96)'} display={'flex'} alignItems={'center'} justifyContent={'center'} position={'fixed'}>
                        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} px={10} alignItems={'center'}>
                                <Box>
                                        <Link to='/home'><img src="/logo.png" width={'200px'} /></Link>
                                </Box>
                                <Box display={'flex'} gap={3} alignItems={'center'}>
                                        <Link to={'/products'}><Button sx={secondary}>Products</Button></Link>
                                        {!username &&
                                                <Link to={'/login'}><Button sx={secondary}>Login / Sign Up</Button></Link>
                                        }

                                        {username && 
                                                <Box display={'flex'} gap={3} alignItems={'center'}>
                                                        {roleID && roleID == 2 &&
                                                                <Link to={'/products/new'}><Button sx={secondary}>Add Product</Button></Link>
                                                        }

                                                        {roleID && roleID == 1 &&
                                                                <Link to={'/cart'}>
                                                                        <Button>
                                                                                <Badge badgeContent={cartNumber} color="error">
                                                                                        <ShoppingCartRoundedIcon sx={secondary} />
                                                                                </Badge>
                                                                        </Button>
                                                                </Link>
                                                        }

                                                        <Box display={'flex'} gap={'8px'} alignItems={'center'}>
                                                                <Avatar sx={{ height: "1.7rem", width: "1.7rem" }}>{username.slice()[0].toUpperCase()}</Avatar>
                                                                <Typography color={'#F0F0F0'} variant="button">{username}</Typography>
                                                        </Box>

                                                        <Button onClick={handleLogout}><LogoutIcon sx={secondary} /></Button>
                                                </Box>
                                        }
                                </Box>
                        </Box>
                </Box>
        )
}

export default memo(Navbar)