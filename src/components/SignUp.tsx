import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Box, Typography, Button, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useEffect } from 'react';

interface Details {
        username: string;
        passwd: string;
        roleID: number | null;
}

function SignUp() {
        const navigate = useNavigate();

        useEffect(() => {
                const isLoggedIn = () => {
                        if (localStorage.getItem('user')){
                                navigate('/products');
                        }
                }

                isLoggedIn();
        }, [])

        const initialValues: Details = {
                username: '',
                passwd: '',
                roleID: null
        };

        const validationSchema = Yup.object().shape({
                username: Yup.string().required('Username is required'),
                passwd: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9])/, "Invalid Password Format"),
                roleID: Yup.number().required('Please select a role'),
        });

        const formik = useFormik({
                initialValues,
                validationSchema,
                onSubmit: async (values) => {
                        const response = await axios.post('/signup', values);
                        if (response.status === 201) {
                                navigate('/login');
                        }
                },
        });

        const options = [
                { roleID: 1, role: 'Buyer' },
                { roleID: 2, role: 'Seller' }
        ];

        return (
                <Box bgcolor={'#6A9ACB'} height={'100dvh'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                        
                        <Box display={'flex'} height={'75%'} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}>

                                <img src="signup-art.jpg" height={'100%'} />

                                <Box bgcolor={'#f1f1f1'} padding={12} display={'flex'} alignItems={'center'}>
                                        <form onSubmit={formik.handleSubmit}>
                                                <Box display={'flex'} flexDirection={'column'} gap={4}>

                                                        <Box display={'flex'} flexDirection={'column'} marginBottom={2}>
                                                                <Typography variant="h4">Sign Up</Typography>
                                                                <Typography variant="overline">Welcome, Please create a new account.</Typography>
                                                        </Box>

                                                        <TextField
                                                                label="Username"
                                                                variant="outlined"
                                                                name="username"
                                                                value={formik.values.username}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.touched.username && formik.errors.username}
                                                                error={formik.touched.username && Boolean(formik.errors.username)}
                                                        />

                                                        <TextField
                                                                label="Password"
                                                                variant="outlined"
                                                                name="passwd"
                                                                type="password"
                                                                value={formik.values.passwd}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.touched.passwd && formik.errors.passwd}
                                                                error={formik.touched.passwd && Boolean(formik.errors.passwd)}

                                                        />

                                                        <FormControl>
                                                                <InputLabel id="roles">Select Role</InputLabel>
                                                                <Select 
                                                                        labelId="roles" 
                                                                        label="Select Role" 
                                                                        value={formik.values.roleID} 
                                                                        onChange={(e) => formik.setFieldValue('roleID', e.target.value as number)}
                                                                        error={formik.touched.roleID && Boolean(formik.errors.roleID)}
                                                                >
                                                                        {options.map((option) => (
                                                                                <MenuItem key={option.roleID} value={option.roleID}>
                                                                                        {option.role}
                                                                                </MenuItem>
                                                                        ))}
                                                                </Select>
                                                                {formik.touched.roleID && formik.errors.roleID && <FormHelperText error>{formik.errors.roleID}</FormHelperText>}
                                                        </FormControl>

                                                        <Box marginTop={2} display={'flex'} justifyContent={'space-between'} px={2}>
                                                                <Link to={'/login'}><Button size='large' variant='outlined'>Login</Button></Link>
                                                                <Button type="submit" size="large" variant="contained">Sign up</Button>
                                                        </Box>
                                                        
                                                </Box>
                                        </form>
                                </Box>

                        </Box>

                </Box>
        )
}

export default SignUp