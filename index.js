const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // Handle message from client
    console.log("Received message from client:", message);

    // Read the JSON file synchronously
    const jsonData = JSON.parse(fs.readFileSync("data.json"));

    // Parse message from client
    const commandIndex = parseInt(message);
    if (
      Number.isNaN(commandIndex) ||
      commandIndex < 0 ||
      commandIndex >= jsonData.commands.length
    ) {
      console.log("Invalid index.");
      return;
    }

    // Send the selected command
    const command = jsonData.commands[commandIndex];
    ws.send(command);
  });
});

server.listen(3000, function listening() {
  console.log("Server started on port 3000");
});
