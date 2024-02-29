import { Form, Input, Button, Modal } from 'antd';
import { UserActions } from '../store/user.action.types';
import { UserLoginData } from '../store/user.model';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/user.actions';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { userSelectors } from '../store/user.selectors';
import { useEffect } from 'react';
import "./login.modal.css";

export const LoginModal = ({ visible, onCancel }: { visible: boolean, onCancel: any }) => {
    const dispatch = useDispatch<Dispatch<UserActions>>();

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const processLogin = (loginRequest: UserLoginData) => dispatch(userActions.login(loginRequest))

    const onFormSubmit = () => {
        processLogin({ ...values });
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
            title='Login'
            onCancel={onCancel}
            open={visible}
            footer={null}
            centered>
            <Form className="login-form"
                form={form}
                onFinish={onFormSubmit}
            >
                <Form.Item
                    name="login"
                    rules={[
                        { required: true, message: 'Please input your login' },
                        { type: 'string', message: 'Login is not valid' }
                    ]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
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
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
