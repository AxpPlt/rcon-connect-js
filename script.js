const ws = new WebSocket("ws://localhost:3000");

ws.onopen = function () {
  console.log("Connected to WebSocket server");
};

ws.onmessage = function (event) {
  console.log("Received message from server:", event.data);
};

ws.onerror = function (error) {
  console.error("WebSocket error:", error);
};

function sendCommand() {
  const commandIndex = document.getElementById("commandInput").value;
  ws.send(commandIndex);
}
