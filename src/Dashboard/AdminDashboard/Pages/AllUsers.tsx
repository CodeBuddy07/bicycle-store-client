/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, Button, Select, Popconfirm, message } from "antd";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "../../../Redux/features/api/endpoints/user";
import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";

const { Option } = Select;

const AllUsers = () => {



const { data: users, isLoading } = useGetAllUsersQuery({});
const { user } = useSelector((state: RootState) => state.auth);

const [deleteUser] = useDeleteUserMutation();
const [updateRole] = useUpdateUserRoleMutation();

  const handleDelete = async (userId: string) => {
    const { data } = await deleteUser(userId);
    if(data?.success){
        message.success("User deleted successfully");
    }else{
        message.error(data?.message || "Something went wrong" );
    }
  };

  const handleUpdate = async (userId:string, updatedDoc: {[key: string]: string}) => {

    const { data } = await updateRole({updatedDoc, id:userId})

    if(data?.success){
        message.success("User updated!");
    }else{
        message.error(data?.message || "Something went wrong" );
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record:any) => (
        <Select  disabled={user?.email === record.email} defaultValue={role} onChange={(value) => handleUpdate(record._id, {role: value})}>
          <Option value="admin">Admin</Option>
          <Option value="customer">Customer</Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record:any) => (
        <Select  disabled={user?.email === record.email} defaultValue={status} onChange={(value) => handleUpdate(record._id, {status: value})}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_:any, record: any) => (
        <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
          <Button disabled={user?.email === record.email} danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users?.allCustomers} loading={isLoading} rowKey="_id" />;
};

export default AllUsers;
