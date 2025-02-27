import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useUpdatePasswordMutation } from "../../Redux/features/api/endpoints/auth";

const { Title } = Typography;

const CustomerPasswordUpdate = () => {
  const [form] = Form.useForm();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    if (values.newPassword !== values.confirmPassword) {
      return message.error("New password and confirm password must match!");
    }

    try {
      setIsSubmitting(true);
      const { data, error } = await updatePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      if (data?.success) {
        message.success("Password updated successfully!");
        form.resetFields();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message.error((error as any)?.data?.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);
      message.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <Card style={{ maxWidth: 400, width: "100%", padding: "24px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Update Password
        </Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="oldPassword"
            label="Current Password"
            rules={[{ required: true, message: "Please enter your current password" }]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter a new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting || isLoading} block>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CustomerPasswordUpdate;
