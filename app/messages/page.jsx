'use client'
import ChattingArea from "./ChattingArea.jsx";
import ChatList from "./ChatList.jsx";
import { useEffect, useState } from "react";

const MessagesPage = () => {

    const [open, setOpen] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    useEffect(() => {
        setOpen(true);
        // return () => {
        //     setOpen(false);
        // }
    },[])

    return (
        <>
            <div className={"chat_area container mx-auto pb-[65px]   max-md:fixed md:pb-0 md:h-[calc(60vh+137px)] transition duration-300 ease-in-out " + (open?" max-md:translate-x-0":" max-md:translate-x-full")}>
                <div className="min-w-full h-full md:border rounded md:grid md:grid-cols-3 ">

                    <ChatList setOpen={setOpen} setChatOpen={setChatOpen} />

                    <ChattingArea chatOpen={chatOpen} setChatOpen={setChatOpen}  />
                </div>
            </div>
        </>
    );
};

export default MessagesPage;
