const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // Parse JSON in the request body

// GET /api/resource1
app.get('/api/resource1', (req, res) => res.json({ message: 'Success' }));

// POST /api/resource1
app.post('/api/resource1', (req, res) => {
  const requestData = req.body.data;
  // Process the data and respond accordingly
  res.status(201).json({ message: 'Resource created successfully', data: requestData });
});

// GET /api/resource2
app.get('/api/resource2', (req, res) => res.json({ data: 'Resource 2 content' }));

// POST /api/resource2
app.post('/api/resource2', (req, res) => {
  const requestData = req.body.data;
  // Process the data and respond accordingly
  res.status(201).json({ message: 'Resource created successfully', data: requestData });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
