/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Switch, InputNumber, message, Popconfirm } from "antd";


import { useGetBicyclesQuery, useDeleteBicycleMutation, useUpdateBicycleMutation } from "../../../Redux/features/api/endpoints/bicycle";

const { Option } = Select;

const ManageProducts = () => {

  const { data: products, isLoading: loading } = useGetBicyclesQuery({ searchTerm: "", value: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState({ _id: "edfs" });
  const [form] = Form.useForm();

  const [updateProduct] = useUpdateBicycleMutation();
  const [deleteProduct] = useDeleteBicycleMutation();


  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { data, error } = await deleteProduct(id);
    if (data?.success) {
      message.success("Product deleted successfully");
    }
    if (error) {

      message.error((error as any)?.data?.message || "Something went wrong");
    }
  };

  const handleUpdate = async () => {
    const updatedValues = form.getFieldsValue();
    const { data, error } = await updateProduct({ id: editingProduct?._id, updatedData: updatedValues });
    if (data?.success) {
      message.success("Product updated successfully");
      setIsModalOpen(false);
    }
    if (error) {
      console.log(error);
      message.error((error as any)?.data?.message || "Something went wrong");
      setIsModalOpen(false);
    }

  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Price", dataIndex: "price", key: "price", render: (price: any) => `$${price}` },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "In Stock", dataIndex: "inStock", key: "inStock", render: (stock: boolean) => (stock ? "✅ Yes" : "❌ No") },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 10 }}>
            Edit
          </Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={products?.data} loading={loading} pagination={{ pageSize: 10 }} rowKey="_id" />

      <Modal title="Edit Product" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleUpdate}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Brand is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="Mountain">Mountain</Option>
              <Option value="Road">Road</Option>
              <Option value="Hybrid">Hybrid</Option>
              <Option value="BMX">BMX</Option>
              <Option value="Electric">Electric</Option>
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="inStock" label="In Stock" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageProducts;
