import { Box, Button, Menu, MenuItem } from "@mui/material";
import axios from "../api/axios";
import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

        const navigate = useNavigate();

        const [anchor, setAnchor] = useState<null | HTMLElement>(null);
        const [username, setUsername] = useState<string | null>(null);

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
                                }
                        }  
                }

                loginStatus();
        }, [])

        const secondary = {
                color: '#F0F0F0'
        }

        const open = Boolean(anchor);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchor(event.currentTarget);
        }

        const handleClose = () => {
                setAnchor(null);
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
                                <Box display={'flex'} gap={5}>
                                        <Link to={'/products'}><Button sx={secondary}>Products</Button></Link>
                                        {!username &&
                                                <Link to={'/login'}><Button sx={secondary}>Login / Sign Up</Button></Link>
                                        }
                                        {username && 
                                                <Box>
                                                        <Button 
                                                                sx={secondary}
                                                                id="account-button"
                                                                aria-controls={open ? 'account-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={open ? 'true' : undefined}
                                                                onClick={handleClick}
                                                        >
                                                                Hi, {username}
                                                        </Button>
                                                        
                                                        <Menu
                                                                sx={{padding: '5rem'}}
                                                                id="account-menu"
                                                                anchorEl={anchor}
                                                                open={open}
                                                                onClose={handleClose}
                                                                MenuListProps={{
                                                                'aria-labelledby': 'account-button'
                                                                }}
                                                        >
                                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                                <Link to={'/cart'}><MenuItem sx={{color: 'black'}} onClick={handleClose}>Cart</MenuItem></Link>
                                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                        </Menu>
                                                </Box>
                                        }
                                </Box>
                        </Box>
                </Box>
        )
}

export default memo(Navbar)