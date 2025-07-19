import React from 'react';
import { Route, Routes, Outlet, Navigate, useLocation } from 'react-router-dom';
import PageA from './pages/PageA.jsx';
import PageB from './pages/PageB.jsx';
import PageC from './pages/PageC.jsx';
import PageD from './pages/PageD.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AA from './pages/AA.jsx';
import AB from './pages/AB.jsx';
import ForbiddenPage from './pages/403.jsx';
import NotFoundPage from './pages/404.jsx';
import mockRoutesData from './mock/routesData';

// 从模拟数据中提取所有允许访问的路径
const getAllowedPaths = (routes, parentPath = '', paths = new Set()) => {
  routes.forEach(route => {
    // 正确拼接父子路径，确保以斜杠分隔
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;
    paths.add(fullPath);
    // 处理重定向路径
    if (route.redirect) {
      paths.add(route.redirect);
    }
    // 递归处理子路由，移除长度检查确保所有子路由都能被处理
    if (route.children) {
      getAllowedPaths(route.children, fullPath, paths);
    }
  });
  return Array.from(paths);
};

const allowedPaths = getAllowedPaths(mockRoutesData.data.routes);
allowedPaths.push('/403');
allowedPaths.push('/404');
const PUBLIC_ROUTES = ['/login']; // 默认无需权限的路径

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const token = localStorage.getItem('authToken');
  
  // 如果没有token且不是公开路由，重定向到登录页
  if (!token && !PUBLIC_ROUTES.includes(currentPath)) {
    return <Navigate to="/login" replace />;
  }
  
  const isAllowed = allowedPaths.includes(currentPath) || PUBLIC_ROUTES.includes(currentPath);
  return isAllowed ? element : <Navigate to="/403" replace />;
};

// 路由配置
const routes = [
  {
    path: '/pageA',
    name: '页面 A',
    icon: 'pie-chart',
    element: <Outlet />,
    children: [
      {
        path: 'aa',
        element: <AA />,
        name: 'AA',
        icon: 'pie-chart',
      },
      {
        path: 'ab',
        element: <AB />,
        name: 'AB',
        icon: 'pie-chart',
      }
    ]
  },
  {
    path: '/',
    redirect: '/pageA',
    isFullScreen: true
  },
  {
    path: '/login',
    element: <LoginPage />,
    name: '登录',
    icon: 'user',
    isFullScreen: true,
    showInMenu: true
  },
  {
    path: '/pageB',
    element: <PageB />,
    name: '页面 B',
    icon: 'form',
  },
  {
    path: '/pageC',
    element: <PageC />,
    name: '页面 C',
    icon: 'table',
  },
  {
    path: '/pageD',
    element: <PageD />,
    name: '页面 D',
    icon: 'bar-chart',
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to='/404' replace />,
  },
];

// 路由组件
const RouterConfig = () => {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={
          route.redirect ? (
            <Navigate to={route.redirect} replace />
          ) : route.children && route.children.length > 0 ? (
            route.element
          ) : (
            <PrivateRoute element={route.element} />
          )
        }
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export { routes, RouterConfig };
    