import { useDispatch, useSelector } from "react-redux"
import { userSelectors } from "../store/user.selectors"
import { useForm } from "antd/es/form/Form";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined, SignatureOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { UserActions } from "../store/user.action.types";
import { userActions } from "../store/user.actions";
import { UserRegistrationData } from "../store/user.model";

export const Profile = () => {
    const dispatch = useDispatch<Dispatch<UserActions>>();
    const user = useSelector(userSelectors.user);
    const [userForm] = useForm();
    const [passwordsForm] = useForm();
    const userValues = Form.useWatch([], userForm);
    const passwordValues = Form.useWatch([], passwordsForm);

    const updateProfile = () => {
        debugger
        dispatch(userActions.updateUser({ ...userValues, id: user?.id }));
    }

    const changePassword = () => {
        const newUser = { ...user } as UserRegistrationData;
        newUser.currentPassword = passwordValues['currentPassword'];
        newUser.newPassword = passwordValues['newPassword'];
        newUser.id = user?.id!
        dispatch(userActions.updateUser(newUser));
        passwordsForm.resetFields();
    }

    useEffect(() => {
        debugger
        if (user) {
            userForm.setFieldsValue({ ...user });
        }
    }, [user])

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card
                    title='Your profile'>
                    <Form
                        initialValues={{ ...user! }}
                        form={userForm}
                        onFinish={updateProfile}>
                        <Form.Item
                            name='fullName'
                            rules={[
                                { required: true, message: 'Please input your name' }
                            ]}>
                            <Input
                                placeholder="Name"
                                prefix={<SignatureOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name='userName'
                            rules={[
                                { required: true, message: 'Please input your login' },
                                { type: 'string', message: 'Login is not valid' }
                            ]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Login" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Email is required' },
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="Email"
                                prefix={<MailOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Phone Number is required' },
                            ]}
                        >
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                prefix={<PhoneOutlined />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col span={12}>
                <Card
                    title='Change Password'>
                    <Form
                        form={passwordsForm}
                        onFinish={changePassword}>
                        <Form.Item
                            name='currentPassword'>
                            <Input
                                placeholder="Current Password"
                                type="password"
                                prefix={<LockOutlined className="site-form-item-icon" />} />
                        </Form.Item>
                        <Form.Item
                            name='newPassword'>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="New Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}