import { useState } from "react";
import { Table, Button, Modal, Form, Select, message, Tag } from "antd";
import { useGetOrdersQuery, useUpdateOrderMutation } from "../../../Redux/features/api/endpoints/order";
import { Order } from "../../../Types";

const { Option } = Select;

const ManageOrders = () => {
  const { data: orders, isLoading } = useGetOrdersQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [form] = Form.useForm();
  const [updateOrder] = useUpdateOrderMutation();

  // Open modal with current order values
  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    form.setFieldsValue({
      status: order.status,
      paymentStatus: order.paymentStatus,
    });
    setIsModalOpen(true);
  };

  // Handle order update
  const handleUpdate = async () => {
    try {
      const updatedValues = form.getFieldsValue();
      const { data, error } = await updateOrder({
        id: editingOrder?._id,
        updatedData: updatedValues,
      });

      if (data?.success) {
        message.success("Order updated successfully");
        setIsModalOpen(false);
      } else if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message.error((error as any)?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      message.error("Error updating order");
    }
  };

  // Status Colors
  const statusColors: Record<string, string> = {
    pending: "orange",
    completed: "green",
    cancelled: "red",
  };

  const paymentColors: Record<string, string> = {
    success: "green",
    cancelled: "red",
    failed: "red",
  };

  // Table Columns
  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "Transaction ID", dataIndex: "transactionID", key: "transactionID" },
    { title: "Customer", dataIndex: "email", key: "email" },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (amount: number) => <strong>${amount}</strong>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => <Tag color={paymentColors[paymentStatus]}>{paymentStatus}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Order) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Update Order
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders?.data}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />

      {/* Update Order Modal */}
      <Modal title="Update Order" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleUpdate}>
        <Form form={form} layout="vertical">
          {/* Order Status */}
          <Form.Item name="status" label="Order Status" rules={[{ required: true }]}>
            <Select>
              {Object.keys(statusColors).map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Payment Status */}
          <Form.Item name="paymentStatus" label="Payment Status" rules={[{ required: true }]}>
            <Select>
              {Object.keys(paymentColors).map((payment) => (
                <Option key={payment} value={payment}>
                  {payment}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageOrders;
