
import { Layout, Menu, Button } from 'antd';

import { useContext } from 'react';
import { userContext } from '../../Context/userContext';
const { Header } = Layout;

const Navbar = () => {
    let { userToken } = useContext(userContext);
    return (
        <>

            {userToken ? <>< Layout >
                <Header className="fixed z-10 w-full flex justify-between items-center  px-5">

                    {/* Logo on the left */}
                    <div className="flex items-center">
                        <div className="logo">
                            <img src="your-logo-url" alt="Logo" className="h-10" />
                        </div>
                    </div>

                    {/* Links in the center */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="flex-1 flex justify-center bg-transparent">
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">About</Menu.Item>
                        <Menu.Item key="3">Contact</Menu.Item>
                    </Menu>

                    {/* Logout Button on the right */}
                    <div className="flex items-center">
                        <Button type="primary" className="ml-2">
                            Log Out
                        </Button>
                    </div>
                </Header>
            </Layout ></> : ""}

        </>
    );
};

export default Navbar;
