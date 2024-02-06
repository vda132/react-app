import { useSelector } from "react-redux"
import { userSelectors } from "../store/user.selectors"
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import { MailOutlined, PhoneOutlined, SignatureOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export const Profile = () => {
    const user = useSelector(userSelectors.user);
    const [userForm] = useForm();

    useEffect(() => {
        if (user) {
            userForm.setFieldsValue({ ...user })
        }
    }, [user])

    return (
        <Form
            initialValues={{ ...user! }}
            form={userForm}>
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
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}