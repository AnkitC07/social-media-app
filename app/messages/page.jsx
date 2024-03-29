"use client";

import { useEffect } from "react";
import {socket} from '../layout.jsx'
import axios from "axios";

const MessagesPage = () => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });
      
      socket.on("welcome", (data) => {
        console.log("On welcome event:",data)
      })

        //     // Handle events here

        //     try {

        //         axios.get("/api/socket").then(response=>console.log("Messaging data=>",response.data))

        //     } catch (error) {
        //         console.log(error);
        //     }
        //     return () => {
        //       socket.disconnect();
        //     };
    }, []);

    return <div>MessagesPage</div>;
};

export default MessagesPage;
