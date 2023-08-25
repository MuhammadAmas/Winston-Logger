const express = require("express");
const http = require("http");
const winston = require("winston");
const app = express();
const server = http.createServer(app);

const customTransport = new winston.transports.Http({
  host: "54.209.40.57", 
  port: 3001,
  path: "/logs",
  method: "POST",
});

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    customTransport, 
  ],
});

logger.log("info", "hey i am on machine A");

// Override the default console.log function to use the logger
// const originalConsoleLog = console.log;
// console.log = function (...args) {
//   originalConsoleLog.apply(console, args);
//   const message = args.join(" ");
//   logger.info(message);
// };

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
