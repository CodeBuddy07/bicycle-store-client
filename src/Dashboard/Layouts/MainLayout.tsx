import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, Users, PackagePlus, Boxes, Truck, KeyRound } from 'lucide-react';
import { logout } from '../../Redux/features/api/authSlice';


const { Header, Content, Sider } = Layout;



const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.auth);

  const adminNav = [
    {
      name: "All Users",
      icon: <Users size={20}/> ,
      path: '/dashboard/users'
    },
    {
      name: "Add Product",
      icon: <PackagePlus size={20}/> ,
      path: '/dashboard/add-product'
    },
    {
      name: "Manage Product",
      icon: <Boxes size={20}/> ,
      path: '/dashboard/manage-products'
    },
    {
      name: "Manage Orders",
      icon: <Truck size={20}/> ,
      path: '/dashboard/manage-orders'
    },
    
  ]
  
  const customerNav = [
    {
      name: "Orders",
      icon: <ShoppingBag size={20}/>,
      path: '/dashboard/manage-customer-orders'
    },
    {
      name: "Update Password",
      icon: <KeyRound size={20}/>,
      path: '/dashboard/update-password',
    }
  ]
  
  const items = (user?.role === "admin" ? adminNav : customerNav).map(
    (menuItem) => ({
      key: menuItem.path, // Use path as key for navigation
      icon: menuItem.icon,
      label: menuItem.name,
    })
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };


  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        
      >
        <div  onClick={()=> navigate('/')} className='w-full 16 p-4 flex justify-center items-center gap-3 cursor-pointer '>
            <img className='w-10' src="/logo.png" alt="" />
            <h1 className='text-white font-semibold text-lg'>Bicycle Store</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]} items={items} onClick={({ key }) => navigate(key)} />
        <button onClick={()=>handleLogout()} className='text-white bg-red-500 flex justify-center items-center w-full rounded-md py-2 my-3 gap-5 font-semibold'>
          <LogOut size={20}/>
          Log Out
        </button>
      </Sider>
      <Layout className='!h-screen'>
        <Header className='flex justify-start items-center ' style={{ padding: 0, background: colorBgContainer }} >
            <h1 className='text-lg font-semibold px-5'>Hello! <span>{user?.name || "USER"}</span></h1>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className='!h-full overflow-y-scroll'
          >
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;