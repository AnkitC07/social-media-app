"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../_context/Chat";
import { Stack, Box } from "@mui/material";
import { socket } from "../../helpers/socket";
import { PostContext } from "../../_context/Post";
import TextMsg from "../../_components/Chat/TextMsg";

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}

function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

export const Conversation = ({messageListRef}) => {
    const { roomId, directChat, setDirectChat, fetchCurrentMessages } = useContext(ChatContext);
    const { userData } = useContext(PostContext);

    // const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState("");
    console.log(roomId);

    useEffect(() => {

        const current = directChat.conversations.find((el) => el?.id === roomId);

        socket?.emit("get_messages", { conversation_id: current?.id }, (data) => {
            // data => list of messages
            console.log(data, "List of messages");
            fetchCurrentMessages({ messages: data, user_id: userData?._id });
        });
        setDirectChat((state) => {
            return {
                ...state,
                current_conversation: current,
            };
        });
    }, [roomId]);

    const handleSend = (e) => {
        e.preventDefault()
        socket?.emit("text_message", {
            message: linkify(value),
            conversation_id: roomId,
            from: userData?._id,
            to: directChat.current_conversation.user_id,
            type: containsUrl(value) ? "Link" : "Text",
        });
        setValue("");
    }
    return (
        <div class="w-full">
            <div class="relative flex items-center p-3 border-b border-gray-300">
                <img
                    class="object-cover w-10 h-10 rounded-full"
                    src={directChat?.current_conversation?.img}
                    onError={(e) => {
                        e.target.src = "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg";
                    }}
                    alt="username"
                />
                <span class="block ml-2 font-bold text-gray-600">{directChat?.current_conversation?.name}</span>
                {directChat?.current_conversation?.online ? (
                    <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                ) : (
                    ""
                )}
            </div>
            <div ref={messageListRef} class="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul class="space-y-2">
                    {directChat?.current_messages.map((el, idx) => (
                        <li key={idx} class={"flex " + (el?.incoming ? "justify-start" : "justify-end")}>
                            <div
                                class={
                                    "relative max-w-xl px-4 py-2  rounded shadow " +
                                    (el?.incoming ? "bg-bg-card" : "text-gray-700 bg-gray-100")
                                }
                            >
                                <span class="block">{el?.message}</span>
                            </div>
                        </li>
                    ))}

                    {/* <li class="flex justify-end">
                        <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span class="block">Hiiii</span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                        <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span class="block">how are you?</span>
                        </div>
                    </li>
                    <li class="flex justify-start">
                        <div class="relative max-w-xl px-4 py-2 bg-bg-card rounded shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                        </div>
                    </li> */}
                </ul>
            </div>

            <div class="">
                <form className="flex items-center justify-between w-full p-3 border-t border-gray-300" onSubmit={handleSend} >
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                        </svg>
                    </button>

                    <input
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                        type="text"
                        placeholder="Write a message..."
                        class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none text-gray-700"
                        name="message"
                        required
                    />
                    <button
                        type="submit"
                    //     onClick={() => {
                    //         handleSend()
                    // }}
                    >
                        <svg
                            class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                    {/* <button type="submit">
                    <svg
                        class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button> */}
                </form>
            </div>
        </div>
    );
};

const ChatComponent = () => {
    const { directChat } = useContext(ChatContext);
    // const isMobile = useResponsive("between", "md", "xs", "sm");
    // const theme = useTheme();

    const messageListRef = useRef(null);

    // const { current_messages } = useSelector((state) => state.conversation.direct_chat);

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [directChat.current_messages]);

    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={false ? "100vw" : "auto"}>
            {/*  */}
            {/* <ChatHeader /> */}

                {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
                    <Conversation messageListRef={messageListRef}  isMobile={false} />
                {/* </SimpleBarStyle> */}

            {/*  */}
            {/* <ChatFooter /> */}
        </Stack>
    );
};

export default ChatComponent;
