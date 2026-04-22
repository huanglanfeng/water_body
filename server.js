const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = 'https://waterbodybackend-production.up.railway.app';

// API代理：/api → 后端（使用Node原生fetch转发，直接透传）
app.use('/api', async (req, res) => {
  try {
    const targetPath = req.originalUrl.replace(/^\/api/, '') || '/';
    const targetUrl = BACKEND_URL + targetPath;

    // 构建转发请求头（排除host和connection）
    const headers = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (key !== 'host' && key !== 'connection') {
        headers[key] = value;
      }
    }

    // 读取原始请求体
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

    // 转发请求
    const fetchOptions = {
      method: req.method,
      headers,
    };
    if (body && body.length > 0) {
      fetchOptions.body = body;
    }

    const response = await fetch(targetUrl, fetchOptions);

    // 返回响应
    const responseBuffer = Buffer.from(await response.arrayBuffer());
    res.status(response.status);
    
    // 复制响应头（排除transfer-encoding和connection）
    response.headers.forEach((value, key) => {
      if (!['transfer-encoding', 'connection'].includes(key)) {
        res.set(key, value);
      }
    });
    
    res.send(responseBuffer);
  } catch (err) {
    console.error('代理错误:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ code: 50000, msg: '代理请求失败: ' + err.message, data: null });
    }
  }
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
