import axios from "../api/axios";
import { useEffect, useState, Fragment } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import CartItem from "./CartItem";
import Loading from "./Loading";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

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
        const [totalAmount, setTotalAmount] = useState<number>(0);

        useEffect( () => {
                const retrieveCart = async () => {
                        try{
                                const response = await axios.get('/retrieve-cart', {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                })
                                setCart(response.data.cart);
                                setTotalAmount(response.data.totalAmount);
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
                                
                                {isLoaded && cart.length != 0 &&
                                        <Box flexBasis={'65%'} display={'flex'} flexDirection={'column'} overflow={'scroll'} padding={0}>
                                                {cart.map( (item, index) => (
                                                        <Fragment key={index}>
                                                                <CartItem onRemove={refreshCart} id={item._id} title={item.title} category={item.category} price={item.price} img={item.img} />
                                                                {index < cart.length - 1 && <Divider />}
                                                      </Fragment>
                                                )) }
                                        </Box>

                                        
                                }

                                {isLoaded && cart.length != 0 &&
                                        <Box flexBasis={'35%'} display={'flex'} justifyContent={'center'}>
                                                <Box bgcolor={'#FFFFFF'} width={' 60%'} height={'50%'} mt={3} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} borderRadius={1.5} padding={5} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                                                        <Typography variant="h5">Cart Summary</Typography>

                                                        <Box display={'flex'} flexDirection={'column'} gap={0.5}>
                                                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                                                        <Typography variant="subtitle1">Number of items</Typography>
                                                                        <Typography variant="subtitle1">{cart.length}</Typography>
                                                                </Box>
                                                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                                                        <Typography variant="subtitle1">Amount</Typography>
                                                                        <Typography variant="subtitle1">₹ {totalAmount}</Typography>
                                                                </Box>
                                                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                                                        <Typography variant="subtitle1">Shipping</Typography>
                                                                        <Typography color={'green'} variant="button">Free</Typography>
                                                                </Box>
                                                                <Divider />
                                                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                                                        <Typography variant="h6">Grand Total</Typography>
                                                                        <Typography variant="h6">₹ {totalAmount}</Typography>
                                                                </Box>
                                                        </Box>

                                                        <Link to={'/checkout'}><Button variant="contained">Go to Checkout</Button></Link>
                                                </Box>
                                        </Box>
                                }

                                {isLoaded && cart.length == 0 &&
                                        <EmptyCart />
                                }

                        </Box>
                </>
        )
}

export default Cart