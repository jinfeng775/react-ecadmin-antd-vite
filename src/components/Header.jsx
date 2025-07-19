import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown, Menu, Badge } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider', // 分隔线
    },
    {
      key: 'logout',
      label: '退出登录',
      onClick: handleLogout
    },
  ];

  return (
    <Header
      style={{
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* 左侧菜单按钮 */}
      <div style={{ display: 'none', marginRight: 16 }}>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <MenuUnfoldOutlined />
        </button>
      </div>

      {/* 中间标题 */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 20, color: '#1890ff' }}>管理系统</h1>
      </div>

      {/* 右侧工具栏 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge count={5} style={{ marginRight: 16 }}>
          <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        </Badge>
        {/* 使用menu属性并传入配置项数组 */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <span style={{ marginLeft: 8, marginRight: 4 }}>管理员</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;