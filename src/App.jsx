import './App.css';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';

import { useContext } from 'react';


import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/feature/Home/Home';
import SignUp from './components/feature/auth/SingUp/SingUp';
import Login from './components/feature/auth/Login/Login';
import Protected from './components/shared/ProtectedRoutes/Protected';
import NotFound from './components/feature/NotFound/NotFound';
import { userContext } from './components/Context/userContext';


function App() {

  let { userToken } = useContext(userContext);

  const { Content, Footer } = Layout;
  return (
    <>
      <Layout className="min-h-screen overflow-hidden bg-slate-950">
        <Navbar />




        <Layout  > {/* Adjusted to prevent overlapping */}
          <Content  > {/* Ensured proper padding and overflow handling */}
            <Routes>
              <Route path="/" element={<Protected><Home /></Protected>} />
              <Route path="*" element={<Protected><NotFound /></Protected>} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              {/* Add more routes here */}
            </Routes>
          </Content>
          {userToken ? <>  <Footer className="text-center   ">Ant Design ©2024 Created by Ant UED</Footer></> : ""}
        </Layout>
      </Layout>
    </>
  );
}

export default App;
