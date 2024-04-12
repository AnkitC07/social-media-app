"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../_context/Chat";
import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";
import { socket } from "../../helpers/socket";
import { PostContext } from "../../_context/Post";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import TextMsg from "../../_components/Chat/TextMsg";
import { Timeline, MediaMsg, LinkMsg, DocMsg, ReplyMsg } from "../../_components/Chat/ConvoTypes";
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User, ArrowLeft } from "phosphor-react";
import ImageSlider from "../../_components/common/ImageSlider";
import useResponsiveHook from "../../_components/common/ResponsiveHook";

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}

function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

export const Conversation = ({ messageListRef }) => {
    const layouts = useResponsiveHook();
    const { roomId, setRoomId, directChat, setDirectChat, fetchCurrentMessages } = useContext(ChatContext);
    const { userData } = useContext(PostContext);

    const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState("");
    const [openActions, setOpenActions] = useState(false);

    const [filesRef, setFileRef] = useState([]);
    const [fileType, setFileType] = useState(null);
    const inputFileRef = useRef(null);

    const inputRef = useRef(null);

    function handleEmojiClick(emoji) {
        const input = inputRef.current;

        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;

            setValue(value.substring(0, selectionStart) + emoji + value.substring(selectionEnd));

            // Move the cursor to the end of the inserted emoji
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    }

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

    function getExtension(filename) {
        return filename.split(".").pop();
    }

    const handleSend = (e) => {
        e.preventDefault();
        if (filesRef.length == 0) {
            socket?.emit("text_message", {
                message: linkify(value),
                conversation_id: roomId,
                from: userData?._id,
                to: directChat.current_conversation.user_id,
                type: containsUrl(value) ? "Link" : "Text",
            });
        } else {
            console.log(filesRef);
            socket.emit(
                "file_message",
                {
                    message: linkify(value),
                    conversation_id: roomId,
                    from: userData?._id,
                    to: directChat.current_conversation.user_id,
                    type: fileType,
                    file:filesRef
                },
                (status) => {
                    console.log(status);
                }
            );
        }
        setFileRef([]);
        setValue("");
    };
    return (
        <div className="w-full">
            <div className=" flex items-center  border-b border-gray-300 bg-bg-card">
                {layouts.isMobile && <ArrowLeft size={24} className="mx-2" onClick={() => setRoomId(null)} />}
                <div className="relative flex items-center p-3 ">
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={directChat?.current_conversation?.img}
                        onError={(e) => {
                            e.target.src = "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg";
                        }}
                        alt="username"
                    />
                    <span className="block ml-2 font-bold ">{directChat?.current_conversation?.name}</span>
                    {directChat?.current_conversation?.online ? (
                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div ref={messageListRef} className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                    {/* <Timeline /> */}
                    {directChat?.current_messages.map((el, idx) => {
                        const menu = true;
                        switch (el.type) {
                            case "divider":
                                return (
                                    // Timeline
                                    <Timeline key={idx} el={el} />
                                );

                            case "msg":
                                switch (el.subtype) {
                                    case "img":
                                        return (
                                            // Media Message
                                            <MediaMsg key={idx} el={el} menu={menu} />
                                        );

                                    case "doc":
                                        return (
                                            // Doc Message
                                            <DocMsg key={idx} el={el} menu={menu} />
                                        );
                                    case "Link":
                                        return (
                                            //  Link Message
                                            <LinkMsg key={idx} el={el} menu={menu} />
                                        );

                                    case "reply":
                                        return (
                                            //  ReplyMessage
                                            <ReplyMsg key={idx} el={el} menu={menu} />
                                        );

                                    default:
                                        return (
                                            // Text Message
                                            <TextMsg key={idx} el={el} menu={menu} />
                                        );
                                }

                            default:
                                return <></>;
                        }
                    })}

                    {/* Moved to TextMsg component */}
                    {/* {directChat?.current_messages.map((el, idx) => (
                        <li key={idx} className={"flex " + (el?.incoming ? "justify-start" : "justify-end")}>
                            <div
                                className={
                                    "relative max-w-xl px-4 py-2  rounded shadow " +
                                    (el?.incoming ? "bg-bg-card" : "text-gray-700 bg-gray-100")
                                }
                            >
                                <span className="block">{el?.message}</span>
                            </div>
                        </li>
                    ))} */}
                </ul>
            </div>

            <div className="border-t border-gray-300">
                <ImageSlider filesRef={filesRef} setFileRef={setFileRef} isFeed={false} />
                <form className="flex items-center justify-between w-full p-3 " onSubmit={handleSend}>
                    <Box
                        style={{
                            zIndex: 10,
                            position: "fixed",
                            display: openPicker ? "inline" : "none",
                            bottom: 155,
                            // right: isMobile ? 20 : sideBar.open ? 420 : 100,
                        }}
                    >
                        <Picker
                            // theme={theme.palette.mode}
                            data={data}
                            onEmojiSelect={(emoji) => {
                                console.log(emoji);
                                handleEmojiClick(emoji.native);
                            }}
                        />
                    </Box>
                    <button onClick={() => setOpenPicker(!openPicker)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-white"
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
                    {/* <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-white"
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
                    </button> */}
                    {/* Image/Video */}
                    <input
                        disabled={filesRef?.length >= 4}
                        accept="image/*"
                        ref={inputFileRef}
                        multiple
                        onChange={(e) => {
                            console.log("first");
                            if (filesRef.length <= 4) {
                                setFileRef([...filesRef, ...e.target.files]);
                            }
                            setFileType("img");
                        }}
                        type="file"
                        name="image"
                        id="uploadImage"
                        className="hidden"
                    />
                    <Stack
                        sx={{
                            position: "relative",
                            display: openActions ? "inline-block" : "none",
                        }}
                    >
                        {Actions.map((el,idx) => (
                            <Tooltip key={idx} placement="right" title={el.title}>
                                <Fab
                                    onClick={() => {
                                        setOpenActions(!openActions);
                                        if (el?.title === "Photo/Video") {
                                            inputFileRef.current.click();
                                        }
                                    }}
                                    sx={{
                                        position: "absolute",
                                        top: -el.y,
                                        backgroundColor: el.color,
                                        border: "1px solid #ffffff42",
                                        color: "white",
                                    }}
                                    className="hover:text-black "
                                    aria-label="add"
                                >
                                    {el.icon}
                                </Fab>
                            </Tooltip>
                        ))}
                    </Stack>

                    <InputAdornment>
                        <IconButton
                            onClick={() => {
                                setOpenActions(!openActions);
                            }}
                        >
                            <LinkSimple className="text-white" />
                        </IconButton>
                    </InputAdornment>
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                        type="text"
                        placeholder="Write a message..."
                        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none text-gray-700"
                        name="message"
                    />

                    {/* <button
                        type="submit"
                        //     onClick={() => {
                        //         handleSend()
                        // }}
                    >
                        <svg
                            className="w-5 h-5 text-white origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button> */}
                    <Box
                        sx={{
                            height: 45,
                            width: 45,
                            backgroundColor: "white",
                            borderRadius: 1.5,
                        }}
                    >
                        <Stack sx={{ height: "100%", fontSize: "20px" }} alignItems={"center"} justifyContent="center">
                            <button type="submit">
                                <PaperPlaneTilt className="text-tweet-blue" />
                            </button>
                        </Stack>
                    </Box>
                    {/* <button type="submit">
                    <svg
                        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
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
            <Conversation messageListRef={messageListRef} isMobile={false} />
            {/* </SimpleBarStyle> */}

            {/*  */}
            {/* <ChatFooter /> */}
        </Stack>
    );
};

export default ChatComponent;
