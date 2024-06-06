import { useState, useEffect } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import axios from "../api/axios";
import Loading from "./Loading";
import ReviewItem from "./ReviewItem";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

interface Product {
        _id: string,
        title: string,
        category: string,
        price: number,
        desc: string,
        img: string
}

interface Order {
        amount: number,
        id: string
}

interface ReviewOrderProps {
}

function ReviewOrder(props: ReviewOrderProps) {

        const [Razorpay] = useRazorpay();
        const navigate = useNavigate();

        const [cart, setCart] = useState<Product[]>([]);
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
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

                retrieveCart();
        }, [])

        const handlePlaceOrder = async () => {
                try {
                        const response = await axios.post('/order', { amount: totalAmount }, {
                                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        })

                        const order = response.data.order;

                        handlePayment(order);
                } catch (err) {
                        console.log(err);
                }
        }

        const handlePayment = (order: any) => {
                const rzp = new Razorpay({
                        key: import.meta.env.VITE_RZP_ID,
                        amount: order.amount,
                        currency: 'INR',
                        name: 'Shop Sphere',
                        image: 'https://i.imghippo.com/files/b6tVw1717655776.png',
                        order_id: order.id,
                        theme: {
                                color: '#2A5D9C'
                        },
                        handler: async (res) => {
                                await axios.post('/verifyPayment', res, {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                })

                                navigate(`/order/${order.id}`);
                        }
                })

                rzp.open();
        }

        return (
                <>
                        {!isLoaded &&
                                <Loading />
                        }

                        {isLoaded &&
                                <Box height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'}>

                                        <Box width={'40%'} bgcolor={'#ffffff'} height={'fit-content'} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} borderRadius={2}>
                                                <Box px={3} py={2}>
                                                        <Typography color={'green'} variant="h5">Estimated delivery time: 2 days</Typography>
                                                </Box>

                                                <Divider />

                                                <Box px={3}>
                                                        <Grid container maxHeight={'55dvh'} overflow={'scroll'}>
                                                                {cart.map( (item, index) => (
                                                                        <Grid item xs={12} key={index}>
                                                                                <ReviewItem title={item.title} price={item.price} img={item.img} />
                                                                                {index < cart.length - 1 && <Divider />}
                                                                        </Grid>
                                                                ))}
                                                        </Grid>
                                                </Box>

                                                <Divider />

                                                <Box px={3} py={0.5}>
                                                        <Typography variant="h6">Total Amount: ₹ {totalAmount}</Typography>
                                                </Box>
                                        </Box>

                                        <Button onClick={handlePlaceOrder} variant="contained" sx={{ position: 'absolute', top:'2rem', right: '10rem' }}>Place Order & Pay</Button>

                                </Box>
                        }
                </>
        )
}

export default ReviewOrder