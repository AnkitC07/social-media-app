"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";
import axios from "axios";

const SocketContext = createContext({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    //   useEffect(() => {
    //     const socketInstance = new ClientIO("http://localhost:3000", {
    //       path: "/api/socket/io",
    //         addTrailingSlash: false,
    //         transports: ["polling","websocket"] 
    //     });

    //       socketInstance.on("connect", () => {
    //         console.log("Connected");
    //         setIsConnected(true);
    //     });

    //     socketInstance.on("disconnect", () => {
    //         console.log("Disconnected");
    //       setIsConnected(false);
    //     });

    //     setSocket(socketInstance);

    //     return () => {
    //       socketInstance.disconnect();
    //     }
    //   }, []);

    // useEffect(() => {socketInitializer()}, []);

    // const socketInitializer = async () => {
    //     await fetch("/api/socket/io");
        // let socket = ClientIO("http://localhost:3000", {
        //           path: "/api/socket/io",
        //             // addTrailingSlash: false,
        //         });

        // socket.on("connect", () => {
        //     console.log("connected");
        // });
        // socket.on("disconnect", () => {
        //     console.log("disconnect");
        // });
        // setSocket(socket);
    // };

    return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
