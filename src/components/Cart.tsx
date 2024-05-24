import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import CartItem from "./CartItem";
import Loading from "./Loading";

interface Product {
        _id: string,
        title: string,
        category: string,
        price: number,
        desc: string,
        img: string
}

function Cart() {

        const [cart, setCart] = useState<Product[]>([]);
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [refresh, setRefresh] = useState<boolean>(true);

        useEffect( () => {
                const retrieveCart = async () => {
                        try{
                                const response = await axios.get('http://localhost:4001/retrieve-cart', {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                })
                                setCart(response.data.cart);
                        } catch (err) {
                                console.log(err);
                        } finally {
                                setIsLoaded(true);
                        }
                }

                if (refresh) {
                        retrieveCart();
                        setRefresh(false);
                }
        }, [refresh])

        const refreshCart = () => {
                setRefresh(true);
        }

        return (
                <>
                        <Box width={'100%'} height={'20%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                                <img src="cart-icon.svg" width={'50px'} />
                                <Typography variant="h3">My Cart</Typography>
                        </Box>

                        <Box width={'100%'} height={'80%'} display={'flex'}>
                                {!isLoaded &&
                                        <Loading />
                                }
                                
                                {isLoaded &&
                                        <Box flexBasis={'65%'} bgcolor={'#FFFFFF'} display={'flex'} flexDirection={'column'} overflow={'scroll'} padding={2}>
                                                {cart.map( (item, index) => (
                                                        <>
                                                                <CartItem onRemove={refreshCart} id={item._id} title={item.title} category={item.category} price={item.price} img={item.img} key={index} />
                                                                <Divider />
                                                        </>
                                                )) }
                                        </Box>

                                        
                                }

                                {isLoaded &&
                                        <Box flexBasis={'35%'} display={'flex'} justifyContent={'center'}>
                                                <Box bgcolor={'#FFFFFF'} width={'85%'} height={'75%'} mt={3} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} borderRadius={1.5}>

                                                </Box>
                                        </Box>
                                }

                        </Box>
                </>
        )
}

export default Cart