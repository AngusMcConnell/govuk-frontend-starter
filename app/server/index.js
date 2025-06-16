#!/usr/bin/env node

const debug = require("debug")("apply-juggling-license:server");
const http = require("node:http");
const { app, adminApp } = require("./app");

/**
 * Get port from environment and store in Express.
 */

const port = normalisePort(process.env.PORT ?? "8080");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Create admin server that we don't expose publicly.
 */

const adminPort = normalisePort(process.env.ADMIN_PORT ?? port + 1000);
const adminServer = http.createServer(adminApp);
adminServer.listen(adminPort);
adminServer.on("error", onError);
adminServer.on("listening", onListening);

/**
 * Normalise a port into a number, string, or false.
 *
 * @param {string} val
 * @returns {string | number | false}
 */
function normalisePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 *
 * @param {SystemError} error
 * @returns {void}
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = "Invalid port";
  if (port !== false) {
    bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 *
 * @returns {void}
 */
function onListening() {
  const addr = server.address();
  if (addr === null) {
    debug("Address is null, cannot determine listening address");
    return;
  }

  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Handle SIGHUP signal.
 *
 * @param {signal} string
 * @returns {void}
 */
function handle(signal) {
  console.log(`*^!@4=> Received event: ${signal}`);
}
process.on("SIGHUP", handle);

/**
 * Handle graceful shutdown on SIGINT or SIGTERM signals.
 *
 * @param {signal} string
 * @returns {void}
 */
function closeGracefully(signal) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`);

  server.close(() => {
    console.debug("HTTP server closed");
  });
  adminServer.close(() => {
    console.debug("admin server closed");
  });
  process.exit();
}
process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);

process.on("uncaughtException", (err) => {
  // clean up allocated resources
  server.close();
  adminServer.close();
  // log necessary error details to log files
  console.error(err);
  process.exit(); // exit the process to avoid unknown state
});

/** Node.js generates system errors when exceptions occur within its runtime environment. These usually occur when an application violates an operating system constraint. For example, a system error will occur if an application attempts to read a file that does not exist.
 * @typedef {Object} SystemError
 * @property {string} [address] - The address to which a network connection failed
 * @property {string} code      - The string error code
 * @property {string} [dest]    - The file path destination when reporting a file system error
 * @property {number} errno     - The system-provided error number
 * @property {Object} [info]    - Extra details about the error condition
 * @property {string} message   - A system-provided human-readable description of the error
 * @property {string} [path]    - The file path when reporting a file system error
 * @property {number} [port]    - The network connection port that is not available
 * @property {string} syscall   - The name of the system call that triggered the error
 */
