import { Avatar, Button, Dropdown, Flex, Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import { AntDesignOutlined, LaptopOutlined, LogoutOutlined, NotificationOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LoginModal } from "./user/login/login.modal";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "./user/store/user.selectors";
import { RegistrationModal } from "./user/registration/registration.modal";
import { Dispatch } from "redux";
import { UserActions } from "./user/store/user.action.types";
import { userActions } from "./user/store/user.actions";

const { Header, Footer, Sider, Content } = Layout;

export function Main() {
    const user = useSelector(userSelectors.user);
    const dispatch = useDispatch<Dispatch<UserActions>>();
    const navigate = useNavigate();
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);

    const openLogin = () => {
        setIsLoginModalVisible(true);
    }

    const openRegistration = () => {
        setIsRegistrationModalVisible(true);
    }

    const closeLogin = () => {
        setIsLoginModalVisible(false);
    }

    const closeRegistration = () => {
        setIsRegistrationModalVisible(false);
    }

    const onLogoutClick = () => {
        dispatch(userActions.logout());
    }

    const navigateTo = (event: any) => {
        navigate(`/${event.key}`);
    }

    const renderHeaderContent = () => {
        if (user) {
            const items: MenuProps['items'] = [
                {
                    label: (
                        <Link to='profile'>Profile</Link>
                    ),
                    key: 'profile',
                    icon: <UserOutlined />,
                },
                {
                    label: (
                        <Link to='settings'>Settings</Link>
                    ),
                    key: 'settings',
                    icon: <SettingOutlined />,
                },
                {
                    label: 'Logout',
                    key: '3',
                    icon: <LogoutOutlined />,
                    danger: true,
                    onClick: onLogoutClick
                }
            ];

            return (
                <Flex gap="small" align='center'>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Avatar
                            size='default'
                            icon={<AntDesignOutlined />}
                        />
                    </Dropdown>
                </Flex>)
        }

        return (
            <Flex gap="small" align='center'>
                <Button onClick={openLogin}>Login</Button>
                <LoginModal visible={isLoginModalVisible} onCancel={closeLogin} />
                <Button onClick={openRegistration}>Register</Button>
                <RegistrationModal visible={isRegistrationModalVisible} onCancel={closeRegistration} />
            </Flex>)
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                {renderHeaderContent()}
            </Header>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <Menu
                        style={{ height: '100%', borderRight: 0 }}>
                        <Menu.Item key='category'>
                            Categories
                        </Menu.Item>
                        <Menu.Item key='product'>
                            Products
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ margin: '24px 16px 0' }}>
                    <Outlet />
                </Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}