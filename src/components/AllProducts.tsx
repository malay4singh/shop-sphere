import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import Loading from "./Loading";

interface Product {
        _id: string,
        title: string,
        category: string,
        price: number,
        desc: string,
        img: string
}

function AllProducts() {

        const [products, setProducts] = useState<Product[]>([]);
        const [isLoaded, setIsLoaded] = useState<boolean>(false);

        useEffect( () => {

                const getAllProducts = async() => {
                        try{
                                const response = await axios.get('http://localhost:4001/products');
                                setProducts(response.data.products);
                        }catch(error){
                                console.log(error);
                        }finally{
                                setIsLoaded(true);
                        }  
                }

                getAllProducts();
        }, [])

        return (
                <>
                        {!isLoaded &&
                                <Loading />
                        }

                        {isLoaded && 
                                <Grid container spacing={6} p={10}>
                                        {products.map( (product, index) => (
                                                <Grid item xs={3} key={index}>
                                                        <ProductCard title={product.title} price={product.price} img={product.img} id={product._id} />
                                                </Grid>
                                        ))}
                                </Grid>
                        }
                </>
        )
}

export default AllProducts