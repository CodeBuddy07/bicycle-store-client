/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload, message, Typography } from "antd";
import { useState } from "react";
import { useAddBicycleMutation } from "../../../Redux/features/api/endpoints/bicycle";

const { Option } = Select;
const { Title } = Typography;

const AddProducts = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [addProduct, {isLoading}] = useAddBicycleMutation();

    // Handle form submission
    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("type", values.type);
        formData.append("brand", values.brand);
        formData.append("description", values.description);
        formData.append("quantity", values.quantity);
        if (fileList.length > 0) {
            fileList.forEach((file) => {
                formData.append(`images`, file.originFileObj); // Send as an array
            });
        }


        const { data, error } = await addProduct(formData);
        if (data?.success) {
            message.success("Product added successfully!");
            form.resetFields();
            setFileList([]);
        } if (error && (error as any).data) {
            message.error((error as any).data.message || "Failed to add product.");

        }



    };

    return (
        <div className="w-full p-8 ">
            {/* Page Header */}
            <div className="bg-white py-4 px-6 rounded-lg shadow flex items-center justify-between ">
                <Title level={2} className="!m-0 text-gray-800">Add New Product</Title>
            </div>

            {/* Form Section */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                <Form form={form} layout="vertical" onFinish={onFinish} className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Product Name */}
                        <Form.Item
                            label="Product Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter product name" }]}
                        >
                            <Input className="!py-2" placeholder="Enter product name" />
                        </Form.Item>

                        <Form.Item
                            label="Product Brand"
                            name="brand"
                            rules={[{ required: true, message: "Please enter product brand" }]}
                        >
                            <Input className="!py-2" placeholder="Enter product brand" />
                        </Form.Item>

                        {/* Price */}
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: "Please enter product price" }]}
                        >
                            <InputNumber className="!w-full !py-1" placeholder="Enter price" min={1} />
                        </Form.Item>

                        {/* Category */}
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: "Please select a type" }]}
                        >
                            <Select className="" placeholder="Select type">
                                <Option value="Mountain">Mountain</Option>
                                <Option value="Road">Road</Option>
                                <Option value="Hybrid">Hybrid</Option>
                                <Option value="BMX">BMX</Option>
                                <Option value="Electric">Electric</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Description */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please enter product description" }]}
                        >
                            <Input.TextArea className="!py-2" rows={5} placeholder="Enter product description" />
                        </Form.Item>

                        {/* Stock */}
                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: "Please enter stock quantity" }]}
                        >
                            <InputNumber  className="!w-full !py-1" placeholder="Enter stock quantity" min={0} />
                        </Form.Item>

                        {/* Image Upload */}
                        <Form.Item
                            label="Product Image"
                            name="image"
                            rules={[{ required: true, message: "Please upload an image" }]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType="picture"
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </div>

                    {/* Full-width Submit Button */}
                    <div className="col-span-2 flex justify-end">
                        <Button type="primary" htmlType="submit" className="px-6 py-2 text-lg">
                           {isLoading ? "Adding Product ..." : "Add Product"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddProducts;
