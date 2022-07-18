const { io } = require('socket.io-client');

const logger = require('./logger');

const saveData = require('./influxdb');

(() => {
  const socket = io(process.env.MNIA_SOCKET_URL || 'ws://localhost:3000');

  socket.on("connect", () => {
    logger.info(`Websocket connected (${socket.id}).`);
  });

  socket.on("event", (...args) => {
    saveData(args[0]);
  });

  socket.on("disconnect", () => {
    logger.info(`Websocket disconnected.`);
  });
})();
