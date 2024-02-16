import { Avatar, Button, Dropdown, Flex, Layout, Menu, theme } from "antd";
import type { MenuProps } from 'antd';
import { AudioOutlined, LogoutOutlined, NotificationOutlined, ProductOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LoginModal } from "../user/login/login.modal";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../user/store/user.selectors";
import { RegistrationModal } from "../user/registration/registration.modal";
import { Dispatch } from "redux";
import { UserActions } from "../user/store/user.action.types";
import { userActions } from "../user/store/user.actions";
import Search from "antd/es/input/Search";
import { CategoriesDropdown } from "../features/categories/dropdown/categories-dropdown";
import { useAdmin } from "../hooks/useAdmin";

const { Header, Sider, Content } = Layout;


export function Main() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const isAdmin = useAdmin();
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
                <>
                    <Flex>
                        <div>
                            <Link
                                to=''
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="logo.png" style={{ height: '70px', padding: '10px 10px 0px 0px', objectFit: 'cover' }} />
                            </Link>
                        </div>
                    </Flex>
                    <Flex style={{ flexGrow: 1 }}>
                        <CategoriesDropdown />
                    </Flex>
                    <Flex style={{ flexGrow: 1 }}>
                        <Search
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            suffix={<AudioOutlined
                                style={{
                                    fontSize: 16,
                                    color: '#1677ff',
                                }} />}
                        />
                    </Flex>
                    <Flex gap="small" align='center'>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Avatar
                                size='default'
                                src={`${user.contentPath}${user.avatarUrl}`}
                            />
                        </Dropdown>
                    </Flex>
                </>
            )
        }

        return (
            <>
                <Flex>
                    <Link to=''><img src="logo.png" alt="" /></Link>
                </Flex>
                <Flex style={{ flexGrow: 1 }}>
                    <CategoriesDropdown />
                </Flex>
                <Flex style={{ flexGrow: 1 }}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        suffix={<AudioOutlined
                            style={{
                                fontSize: 16,
                                color: '#1677ff',
                            }} />}
                    />
                </Flex>
                <Flex gap="small" align='center'>
                    <Button onClick={openLogin}>Login</Button>
                    <LoginModal visible={isLoginModalVisible} onCancel={closeLogin} />
                    <Button onClick={openRegistration}>Register</Button>
                    <RegistrationModal visible={isRegistrationModalVisible} onCancel={closeRegistration} />
                </Flex>
            </>
        )
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 3,
                width: '100%',
                background: colorBgContainer
            }}>
                <div style={
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        gap: '15px',
                        margin: '0 150px'
                    }
                }>
                    {renderHeaderContent()}
                </div>
            </Header>
            <Layout style={{ paddingLeft: '25px', paddingRight: '25px', margin: '0px 150px 0px 150px' }}>
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
                        {isAdmin && <Menu.Item key='dashboard'>
                            <Link to='dashboard'>Dashboard</Link>
                        </Menu.Item>}
                    </Menu>
                </Sider>
                <Content style={{ margin: '24px 16px 0', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}