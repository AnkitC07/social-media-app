"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [socketState,setSocketState] = useState(null)
    const [chatType, setChatType] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [directChat, setDirectChat] = useState({
        conversations: [],
        current_conversation: null,
        current_messages: [],
    });

    function fetchDirectConversations({ conversations, user_id }) {
        const list = conversations.map((el) => {
            const user = el.participants.find((elm) => elm._id.toString() !== user_id);
            return {
                id: el._id,
                user_id: user?._id,
                name: `${user?.fullName}`,
                online: user?.isActive,
                img: `${user?.avatar}`,
                msg: el.messages.length > 0 ? el.messages.slice(-1)[0].text : "",
                time: "9:36",
                unread: 0,
                pinned: false,
                // about: user?.about,
            };
        });
      
      //updated the state with current data
        // setDirectChat((state) => {
        //     return {
        //         ...state,
        //         conversations: [...state.conversations, ...list],
        //     };
      // });
      
      // only updated retrived data
        setDirectChat((state) => {
            return {
                ...state,
                conversations: [...list],
            };
        });
    }

    function fetchCurrentMessages({ messages, user_id }) {
        console.log("first:", user_id);
        const formatted_messages = messages.map((el) => ({
            id: el._id,
            type: "msg",
            subtype: el.type,
            message: el.text,
            incoming: el.to === user_id,
            outgoing: el.from === user_id,
        }));
       //updated the state with current data
        // setDirectChat((state) => {
        //     return {
        //         ...state,
        //         current_messages: [...state.current_messages, ...formatted_messages],
        //     };
      // });
      
      // only updated retrived data
        setDirectChat((state) => {
            return {
                ...state,
                current_messages: [...formatted_messages],
            };
        });
    }

  function addDirectMessage(message) {
      
        setDirectChat((state) => {
            return {
                ...state,
                current_messages: [...state.current_messages, message],
            };
        });
    }

    //     function addDirectConversation(conversation,user_id) {
    //         const this_conversation = conversation;
    //         const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id);

    //         setDirectChat((state) => {
    //             return {
    //                 ...state,
    //                 conversations: state.conversations.filter((el) => el?.id !== this_conversation._id),
    //             };
    //         });
    // console.log('add direct conversation',user)
    //       directChat.conversations.push({
    //         id: this_conversation._id._id,
    //         user_id: user?._id,
    //         name: `${user?.fullName}`,
    //         online: user?.isActive,
    //         img: `${user?.avatar}`,
    //         msg: faker.music.songName(),
    //         time: "9:36",
    //         unread: 0,
    //         pinned: false,
    //       })
    //       setDirectChat(directChat)
    //     }

    return (
        <ChatContext.Provider
            value={{
                chatType,
                setChatType,
                roomId,
                setRoomId,
                directChat,
                setDirectChat,
                fetchDirectConversations,
                fetchCurrentMessages,
          addDirectMessage,
          socketState,setSocketState
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
