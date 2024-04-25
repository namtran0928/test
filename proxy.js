const express = require('express');
const axios = require('axios');
const liveServer = require('live-server');
const { exec } = require('child_process');

// Tạo một ứng dụng Express
const app = express();
const PORT = process.env.PORT || 3000;

// Thiết lập CORS cho máy chủ proxy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Xử lý yêu cầu GET đến /fetch và gửi lại dữ liệu từ trang web mục tiêu
app.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://thanhnien.vn/kinh-te.htm');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from target website');
  }
});

// Serve index.html
app.use(express.static(__dirname));

// Khởi động máy chủ Express
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});

// Khởi động Live Server
exec('live-server --port=5500');
