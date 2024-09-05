/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input, message, Typography, Spin } from 'antd';
import photo from '../../../../assets/images/Singup.png';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
    let navigate = useNavigate();
    const { Title, Text } = Typography;

    // Spinner state
    const [loading, setLoading] = useState(false);

    // Password validation regex
    let passwordRegex = /[a-zA-Z]{2,8}/;

    // Validation schema for the form
    let validationSchema = yup.object({
        username: yup.string().min(3, "Min length for username is 3").max(50, "Max length for username is 50").required("Username is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup
            .string()
            .matches(passwordRegex, "Password is invalid")
            .required("Password is required"),
        password_confirm: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Password confirmation is required")
    });

    // Function to handle form submission
    async function submitRegister(values) {
        setLoading(true); // Show spinner when the form is submitted
        try {
            let response = await axios.post(
                `https://todo-list-sslv.onrender.com/api/users`,
                values,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("this is the result", response);
            message.success('Submit success!');
            setTimeout(() => {
                setLoading(false); // Hide spinner
                navigate('/login'); // Navigate to login
            }, 1000); // Simulate loading time
        } catch (error) {
            setLoading(false); // Hide spinner if there's an error
            message.error('Submit failed!');
            console.error("Error:", error.response?.data || error.message);
        }
    }

    let formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            password_confirm: "",
        },
        validationSchema,
        onSubmit: submitRegister,
    });

    // Check if all fields are filled to enable the button
    const isButtonDisabled = !(
        formik.values.username &&
        formik.values.email &&
        formik.values.password &&
        formik.values.password_confirm &&
        !formik.errors.username &&
        !formik.errors.email &&
        !formik.errors.password &&
        !formik.errors.password_confirm
    );

    return (
        <>
            <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
                {/* Card Container */}
                <div className="relative flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
                    {/* SVG Decorations */}
                    <svg
                        className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 size-80 text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="50" cy="50" r="50" />
                    </svg>
                    <svg
                        className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 size-80 text-purple-300"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="50" cy="50" r="50" />
                    </svg>

                    {/* Left Side - Form */}
                    <div className="w-full md:w-1/2 p-8 bg-slate-100">
                        <div className="text-center mb-8">
                            <Title level={2} className="text-blue-600">
                                SIGHUP
                            </Title>
                            <Text className="text-gray-500">
                                Let's make some progress
                            </Text>
                        </div>

                        <Form
                            layout="vertical"
                            onFinish={formik.handleSubmit}
                        >
                            <Form.Item
                                label="Name"
                                name="username"
                                validateStatus={formik.errors.username && formik.touched.username ? 'error' : ''}
                                help={formik.errors.username && formik.touched.username ? formik.errors.username : null}
                            >
                                <Input
                                    name="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                />
                            </Form.Item>

                            <Form.Item
                                label="E-mail"
                                name="email"
                                validateStatus={formik.errors.email && formik.touched.email ? 'error' : ''}
                                help={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            >
                                <Input
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                validateStatus={formik.errors.password && formik.touched.password ? 'error' : ''}
                                help={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                            >
                                <Input.Password
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="password_confirm"
                                validateStatus={formik.errors.password_confirm && formik.touched.password_confirm ? 'error' : ''}
                                help={formik.errors.password_confirm && formik.touched.password_confirm ? formik.errors.password_confirm : null}
                            >
                                <Input.Password
                                    name="password_confirm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password_confirm}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isButtonDisabled || loading} // Disable when inputs are not valid or during loading
                                >
                                    {loading ? <Spin /> : 'Register'} {/* Show spinner when loading */}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* Right Side - Image */}
                    <div className="hidden md:block md:w-1/2 flex items-center justify-center z-10">
                        <img
                            src={photo}
                            alt="Signup Illustration"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
