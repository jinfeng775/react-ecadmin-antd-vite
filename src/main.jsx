import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.jsx';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ConfigProvider locale={zhCN} theme={{ mode: 'dark', token: { colorPrimary: '#1890ff' } }}>
        <App />
      </ConfigProvider>
    </Router>
  </StrictMode>,
)
