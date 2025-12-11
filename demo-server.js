const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.static(__dirname));

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

app.listen(PORT, () => {
  console.log(`Demo UI running on http://localhost:${PORT}/demo`);
});
