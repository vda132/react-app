import { ContactsOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, ProductOutlined, ShopOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export const DashBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}
                breakpoint="lg"
                >
                <div style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    height: 'calc(64px)',
                    paddingInline: '14px',
                    justifyContent: 'center'
                }}>
                    <Link to="/">
                        <img
                            style={{ height: collapsed ? '24px' : '40px' }}
                            src={
                                collapsed ? "sublogo.png" : "logo.png"
                            } alt="" />
                    </Link>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['Child 1']}
                    items={[
                        {
                            key: '1',
                            label: 'Menu',
                            type: 'group',
                            children: [
                                {
                                    key: 'Child 1',
                                    label: 'Dashboard',
                                    icon: <PieChartOutlined />
                                }
                            ]
                        },
                        {
                            key: '2',
                            label: 'Store Management',
                            type: 'group',
                            children: [
                                {
                                    key: 'Store Management 1',
                                    label: 'Markets',
                                    icon: <ShopOutlined />
                                },
                                {
                                    key: 'Store Management 2',
                                    label: 'Products',
                                    icon: <ProductOutlined />
                                }
                            ]
                        },
                        {
                            key: '3',
                            label: 'Employees',
                            type: 'group',
                            children: [
                                {
                                    key: 'Employees 1',
                                    label: 'My Employees',
                                    icon: <ContactsOutlined />
                                }
                            ]
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,

                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}