import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../api/axios";
import { AddShoppingCart } from '@mui/icons-material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Loading from "../assets/Loading";
import Message from "../assets/Message"
import SimilarProducts from "./SimilarProducts";
import Reviews from "./Reviews";

interface Product {
        _id: string,
        title: string,
        category: string,
        price: number,
        desc: string,
        img: string
}

function ShowProduct() {
        const navigate = useNavigate();
        const { id } = useParams();

        const [product, setProduct] = useState<Product>();
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [isAdded, setIsAdded] = useState<boolean>(false);

        useEffect( () => {
                const getProduct = async () => {
                        try {
                                const response = await axios.get(`/products/${id}`);
                                setProduct(response.data.product);
                        } catch (error) {
                                console.log(error);
                        } finally {
                                setIsLoaded(true);
                        }
                }

                getProduct();
        }, [id])

        const addToCart = async () => {
                try {
                        const payload = {
                                productID: product?._id
                        }

                        const response = await axios.post('/cart/item', payload, {
                                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        });

                        if (response.status == 200) {
                                setIsAdded(true);
                        }
                } catch (err) {
                        localStorage.removeItem('token');
                        navigate('/login');
                }
        }

        const handleDelete = async () => {

        }

        const removeMessage = () => {
                setIsAdded(false);
        }

        const roleID: number | null = JSON.parse(localStorage.getItem('roleID') as string);

        return (
                <>
                        {!isLoaded &&
                                <Loading />
                        }

                        {isLoaded &&
                                <Box bgcolor={'#f1f1e6'} border={'2px solid #f1f1e6'} boxShadow={'0 6px 20px 0 rgba(0, 0, 0, 0.19)'}>
                                        <Box m={10} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>

                                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'40dvh'} width={'60dvh'}>
                                                        <img src={product?.img} width={'100%'} height={'100%'} />
                                                </Box>

                                                <Box flexBasis={'50%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} p={4} gap={10}>

                                                        <Box display={'flex'} flexDirection={'column'} gap={5}>
                                                                <Box display={'flex'} flexDirection={'column'} gap={1}>
                                                                        <Typography color={'#9CA3AF'} variant="button">{product?.category}</Typography>
                                                                        <Typography variant="h4">{product?.title}</Typography>
                                                                </Box>
                                                                <Typography variant="h6">{product?.desc}</Typography>
                                                        </Box>

                                                        <Box display={'flex'} alignItems={'center'} gap={10}>

                                                                <Typography variant="h4">₹ {product?.price}</Typography>
                                                                {roleID != 2 &&
                                                                        <Button variant="contained" startIcon={<AddShoppingCart />} sx={{color: "#F0F0F0", position: "inherit"}} onClick={addToCart}>
                                                                                Add to Cart
                                                                        </Button>
                                                                }

                                                                {roleID && roleID == 2 &&
                                                                        <Box display={'flex'} gap={2}>
                                                                                <Link to={`/products/${id}/edit`}><Button variant="contained" startIcon={<EditRoundedIcon />} sx={{color: "#F0F0F0", position: "inherit"}}>
                                                                                        Edit
                                                                                </Button></Link>
                                                                                <Button variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />} sx={{color: "#F0F0F0", position: "inherit"}} onClick={handleDelete}>
                                                                                        Delete
                                                                                </Button>
                                                                        </Box>
                                                                }

                                                        </Box>

                                                </Box>
                                        </Box>

                                        {isAdded &&
                                                <Message message="Item added to cart" onClose={removeMessage} />
                                        }

                                </Box>
                        }

                        {isLoaded &&
                                <SimilarProducts category={product?.category as string} excludeID={product?._id as string} />
                        }

                        {isLoaded &&
                                <Reviews productID={product?._id as string} />
                        }
                </>
        )
}

export default ShowProduct