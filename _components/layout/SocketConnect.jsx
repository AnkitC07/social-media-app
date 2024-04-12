"use client";

import React, { useContext, useEffect } from "react";
import { PostContext } from "../../_context/Post";
import { ChatContext } from "../../_context/Chat";
import toast from "react-hot-toast";
import { connectSocket, socket } from "../../helpers/socket";

const SocketConnect = () => {
    // let token;
    // if (typeof window !== "undefined") token = window.localStorage.getItem("token");

    // const { userData, isLoggedIn, setToken, setNotificationsArr } = useContext(PostContext);
    // const {
    //     addDirectMessage,
    //     directChat,
    //     setSocketState,
    //     addDirectConversation,
    //     updateDirectConversation,
    //     setChatType,
    //     setRoomId,
    // } = useContext(ChatContext);

    // useEffect(() => {
    //     setToken(token);
    //     if (isLoggedIn || token) {
    //         console.log(">>>>>>>>>>>>>", userData, socket);
    //         if (!socket && userData?._id) {
    //             console.log(">>>>>inside socket connection");
    //             setSocketState(connectSocket(userData._id));
    //         }
    //         console.log("after reconnecting", socket?.connected);
    //         //   socket/.on("audio_call_notification", (data) => {
    //         //     // TODO => dispatch an action to add this in call_queue
    //         //     dispatch(PushToAudioCallQueue(data));
    //         //   });

    //         //   socket?.on("video_call_notification", (data) => {
    //         //     // TODO => dispatch an action to add this in call_queue
    //         //     dispatch(PushToVideoCallQueue(data));
    //         //   });

    //         socket?.on("new_message", (data) => {
    //             const message = data.message;
    //             console.log("current_conversation", data);
    //             // check if msg we got is from currently selected conversation
    //             console.log(directChat, data.conversation_id);
    //             if (directChat.current_conversation?.id === data.conversation_id) {
    //                 addDirectMessage({
    //                     id: message._id,
    //                     type: "msg",
    //                     subtype: message.type,
    //                     message: message.text,
    //                     incoming: message.to === userData?._id,
    //                     outgoing: message.from === userData?._id,
    //                 });
    //             }
    //         });

    //         socket?.on("start_chat", (data) => {
    //             console.log(data,directChat);
    //             // add / update to conversation list
    //             const existing_conversation = directChat?.conversations.find((el) => el?.id === data._id);
    //             if (existing_conversation) {
    //                 // update direct conversation
    //                 updateDirectConversation({ conversation: data, user_id: userData?._id });
    //             } else {
    //                 // add direct conversation
    //                 addDirectConversation({ conversation: data, user_id: userData?._id });
    //             }
    //             setRoomId(data._id);
    //             setChatType("individual");
    //         });

    //         socket?.on("new_friend_request", (data) => {
    //             console.log("i am the reciever >>> ", data);
    //             setNotificationsArr((state) => [...state, data.message]);
    //             toast(
    //                 <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg  my-3">
    //                     {/* <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
    //                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
    //                         <img
    //                             className="w-full h-full object-cover rounded-full"
    //                             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    //                             alt=""
    //                             />
    //                     </div>
    //                 </div> */}
    //                     <div>
    //                         <span className="font-mono">
    //                             {" "}
    //                             <b>{data.username}</b> started following you
    //                         </span>
    //                     </div>
    //                     <div>
    //                         <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             className="h-5 w-5"
    //                             viewBox="0 0 20 20"
    //                             fill="currentColor"
    //                         >
    //                             <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    //                         </svg>
    //                     </div>
    //                 </div>,
    //                 {
    //                     position: "top-right",
    //                     className: "w-fit",
    //                 }
    //             );
    //         });

    //         //   socket?.on("request_accepted", (data) => {
    //         //     dispatch(
    //         //       showSnackbar({
    //         //         severity: "success",
    //         //         message: "Friend Request Accepted",
    //         //       })
    //         //     );
    //         //   });

    //         socket?.on("request_sent", (data) => {
    //             console.log("i am the sender >>> ", data);
    //         });
    //     }

    //     // Remove event listener on component unmount
    //     return () => {
    //         socket?.off("new_friend_request");
    //         //   socket?.off("request_accepted");
    //         socket?.off("request_sent");
    //         //   socket?.off("start_chat");
    //         socket?.off("new_message");
    //         //   socket?.off("audio_call_notification");
    //     };
    // }, [userData, isLoggedIn, socket?.connected, directChat]);

    return <></>;
};

export default SocketConnect;
