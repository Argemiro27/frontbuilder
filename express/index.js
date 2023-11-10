const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());

const requestWithTimeout = (url) => {
  return Promise.race([
    axios.head(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000) // Timeout set to 5 seconds
    ),
  ]);
};

// Endpoint with timeout for Homologação
app.get('/teste-wms', (req, res) => {
  requestWithTimeout('http://testewms.cocatrel.com.br/login')
    .then((response) => {
      res.json({
        status: response.status,
        headers: response.headers,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Endpoint with timeout for Homologação IP
app.get('/teste-wms-ip', (req, res) => {
  requestWithTimeout('http://161.35.233.83/login')
    .then((response) => {
      res.json({
        status: response.status,
        headers: response.headers,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Endpoint with timeout for Produção
app.get('/wms-prod', (req, res) => {
  requestWithTimeout('http://wms.cocatrel.com.br/login')
    .then((response) => {
      res.json({
        status: response.status,
        headers: response.headers,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Endpoint with timeout for Produção IP
app.get('/wms-prod-ip', (req, res) => {
  requestWithTimeout('http://15.229.114.188/login')
    .then((response) => {
      res.json({
        status: response.status,
        headers: response.headers,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
