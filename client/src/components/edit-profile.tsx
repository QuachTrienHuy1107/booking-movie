import {Button, Col, Form, Input, Modal, Row, Upload} from "antd";
import {useUpload} from "hooks/useUploadFile";
import {FC, useEffect, useState} from "react";
import {updateProfile} from "store/features/auth.slice";
import {useAppDispatch, useAppSelector} from "store/store";
import {ICredential} from "types/auth.type";
import {Loading} from "./common/loading";

interface IEditProfile {
  me: ICredential;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: FC<IEditProfile> = ({isOpen, onClose, me}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const {handleFileChange, avatar, preview, loading: fileUploading} = useUpload();
  const {isLoading} = useAppSelector((state) => state.authSlice);
  const [isChangePassword, setChangesPassword] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const disabled = isLoading || fileUploading || !submittable;

  useEffect(() => {
    form.validateFields({validateOnly: true}).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

  useEffect(() => {
    if (!!me) {
      form.setFieldsValue({
        username: me.username,
        email: me.email,
        avatar: me.avatar,
        phone: me.phone || null,
      });
    }
  }, [form, me]);

  const handlePasswordChange = (e: any) => {
    const value = e.target?.value as string;
    if (!!value.trim()) {
      setChangesPassword(true);
    } else {
      setChangesPassword(false);
    }
  };

  const handleClose = () => {
    form.setFieldsValue({
      username: me.username,
      email: me.email,
      avatar: me.avatar,
      phone: me.phone || null,
    });
    onClose();
  };

  const onFinish = async (values: any) => {
    for (var key in values) {
      if ((values.hasOwnProperty(key) && !values[key]) || (values[key].trim() as string) === "") {
        delete values[key];
      }
    }

    const data = !!avatar ? {...values, avatar} : values;

    dispatch(updateProfile(data));
  };

  return (
    <>
      <Modal title="Edit profile" visible={isOpen} onCancel={() => handleClose()} footer={null} destroyOnClose={true}>
        {!!isLoading ? <Loading /> : (
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
                  disabled={fileUploading}
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
                  label={
                    <span>
                      Username <span className="error">*</span>
                    </span>
                  }
                  rules={[{required: true, message: "Please enter user name"}]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label={
                    <span>
                      Email <span className="error">*</span>
                    </span>
                  }
                  rules={[{required: true, message: "Please enter user name", type: "email"}]}
                >
                  <Input placeholder="Please enter your email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="phone" label="Phone number">
                  <Input placeholder="Please enter your phone number" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="oldPassword"
                  label="Old password"
                  rules={[{required: isChangePassword, message: "Please enter your old password"}]}
                >
                  <Input
                    placeholder="Please enter your old password"
                    onChange={handlePasswordChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="newPassword"
                  label="New password"
                  hasFeedback
                  rules={[{required: isChangePassword, message: "Please enter your new password"}]}
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
                    // { required: true, message: "Please enter your password" },
                    ({getFieldValue}) => ({
                      validator(_, value) {
                        if (getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords that you entered do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Please enter your password again"
                    onChange={handlePasswordChange}
                  />
                </Form.Item>
              </Col>

              <Col span={24} style={{textAlign: "right"}}>
                <Button type="primary" htmlType="submit" disabled={disabled}>
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
