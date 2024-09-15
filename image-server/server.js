// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // You can choose any port you like

// Serve static files from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(port, () => {
  console.log(`Image server running at http://localhost:${port}`);
});
