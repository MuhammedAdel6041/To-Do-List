/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input, message, Typography, Spin } from 'antd';
import photo from '../../../../assets/images/Singup.png';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { userContext } from '../../../Context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let { setUserToken } = useContext(userContext);
  let navigate = useNavigate();
  const { Title, Text } = Typography;

  // Spinner state
  const [loading, setLoading] = useState(false);

  let passwordRegex = /[a-zA-Z]{2,8}/;
  let validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .matches(passwordRegex, "Password is invalid")
      .required("Password is required"),
  });

  async function submitLogin(values) {
    setLoading(true); // Show spinner during form submission

    console.log("Submitted values:", values); // Log values to inspect the data

    try {
      let response = await axios.post(
        `https://todo-list-sslv.onrender.com/api/auth`, // Update the endpoint to login
        values,
        { headers: { 'Content-Type': 'application/json' } }
      );
      message.success('Submit success!');
      localStorage.setItem("userToken", response?.data?.id);
      setUserToken(response?.data?._id);
      console.log(response?.data?.email);
      console.log("this is the result", response);
      setLoading(false); // Stop spinner
      navigate('/');
    } catch (error) {
      message.error('Submit failed!');
      console.error("Error:", error.response?.data || error.message); // Log error response details
      setLoading(false); // Stop spinner on error
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  // Check if all fields are valid and filled to enable the button
  const isButtonDisabled = !(
    formik.values.email &&
    formik.values.password &&
    !formik.errors.email &&
    !formik.errors.password
  ) || loading; // Also disable button while loading

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
                LOGIN
              </Title>
              <Text className="text-gray-500">
                Welcome back! Let's continue where you left off
              </Text>
            </div>

            <Form
              layout="vertical"
              onFinish={formik.handleSubmit}
            >
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isButtonDisabled} // Disable when inputs are not valid or during loading
                >
                  {loading ? <Spin /> : 'Login'} {/* Show spinner when loading */}
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2 flex items-center justify-center z-10">
            <img
              src={photo}
              alt="Login Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
