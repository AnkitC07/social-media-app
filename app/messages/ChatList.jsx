"use client";

import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../_context/Chat";
import { PostContext } from "../../_context/Post";
import { socket } from "../../helpers/socket";

const ChatList = ({ users }) => {
    const { userData } = useContext(PostContext);
    const { fetchDirectConversations, directChat } = useContext(ChatContext);

    useEffect(() => {
        socket?.emit("get_direct_conversations", { user_id: userData?._id }, (data) => {
            console.log("get_direct_conversations", data); // this data is the list of conversations
            // dispatch action
            fetchDirectConversations({ conversations: data, user_id: userData?._id });
        });
    }, []);

    return (
        <div class="border-r border-gray-300 lg:col-span-1">
            {/* Search Area */}
            {/* <div class="mx-3 my-3 searchArea">
        <div class="relative text-gray-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 text-gray-300"
                >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </span>
            <input
                type="search"
                class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
            />
        </div>
    </div> */}

            <ul class="overflow-auto h-[32rem]">
                <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                {console.log(directChat.conversations)}
                {users.length > 0 &&
                
                    directChat?.conversations.map((el, idx) => {
                        return <ListItem key={idx} {...el} />;
                    })
                
                    // users.map((user, i) => {
                    //     let isActive = false; // user.id === activeUserId ? true : false;
                    //     return <ListItem key={i} user={user} isActive={isActive} />;
                    // })
                }
            </ul>
        </div>
    );
};

const ListItem = ({ img, name, msg, time, unread, online, id }) => {
    const truncateText = (string, n) => {
        return string?.length > n ? `${string?.slice(0, n)}...` : string;
    };
    const { roomId, setRoomId, setChatType } = useContext(ChatContext);
    const selectedChatId = roomId?.toString();
    let isSelected = +selectedChatId === id;

    if (!selectedChatId) {
        isSelected = false;
    }
    console.log(isSelected)
    return (
        <li>
            <div
                onClick={() => {
                    setRoomId(id);
                    setChatType("individual");
                }}
                class=" relative flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
            >
                <img
                    class="object-cover w-10 h-10 rounded-full"
                    src={img}
                    onError={(e) => {
                        e.target.src = "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg";
                    }}
                    alt="username"
                />
                {online ? <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span> : ""}
                <div class="w-full pb-2">
                    <div class="flex justify-between">
                        <span class="block ml-2 font-semibold text-gray-600">{name}</span>
                        <span class="block ml-2 text-sm text-gray-600">{time}</span>
                    </div>
                    <span class="block ml-2 text-sm text-gray-600">{truncateText(msg, 20)}</span>
                </div>
            </div>
        </li>
    );
};

export default ChatList;
