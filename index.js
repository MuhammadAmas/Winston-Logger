const express = require("express");
const http = require("http");
const axios = require("axios");
const winston = require("winston");
const app = express();
const server = http.createServer(app);

const customTransport = new winston.transports.Http({
  host: "0.0.0.0",
  port: 3001,
  path: "/logs",
  method: "POST",
});

async function getPublicIp() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error getting public IP address:", error.message);
    return "Unknown";
  }
}

(async () => {
  const machineAIp = await getPublicIp();

  const customFormat = winston.format.printf(({ level, message }) => {
    return `${new Date().toISOString()} - [${level}] - [Machine A Public IP: ${machineAIp}] - ${message}`;
  });

  const customLogger = winston.createLogger({
    // format: winston.format.combine(customFormat),
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      customFormat
    ),
    level: "info",
    transports: [new winston.transports.Console(), customTransport],
  });

  function unifiedLog(level, message) {
    customLogger.log(level, message);
  }

  global.Console = {
    log: (message) => unifiedLog("info", message),
    error: (message) => unifiedLog("error", message),
    info: (message) => unifiedLog("info", message),
  };

  Console.info(machineAIp);

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
