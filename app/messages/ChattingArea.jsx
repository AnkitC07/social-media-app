"use client";
import React, { useContext, useEffect } from "react";
import NoChat from "./NoChat";
import { ChatContext } from "../../_context/Chat";
import ChatComponent from "./Conversation";
import useResponsiveHook from "../../_components/common/ResponsiveHook";
import Link from "next/link";

const ChattingArea = ({chatOpen,setChatOpen}) => {
    const layouts = useResponsiveHook();
    const { chatType, roomId, setRoomId } = useContext(ChatContext);

    useEffect(() => {
        return () => {
            setRoomId(null);
        };
    }, []);

    return (
        <div className={"md:col-span-2 lg:block transition duration-300 ease-in-out " + (chatOpen?" max-md:translate-x-0":" max-md:translate-x-full")}>
            {chatType === "individual" && roomId !== null ? (
                <ChatComponent setChatOpen={setChatOpen} />
            ) : layouts.isMobile ? (
                ""
            ) : (
                <div className="h-full flex justify-center items-center">
                    <div className="chat-container flex flex-col items-center justify-center max-md:h-[calc(100vh - 312px)] ">
                        <NoChat />

                        <p className="text-center mt-4">
                            Select a conversation or start a{" "}
                            <Link href="/" className="text-primary underline hover:no-underline">
                                new one
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChattingArea;
