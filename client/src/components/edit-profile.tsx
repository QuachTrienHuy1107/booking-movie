import React from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Upload, message, Modal } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { ICredential } from "types/auth.type";
import { useAppDispatch, useAppSelector } from "store/store";
import { updateProfile } from "store/features/auth.slice";
import { useUpload } from "hooks/useUploadFile";
import { Loading } from "./common/loading";

interface IEditProfile {
    me: ICredential;
    isOpen: boolean;
    onClose: () => void;
}

const EditProfile: React.FC<IEditProfile> = ({ isOpen, onClose, me }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const { handleFileChange, avatar, preview, loading } = useUpload();
    const { isLoading, error } = useAppSelector((state) => state.authSlice);
    const isFirst = React.useRef(true);

    React.useEffect(() => {
        if (isFirst.current) return;
        if (!!error) return message.error(error);
    }, [error]);

    const onFinish = (values: any) => {
        const formData = new FormData();
        const data = !!avatar ? { ...values, file: avatar } : values;
        for (let key in data) {
            formData.append(key, data[key]);
        }
        dispatch(updateProfile(formData));
    };

    React.useEffect(() => {
        if (!!me) {
            form.setFieldsValue({
                username: me.username,
                email: me.email,
                avatar: me.avatar,
            });
        }
    }, [form, me]);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Modal title="Edit profile" visible={isOpen} onCancel={onClose} footer={null} destroyOnClose={true}>
                {!!isLoading ? (
                    <Loading />
                ) : (
                    <Form form={form} layout="vertical" hideRequiredMark name="profile" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onChange={handleFileChange}
                                    beforeUpload={() => false}
                                    disabled={loading}
                                >
                                    {!!preview ? (
                                        <img src={preview} alt="avatar" className="img-preview" />
                                    ) : (
                                        <img src={me.avatar} alt="avatar" className="img-preview" />
                                    )}
                                </Upload>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[{ required: true, message: "Please enter user name" }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: "Please enter user name" }]}
                                >
                                    <Input placeholder="Please enter your email" />
                                </Form.Item>
                                <Form.Item
                                    name="oldPassword"
                                    label="Old password"
                                    rules={[{ required: true, message: "Please enter your old password" }]}
                                >
                                    <Input placeholder="Please enter your old password" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="newPassword"
                                    label="New password"
                                    hasFeedback
                                    rules={[{ required: true, message: "Please enter your new password" }]}
                                >
                                    <Input.Password placeholder="Please enter your new password" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={["password"]}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: "Please enter your password" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("newPassword") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error("The two passwords that you entered do not match!")
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Please enter your password again" />
                                </Form.Item>
                            </Col>

                            <Col span={24} style={{ textAlign: "right" }}>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </>
    );
};
export default EditProfile;
