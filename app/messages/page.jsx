'use client'

import { useEffect } from 'react';
import io from 'socket.io-client';
import axios from "axios"


const MessagesPage = () => {
    useEffect(() => {
        const socket = io("http://localhost:3001");

        // Handle events here

        try {
            
            axios.get("/api/socket").then(response=>console.log("Messaging data=>",response.data))

        } catch (error) {
            console.log(error);
        }
        return () => {
          socket.disconnect();
        };
      }, []);
    
  return (
    <div>MessagesPage</div>
  )
}

export default MessagesPage