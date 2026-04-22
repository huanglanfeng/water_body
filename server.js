const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = 'https://waterbodybackend-production.up.railway.app';

// API代理：/api/* → 后端
app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq: (proxyReq, req) => {
    // 转发原始请求头
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  },
  onError: (err, req, res) => {
    console.error('代理错误:', err.message);
    res.status(500).json({ code: 50000, msg: '代理请求失败', data: null });
  },
}));

// 静态文件服务（Vite构建产物）
app.use(express.static(path.join(__dirname, 'dist')));

// SPA兜底：所有非API请求返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
});
