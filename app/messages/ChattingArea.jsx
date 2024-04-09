'use client'
import React, { useContext } from "react";
import NoChat from "./NoChat";
import { ChatContext } from "../../_context/Chat";
import ChatComponent from "./Conversation";

const ChattingArea = () => {
    const { chatType, RoomId } = useContext(ChatContext);

    return (
        <div class="hidden lg:col-span-2 lg:block">
            {chatType === "individual" && RoomId !== null ? (
              <ChatComponent />
            ) : (
                <div class="chat-container flex flex-col items-center justify-center h-[40rem] ">
                    <NoChat />

                    <p class="text-center mt-4">
                        Select a conversation or start a{" "}
                        <a href="/" class="text-primary underline hover:no-underline">
                            new one
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChattingArea;
