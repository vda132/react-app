import { LockOutlined, MailOutlined, PhoneOutlined, SignatureOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { UserActions } from "../store/user.action.types";
import { UserRegistrationData } from "../store/user.model";
import { userActions } from "../store/user.actions";
import { userSelectors } from "../store/user.selectors";
import { useEffect } from "react";

export const RegistrationModal = ({ visible, onCancel }: { visible: boolean, onCancel: any }) => {
    const dispatch = useDispatch<Dispatch<UserActions>>();

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const processRegistration = (registrationRequest: UserRegistrationData) => dispatch(userActions.registration(registrationRequest));

    const onFormSubmit = () => {
        debugger
        processRegistration({ ...values, roles: ['user'] });
    }

    const userId = useSelector(userSelectors.userId);

    useEffect(() => {
        if (userId) {
            form.resetFields();
            onCancel();
        }
    }, [userId]);

    return (
        <Modal
            title='Register'
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered>
            <Form
                className='regitration-form'
                form={form}
                onFinish={onFormSubmit}>
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
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        prefix={<PhoneOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Password is required' },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}