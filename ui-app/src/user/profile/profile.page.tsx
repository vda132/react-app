import { useDispatch, useSelector } from "react-redux"
import { userSelectors } from "../store/user.selectors"
import { useForm } from "antd/es/form/Form";
import { Avatar, Button, Card, Col, Form, GetProp, Input, Row, Upload, UploadProps, message } from "antd";
import { LoadingOutlined, LockOutlined, MailOutlined, PhoneOutlined, PlusOutlined, SignatureOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { UserActions } from "../store/user.action.types";
import { userActions } from "../store/user.actions";
import { UserRegistrationData } from "../store/user.model";
import { UploadChangeParam } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return false;
};

export const Profile = () => {
    const dispatch = useDispatch<Dispatch<UserActions>>();
    const user = useSelector(userSelectors.user);
    const [userForm] = useForm();
    const [passwordsForm] = useForm();
    const userValues = Form.useWatch([], userForm);
    const passwordValues = Form.useWatch([], passwordsForm);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const updateProfile = () => {
        dispatch(userActions.updateUser({ ...userValues, id: user?.id }));
        if (imageFile) {
            dispatch(userActions.updateUserAvatar({ userId: user?.id!, file: imageFile }));
        }
    }

    const changePassword = () => {
        const newUser = { ...user } as UserRegistrationData;
        newUser.currentPassword = passwordValues['currentPassword'];
        newUser.newPassword = passwordValues['newPassword'];
        newUser.id = user?.id!
        dispatch(userActions.updateUser(newUser));
        passwordsForm.resetFields();
    }

    const handleUpload = (info: UploadChangeParam<any>) => {
        setImageFile(info.file);
        setImageUrl(URL.createObjectURL(info.file));
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    useEffect(() => {
        if (user) {
            userForm.setFieldsValue({ ...user });
            setImageUrl(`${user.contentPath}${user.avatarUrl}`);
        }

        return () => {
            debugger
            URL.revokeObjectURL(imageUrl);
        }
    }, [user])

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card
                    title='Your profile'>
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        onChange={handleUpload}
                    >
                        {imageUrl ? <Avatar src={imageUrl} size={100} /> : uploadButton}
                    </Upload>
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