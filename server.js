const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;
const BACKEND_URL = 'https://waterbodybackend-production.up.railway.app';

// API代理：/api → 后端（使用http/https模块转发，更可靠）
app.use('/api', (req, res) => {
  const targetPath = req.originalUrl.replace(/^\/api/, '') || '/';
  const targetUrl = new URL(targetPath, BACKEND_URL);

  // 构建转发请求头
  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  // 确保X-Forwarded-For只包含客户端真实IP（去掉中间代理链）
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
  headers['x-forwarded-for'] = clientIp;

  // 使用http/https模块转发，设置超时
  const options = {
    hostname: targetUrl.hostname,
    port: 443,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers,
    timeout: 15000,
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('代理错误:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ code: 50000, msg: '代理请求失败: ' + err.message, data: null });
    }
  });

  proxyReq.on('timeout', () => {
    proxyReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ code: 50000, msg: '代理请求超时', data: null });
    }
  });

  req.pipe(proxyReq);
});

// 静态文件服务（Vite构建产物）
app.use(express.static(path.join(__dirname, 'dist')));

// SPA兜底：所有非API请求返回index.html（禁用缓存）
app.get('*', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
});
