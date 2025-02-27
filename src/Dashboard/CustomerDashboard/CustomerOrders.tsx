import { Table, Tag } from "antd";
// Assuming you store user info in Redux
import { RootState } from "../../Redux/store";
import { Order } from "../../Types";
import { useGetOrdersQuery } from "../../Redux/features/api/endpoints/order";
import { useSelector } from "react-redux";

const CustomerOrders = () => {
  const { data: orders, isLoading } = useGetOrdersQuery({});
  const user = useSelector((state: RootState) => state.auth.user); // Get logged-in user

  // Filter orders belonging to the logged-in user
  const customerOrders = orders?.data?.filter((order: Order) => order.email === user?.email);

  // Status Colors
  const statusColors: Record<string, string> = {
    pending: "orange",
    completed: "green",
    cancelled: "red",
  };

  const paymentColors: Record<string, string> = {
    success: "green",
    failed: "red",
    cancelled: "red",
  };

  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "Transaction ID", dataIndex: "transactionID", key: "transactionID" },
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
  ];

  return (
    <>
      <h2>Your Orders</h2>
      <Table
        columns={columns}
        dataSource={customerOrders}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />
    </>
  );
};

export default CustomerOrders;
