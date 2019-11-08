const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

//  Serve static assets
app.use(express.static(path.join(__dirname, '../../dist/chitty-chat/')));

//  Route requests to angular app
app.get('*', (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../dist/chitty-chat/index.html'));
})

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
