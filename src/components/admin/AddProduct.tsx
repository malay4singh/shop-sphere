import { Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function AddProduct() {

        const navigate = useNavigate();

        const initialValues = {
                title: "",
                category: "",
                price: null,
                desc: "",
                img: "",
        }

        const validationSchema = Yup.object().shape({
                title: Yup.string().required('Please enter the Name of the Product'),
                category: Yup.string().required('Please select Product Category'),
                price: Yup.number().required('Please enter the Price of the Product'),
                desc: Yup.string().required('Please enter Product Description'),
                img: Yup.string().required('Please enter the Image URL')
        })

        const formik = useFormik({
                initialValues,
                validationSchema,
                onSubmit: async (values) => {
                        try{
                                const response = await axios.post('/', values);
                                if (response.status === 201) {
                                        navigate('/');
                                }
                        } catch (err) {
                                console.log(err);
                        }                
                },
        });
        
        const options = [
                { category: "Electronics" },
                { category: "Clothing" },
                { category: "Home Appliances" },
                { category: "Books" },
                { category: "Sports & Outdoors" },
                { category: "Beauty & Personal Care" }
        ]

        return (
                <>
                        <Box width={'100%'} height={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                                <Typography variant="h3">New Product</Typography>
                        </Box>

                        <Box width={'100%'} height={'85%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <form onSubmit={formik.handleSubmit} style={{ width: '75%' }}>
                                        <Box display={'flex'} flexDirection={'column'} gap={2}>

                                                <TextField
                                                        label="Title"
                                                        variant="outlined"
                                                        name="title"
                                                        value={formik.values.title}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.title && formik.errors.title}
                                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                                />

                                                <FormControl>
                                                        <InputLabel id="roles">Select Category</InputLabel>
                                                        <Select 
                                                                labelId="category" 
                                                                label="Select Category" 
                                                                value={formik.values.category} 
                                                                onChange={(e) => formik.setFieldValue('category', e.target.value)}
                                                                error={formik.touched.category && Boolean(formik.errors.category)}
                                                        >
                                                                {options.map((option) => (
                                                                        <MenuItem key={option.category} value={option.category}>
                                                                                {option.category}
                                                                        </MenuItem>
                                                                ))}
                                                        </Select>
                                                        {formik.touched.category && formik.errors.category && <FormHelperText error>{formik.errors.category}</FormHelperText>}
                                                </FormControl>

                                                <TextField
                                                        label="Price"
                                                        variant="outlined"
                                                        name="price"
                                                        value={formik.values.price}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.price && formik.errors.price}
                                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                                />

                                                <TextField
                                                        label="Description"
                                                        variant="outlined"
                                                        name="desc"
                                                        multiline
                                                        minRows={2}
                                                        value={formik.values.desc}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.desc && formik.errors.desc}
                                                        error={formik.touched.desc && Boolean(formik.errors.desc)}
                                                />

                                                <TextField
                                                        label="Image URL"
                                                        variant="outlined"
                                                        name="img"
                                                        value={formik.values.img}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.img && formik.errors.img}
                                                        error={formik.touched.img && Boolean(formik.errors.img)}
                                                />

                                                <Box marginTop={2} display={'flex'} justifyContent={'space-between'} px={2}>
                                                        <Button type="submit" size="large" variant="contained">Add</Button>
                                                </Box>

                                        </Box>
                                </form>
                        </Box>
                </>
        )
}

export default AddProduct