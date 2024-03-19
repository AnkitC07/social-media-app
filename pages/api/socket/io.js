// import { Server as NetServer } from "http";
// import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

// Initialize the `io` instance outside the `ioHandler` function
// let io;
export default function handler(req, res) {
    console.log("socket io api");

    console.log("io", io);
    if (!io) {
        const path = "/api/socket/io";
        const httpServer = req.socket.server; // Type assertion for clarity

        if (!httpServer || !httpServer.allowHalfOpen === undefined) {
            // Handle the case where `httpServer` might be undefined or not a valid NetServer
            console.error("Server is not ready to accept connections");
            res.status(500).end("Internal Server Error");
            return;
        }

        io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
            transports: ["websocket", "polling"],
        });
    }
    res.status(200).end()
}

// const handler = (req, res) => {
//     console.log('socket io api');
//     // res.setHeader('Access-Control-Allow-Origin', '*');

//     // const path = "/api/socket/io";
//     // if (res.socket.server.io) {
//     //     console.log('Socket is already running')
//     //   } else {
//     //     console.log('Socket is initializing')
//     //     const io = new ServerIO(res.socket.server,)
//     //     res.socket.server.io = io
//     //   }

//     // Check if `io` is already initialized
// //     console.log("io",io)
// //   if (!io) {
// //     const path = "/api/socket/io";
// //     const httpServer = req.socket.server  // Type assertion for clarity

// //     if (!httpServer || !httpServer.allowHalfOpen === undefined) {
// //       // Handle the case where `httpServer` might be undefined or not a valid NetServer
// //       console.error('Server is not ready to accept connections');
// //       res.status(500).end('Internal Server Error');
// //       return;
// //     }

// //     io = new ServerIO(httpServer, {
// //       path: path,
// //       addTrailingSlash: false,
// //     });
// //   }

// res.status(200).json({ message: 'Hello from Next.js!' });
// };
