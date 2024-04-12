"use client";

import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../_context/Chat";
import { PostContext } from "../../_context/Post";
import { socket } from "../../helpers/socket";
import useResponsiveHook from "../../_components/common/ResponsiveHook";

const ChatList = () => {
    const layouts = useResponsiveHook();
    const { userData } = useContext(PostContext);
    const { fetchDirectConversations, directChat, roomId } = useContext(ChatContext);

    useEffect(() => {
        console.log("get list");
        // if (!directChat?.conversations) {
        socket?.emit("get_direct_conversations", { user_id: userData?._id }, (data) => {
            console.log("get_direct_conversations", data); // this data is the list of conversations
            // dispatch action
            fetchDirectConversations({ conversations: data, user_id: userData?._id });
        });
        // }
    }, [socket]);

    return (
        <>
            {layouts.isMobile && roomId != null ? (
                ""
            ) : (
                <div className="border-r border-gray-300 lg:col-span-1">
                    {/* Search Area */}
                    {/* <div className="mx-3 my-3 searchArea">
<div className="relative text-gray-600">
    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-300"
        >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    </span>
    <input
        type="search"
        className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
        name="search"
        placeholder="Search"
        required
    />
</div>
</div> */}

                    <ul className="overflow-auto h-[80vh] bg-bg-card ">
                        <div className="h-[65px] border-b border-gray-300 p-5 ">
                            <h2 className=" text-xl font-medium ">Chats</h2>
                        </div>
                        {/* {console.log(directChat.conversations)} */}
                        {directChat?.conversations.length > 0 &&
                            directChat?.conversations.map((el, idx) => {
                                return <ListItem key={idx} {...el} />;
                            })}
                    </ul>
                </div>
            )}
        </>
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
    // console.log(isSelected);
    return (
        <li>
            <div
                onClick={() => {
                    setRoomId(id);
                    setChatType("individual");
                }}
                className=" relative flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:text-black hover:bg-gray-100 focus:outline-none"
            >
                <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={img}
                    onError={(e) => {
                        e.target.src = "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg";
                    }}
                    alt="username"
                />
                {online ? <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span> : ""}
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold ">{name}</span>
                        <span className="block ml-2 text-sm ">{time}</span>
                    </div>
                    <span className="block ml-2 text-sm ">{truncateText(msg, 20)}</span>
                </div>
            </div>
        </li>
    );
};

export default ChatList;
