import React from 'react';
import { Outlet } from 'react-router-dom';

const PageA = () => {
  return (
    <div>
      <h1>欢迎来到页面 AAAAAAAA</h1>
      <p>这是一个简单的 React 页面。</p>
      <Outlet /> {/* 子路由内容将在这里渲染 */}
    </div>
  );
};

export default PageA;
