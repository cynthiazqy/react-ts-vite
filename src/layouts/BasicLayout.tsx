import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const BasicLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/about',
      icon: <UserOutlined />,
      label: '关于',
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Header>
      <Content style={{ padding: '50px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        React Demo ©{new Date().getFullYear()} Created by You
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
