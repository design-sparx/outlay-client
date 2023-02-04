import React, {ReactNode, useState} from 'react';
import {Breadcrumb, Button, Dropdown, Layout, MenuProps, Typography} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {IUser} from "../types";

import './index.css';


const {Header, Content, Footer} = Layout;

interface IProps {
  children: ReactNode
}

const Wrapper = ({children}: IProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user: IUser | null = JSON.parse(localStorage.getItem('outlay-user') ?? "");

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem('outlay-user');
    setLoading(false);
    navigate('/login');
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      icon: <LogoutOutlined/>,
      onClick: handleLogout,
    }
  ];

  return (
    <Layout>
      <Header className="navbar-header">
        <div className="navbar-brand">
          <Typography.Title level={3}>Outlay</Typography.Title>
        </div>
        <Dropdown menu={{items}} arrow trigger={['click']}>
          <Button type="text" icon={<UserOutlined/>} className="user-dropdown" loading={loading}>{user?.name}</Button>
        </Dropdown>
      </Header>
      <Content className="site-layout">
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="content">{children}</div>
      </Content>
      <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default Wrapper;
