import { Box, Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface CartItemProps {
        id: string,
        title: string,
        category: string,
        price: number,
        img: string,
        onRemove: () => void
}

function CartItem(props: CartItemProps) {

        const link = `/products/${props.id}`

        const navigate = useNavigate();

        const removeFromCart = async () => {
                try {
                        const response = await axios.delete(`/cart/${props.id}`, {
                                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        });

                        if (response.status == 200) {
                                props.onRemove();
                        }
                } catch (err) {
                        localStorage.removeItem('token');
                        navigate('/login');
                }
        }

        return (
                <Box position={'relative'} display={'flex'} padding={3} justifyContent={'space-between'} bgcolor={'#FFFFFF'}>

                        <Box flexBasis={'30%'}>
                                <img src={props.img} width={'320px'} height={'220px'} style={{borderRadius: '12px'}} />
                        </Box>

                        <Box flexBasis={'60%'} display={'flex'} flexDirection={'column'} p={1} gap={5}>
                                <Box>
                                        <Typography color={'#9CA3AF'} variant="overline">{props.category}</Typography>
                                        <Link to={link}><Typography color={'black'} variant="h5">{props.title}</Typography></Link>
                                </Box>
                                <Box>
                                        <Typography color={'black'} variant="h5">₹ {props.price}</Typography>
                                </Box>
                                <Box>
                                        <Button
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                startIcon={<Delete />}
                                                onClick={removeFromCart}
                                        >
                                                Remove
                                        </Button>
                                </Box>
                        </Box>

                </Box>
        )
}

export default CartItem