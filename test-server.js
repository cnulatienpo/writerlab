const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve drafting room
app.get('/drafting-room', (req, res) => {
  res.sendFile(path.join(__dirname, 'drafting room', 'index.html'));
});

// Serve static files from drafting room
app.use('/drafting-room', express.static(path.join(__dirname, 'drafting room')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
