import React, { useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { routes } from '../routes.jsx';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 查找当前路由配置
  const getRouteConfig = (path, routes, parentPath = '') => {
    for (const route of routes) {
      const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;
      if (fullPath === path) return route;
      if (route.children) {
        const childRoute = getRouteConfig(path, route.children, fullPath);
        if (childRoute) return childRoute;
      }
    }
    return null;
  };

  const routeConfig = getRouteConfig(currentPath, routes);
  const shouldHideMenu = routeConfig?.isFullScreen === true;

  const [collapsed, setCollapsed] = useState(false);

  // 侧边栏折叠/展开处理
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {!shouldHideMenu && (
        <Sidebar collapsed={collapsed} onCollapse={toggleCollapsed} />
      )}
      <Layout
        className="site-layout"
        style={{ marginLeft: !shouldHideMenu ? (collapsed ? 80 : 200) : 0 }}
      >
        {!shouldHideMenu && <Header />}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </div>
  );
};

export default MainLayout;