const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Rcon = require("rcon");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// RCON configuration
const host = "127.0.0.1";
const port = 25575;
const password = "12345";
const rcon = new Rcon(host, port, password);

app.use(express.static("public"));

// Connect to RCON server
rcon.connect();

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // Handle message from client
    console.log("Received message from client:", message);

    // Convert the received message to a string if it's a Buffer
    if (message instanceof Buffer) {
      message = message.toString();
    }

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

    // Send the selected command via RCON
    const command = jsonData.commands[commandIndex];
    rcon.send(command);
  });
});

// Handle RCON response
rcon.on("response", (response) => {
  console.log("Response from RCON server:", response);
});

server.listen(3000, function listening() {
  console.log("Server started on port 3000");
});
