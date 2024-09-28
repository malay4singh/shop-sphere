import { Box, Rating, Typography, TextField, Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Message from '../assets/Message';
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
        rating: number,
        comment: string,
        username: string
}

interface ReviewsProps {
        productID: string
}

function Reviews(props: ReviewsProps) {

        const navigate = useNavigate();
        
        const [isAdded, setIsAdded] = useState<boolean>(false);
        const [reviews, setReviews] = useState<Review[]>();
        const [isLoaded, setIsLoaded] = useState<boolean>(false);

        const roleID: number | null = JSON.parse(localStorage.getItem('roleID') as string);

        useEffect(() => {
                const getReviews = async () => {
                        try {
                                const response = await axios.get(`/review/${props.productID}`);

                                setReviews(response.data.reviews);
                        } catch (err) {
                                console.log(err);
                        } finally {
                                setIsLoaded(true);
                        }
                }
                
                getReviews();
        }, [isAdded, props.productID])

        const initialValues = {
                rating: 0,
                comment: ""
        }

        const validationSchema = Yup.object().shape({
                rating: Yup.number().required(),
                comment: Yup.string().required('Please Enter a Description')
        })

        const formik = useFormik({
                initialValues,
                validationSchema,
                onSubmit: async (values, { resetForm }) => {
                        try{
                                const data = {
                                        ...values,
                                        productID: props.productID
                                }

                                const response = await axios.post('/review', data, {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                });

                                if (response.status === 201) {
                                        setIsAdded(true);
                                        resetForm();
                                }
                        } catch (err) {
                                navigate('/login');
                        }                
                }
        });

        const removeMessage = () => {
                setIsAdded(false);
        }

        return (
                <>
                        <Box bgcolor={'#f1f1e6'} border={'2px solid #f1f1e6'} boxShadow={'0 1px 20px 0 rgba(0, 0, 0, 0.19)'} px={10} py={8} display={'flex'} flexDirection={'column'} gap={3}>

                                <Box>
                                        <Typography variant="h5">Reviews</Typography>
                                </Box>

                                <Box display={'flex'} gap={10}>
                                        {roleID != 2 &&
                                                <form onSubmit={formik.handleSubmit} style={{ width: '50%' }}>
                                                        <Box display={'flex'} flexDirection={'column'} gap={1.5}>

                                                                <Rating
                                                                        icon = {<StarIcon style={{width:"34px",height:"34px"}}></StarIcon>}
                                                                        emptyIcon = {<StarOutlineIcon style={{width:"34px",height:"34px"}}></StarOutlineIcon>}
                                                                        name="rating"
                                                                        value={formik.values.rating}
                                                                        onChange={formik.handleChange}
                                                                />

                                                                <TextField
                                                                        label="Comments"
                                                                        variant="outlined"
                                                                        name="comment"
                                                                        multiline
                                                                        minRows={3}
                                                                        value={formik.values.comment}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        helperText={formik.touched.comment && formik.errors.comment}
                                                                        error={formik.touched.comment && Boolean(formik.errors.comment)}
                                                                />

                                                                <Box marginTop={1} display={'flex'} justifyContent={'space-between'} px={1}>
                                                                        <Button type="submit" variant="contained">Submit</Button>
                                                                </Box>

                                                        </Box>
                                                </form>
                                        }


                                        <Box display={'flex'} flexDirection={'column'} flexGrow={1} gap={3}>
                                                {isLoaded &&
                                                        reviews?.map((review, index) =>(
                                                                <Box key={index}>
                                                                        <ReviewCard rating={review.rating} comment={review.comment} username={review.username} />
                                                                </Box>
                                                        ))
                                                }
                                        </Box>

                                </Box>

                                {isAdded &&
                                        <Message message="Review added successfully" onClose={removeMessage} />
                                }
                        </Box>
                </>
        )
}

export default Reviews