import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SimilarProductCardProps {
        product: Product
}

interface Product {
        _id: string,
        title: string,
        category: string,
        price: number,
        desc: string,
        img: string
}

function SimilarProductCard(props: SimilarProductCardProps) {
        const link = `/products/${props.product._id}`;

        return (
                <Link to={link}>
                        <Box boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} borderRadius={2} bgcolor={'#ffffff'} p={3} height={'100%'} width={'15rem'} display={'flex'} flexDirection={'column'} gap={3}>
                                
                                <img id="product-image" src={props.product.img} width={"100%"} height={'60%'} />

                                <Typography color={'black'} variant="h6">{props.product.title}</Typography>

                        </Box>
                </Link>
        )
}

export default SimilarProductCard