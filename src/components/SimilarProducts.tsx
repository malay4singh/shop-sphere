import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Loading from "./Loading";
import SimilarProductCard from "./SimilarProductCard";

interface SimilarProductsProps {
        category: string,
        excludeID: string
}

interface Product {
        _id: string,
        title: string,
        category: string,
        price: number,
        desc: string,
        img: string
}

function SimilarProducts(props: SimilarProductsProps) {

        const [products, setProducts] = useState<Product[]>([]);
        const [isLoaded, setIsLoaded] = useState<boolean>(false);

        useEffect( () => {
                const getSimilarProducts = async () => {
                        try{
                                const payload = {
                                        category: props.category,
                                        excludeID: props.excludeID
                                }
                                const response = await axios.post(`/products/similar-products`, payload);
                                setProducts(response.data.products);
                        } catch (err) {
                                console.log(err);
                        } finally {
                                setIsLoaded(true);
                        }
                }

                getSimilarProducts();
        }, [])

        return (
                <>
                        {!isLoaded &&
                                <Loading />
                        }

                        {isLoaded &&
                                <Box px={10} py={5} display={'flex'} flexDirection={'column'} gap={3}>

                                        <Box>
                                                <Typography variant="h5">Similar Products</Typography>
                                        </Box>
                                        
                                        <Box height={'40dvh'} display={'flex'} justifyContent={'space-between'}>
                                                {products.map ((item, index) => (
                                                        <Box key={index}>
                                                                <SimilarProductCard product={item} />
                                                        </Box>
                                                ))}
                                        </Box>
                                        
                                </Box>
                        }
                        
                </>
        )
}

export default SimilarProducts