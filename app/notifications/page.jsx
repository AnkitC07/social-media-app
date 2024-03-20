"use client";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../_context/Post";
import { UserContext } from "../../_context/User";

const NotificationPage = () => {
    const { userData, socket } = useContext(PostContext);
    const followedUserId = userData._id;
    const [notifications, setNotifications] = useState([]);
    // useEffect(() => {

    //     console.log(userData._id);
    //     // Join room specific to the user
    //     // if(userData._id)
    //     socket.emit('join', followedUserId);

    //     // Listen for notification events
    //     socket.on("notification", (notification) => {
    //         console.log("follow notification.",notification)
    //         setNotifications((prevNotifications) => [...prevNotifications, notification]);
    //     });

    //     // Clean up event listener when the component unmounts
    //     return () => {
    //         // socket.off(`notification`);
    //         // socket.off(`join`);
    //         // socket.disconnect();
    //     };
    // }, [socket,userData]);

    useEffect(() => {
        console.log(socket);
        // if (socket) {
            socket?.on("followRequest", (data) => {
                console.log("followRequest >>> ", data);
            });
        // }
    }, [socket]);

    return <div>NotificationPage</div>;
};

export default NotificationPage;
