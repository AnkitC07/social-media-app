// import { Server as NetServer } from "http";
// import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize the `io` instance outside the `ioHandler` function
let io;

const ioHandler = (req, res) => {
  console.log('socket io api');

  // Check if `io` is already initialized
  if (!io) {
    const path = "/api/socket/io";
    const httpServer = req.socket.server  // Type assertion for clarity

    if (!httpServer || !httpServer.allowHalfOpen === undefined) {
      // Handle the case where `httpServer` might be undefined or not a valid NetServer
      console.error('Server is not ready to accept connections');
      res.status(500).end('Internal Server Error');
      return;
    }

    io = new ServerIO(httpServer, { 
      path: path,
      addTrailingSlash: false,
    });
  }

  res.end();
};

export default ioHandler;