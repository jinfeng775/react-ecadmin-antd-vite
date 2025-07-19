import React, { useState, useEffect } from 'react';
import mockRoutesData from '../mock/routesData';
import { Menu, Layout, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  PieChartOutlined,
  FormOutlined,
  TableOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname || '/');
  const [menuRoutes, setMenuRoutes] = useState([]);

  useEffect(() => {
    if (mockRoutesData.code === 200) {
      setMenuRoutes(mockRoutesData.data.routes);
    }
  }, []);

  // 处理菜单选择
  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  // 递归生成菜单项（支持二级菜单）
  const generateMenuItems = (routes, parentPath = '') => {
    return routes.map((route) => {
      const iconMap = {
        'pie-chart': <PieChartOutlined />,
        'form': <FormOutlined />,
        'table': <TableOutlined />,
        'bar-chart': <BarChartOutlined />,
        'line-chart': <LineChartOutlined />,
        'area-chart': <AreaChartOutlined />,
      };

      const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;

      // 有子路由时生成下拉菜单
      if (route.children && route.children.length > 0) {
        return {
          key: fullPath,
          label: <Link to={fullPath}>{route.name}</Link>,
          icon: iconMap[route.icon] || null,
          children: generateMenuItems(route.children, fullPath),
        };
      }

      // 普通菜单项
      return {
        key: fullPath,
        label: <Link to={fullPath}>{route.name}</Link>,
        icon: iconMap[route.icon] || null,
      };
    });
  };

  // 生成菜单项（过滤不显示的路由）
  const menuItems = generateMenuItems(
    menuRoutes.filter(route => route.showInMenu !== false)
  );

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#fff'
        }}
    >
      <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuSelect}
        style={{
          height: `calc(100vh - 64px)`, // 减去logo的高度（32 + 16*2）
        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
    