import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "../api/axios";

interface Address {
        house: string,
        locality: string,
        city: string,
        state: string,
        pincode: number | null
}

interface AddAddressProps {
        onFinish: () => void
}

function AddAddress(props: AddAddressProps) {

        const initialValues: Address = {
                house: '',
                locality: '',
                city: '',
                state: '',
                pincode: null
        }

        const validationSchema = Yup.object().shape({
                house: Yup.string().required('Please enter House/Flat No.'),
                locality: Yup.string().required('Please enter Building/Locality'),
                city: Yup.string().required('Please enter City name'),
                state: Yup.string().required('Please enter State'),
                pincode: Yup.number().min(110000).max(855999).required('Please enter Pincode')
        })

        const formik = useFormik({
                initialValues,
                validationSchema,
                onSubmit: async (values, { resetForm }) => {
                        const response = await axios.post('/add-address', values, {
                                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        })

                        resetForm();

                        if (response.status == 200) {
                                props.onFinish();
                        }
                }
        })

        return (
                <>
                        <Box>
                                <Typography variant="h5">Add a new Address</Typography>
                        </Box>
                        <Box>

                                <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}> 

                                        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                <TextField
                                                        label="House/Flat No."
                                                        variant="outlined"
                                                        name="house"
                                                        value={formik.values.house}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.house && formik.errors.house}
                                                        error={formik.touched.house && Boolean(formik.errors.house)}
                                                        sx={{ width: '48%' }}
                                                />

                                                <TextField
                                                        label="Building/Locality"
                                                        variant="outlined"
                                                        name="locality"
                                                        value={formik.values.locality}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.locality && formik.errors.locality}
                                                        error={formik.touched.locality && Boolean(formik.errors.locality)}
                                                        sx={{ width: '48%' }}
                                                />
                                        </Box>

                                        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                <TextField
                                                        label="City"
                                                        variant="outlined"
                                                        name="city"
                                                        value={formik.values.city}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.city && formik.errors.city}
                                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                                        sx={{ width: '48%' }}
                                                />

                                                <TextField
                                                        label="Pincode"
                                                        variant="outlined"
                                                        name="pincode"
                                                        value={formik.values.pincode}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.pincode && formik.errors.pincode}
                                                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                                        sx={{ width: '48%' }}
                                                />
                                        </Box>

                                        <Box>
                                                <TextField
                                                        label="State"
                                                        variant="outlined"
                                                        name="state"
                                                        value={formik.values.state}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.state && formik.errors.state}
                                                        error={formik.touched.state && Boolean(formik.errors.state)}
                                                        fullWidth
                                                />
                                        </Box>

                                        <Box position={'absolute'} bottom={25} right={25} display={'flex'} width={'95%'} flexDirection={'row-reverse'}>
                                                <Button type="submit" variant="contained">Add</Button>
                                        </Box>

                                </form>

                        </Box> 
                </>
        )
}

export default AddAddress