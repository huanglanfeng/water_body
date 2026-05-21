const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'https://waterbodybackend-production-43a0.up.railway.app';

// 通用代理：将所有请求转发到后端，去掉 /api 前缀
app.use('/api', (req, res) => {
  // 去掉 /api 前缀
  const targetPath = req.originalUrl.replace(/^\/api/, '') || '/';
  const targetUrl = new URL(targetPath, BACKEND_URL);

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
  headers['x-forwarded-for'] = clientIp;

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
  console.log(`后端地址: ${BACKEND_URL}`);
});
