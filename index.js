const Rcon = require("rcon");
const host = "127.0.0.1";
const port = 25575;
const password = "12345";

const rcon = new Rcon(host, port, password);

rcon.on("auth", () => {
  console.log("Authenticated with TSP server");
  //  work
  // Example: send command
  rcon.send("give AxpPlt premium");

  rcon.disconnect();
});

rcon.on("response", (response) => {
  console.log("Response from server:", response);
});

rcon.on("error", (err) => {
  console.error("Error:", err.message);
});

rcon.connect();
