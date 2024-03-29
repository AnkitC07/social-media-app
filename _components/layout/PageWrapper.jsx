"use client";
import { useContext, useEffect, useState } from "react";
import LeftSideProfile from "./LeftSideProfile";
import MainContainer from "./MainContainer";
import RightSideTrend from "./RightSideTrend";
import useResponsiveHook from "../common/ResponsiveHook";
// import useGetDeviceWidth from "../common/getDeviceSize";
import { socket, connectSocket } from "../../helpers/socket";
import { PostContext } from "../../_context/Post";

const PageWrapper = () => {
    const layouts = useResponsiveHook();
    const { userData, isLoggedIn } = useContext(PostContext);
console.log('pagewrapper------_-----------------------------',isLoggedIn)
    useEffect(() => {
        if (isLoggedIn) {
            console.log(">>>>>>>>>>>>>",userData,socket);
            if (!socket && userData?._id) {
                console.log(">>>>>inside socket connection",)
                connectSocket(userData._id);
            }

            //   socket/.on("audio_call_notification", (data) => {
            //     // TODO => dispatch an action to add this in call_queue
            //     dispatch(PushToAudioCallQueue(data));
            //   });

            //   socket?.on("video_call_notification", (data) => {
            //     // TODO => dispatch an action to add this in call_queue
            //     dispatch(PushToVideoCallQueue(data));
            //   });

            //   socket?.on("new_message", (data) => {
            //     const message = data.message;
            //     console.log(current_conversation, data);
            //     // check if msg we got is from currently selected conversation
            //     if (current_conversation?.id === data.conversation_id) {
            //       dispatch(
            //         AddDirectMessage({
            //           id: message._id,
            //           type: "msg",
            //           subtype: message.type,
            //           message: message.text,
            //           incoming: message.to === user_id,
            //           outgoing: message.from === user_id,
            //         })
            //       );
            //     }
            //   });

            //   socket?.on("start_chat", (data) => {
            //     console.log(data);
            //     // add / update to conversation list
            //     const existing_conversation = conversations.find(
            //       (el) => el?.id === data._id
            //     );
            //     if (existing_conversation) {
            //       // update direct conversation
            //       dispatch(UpdateDirectConversation({ conversation: data }));
            //     } else {
            //       // add direct conversation
            //       dispatch(AddDirectConversation({ conversation: data }));
            //     }
            //     dispatch(SelectConversation({ room_id: data._id }));
            //   });

            socket?.on("new_friend_request", (data) => {
                console.log("i am the reciever >>> ", data);
            });

            //   socket?.on("request_accepted", (data) => {
            //     dispatch(
            //       showSnackbar({
            //         severity: "success",
            //         message: "Friend Request Accepted",
            //       })
            //     );
            //   });

            socket?.on("request_sent", (data) => {
                console.log("i am the sender >>> ", data);
            });
        }

        // Remove event listener on component unmount
        return () => {
            socket?.off("new_friend_request");
            //   socket?.off("request_accepted");
            socket?.off("request_sent");
            //   socket?.off("start_chat");
            //   socket?.off("new_message");
            //   socket?.off("audio_call_notification");
        };
    }, [userData, isLoggedIn, socket]);

    if (layouts.isMobile || layouts.isLaptop || layouts.isTablet) {
        return (
            <>
                <div className="max-[660px]:px-4 w-full flex  gap-4">
                    <MainContainer window={"mobile"} style={"pb-[69px] md:pb-0 "} />

                    {layouts.isLaptop && (
                        <div className="p-0">
                            <LeftSideProfile style={" lg:order-first min-[1025px]:w-[23.3%] p-4 mb-4 "} />
                            <RightSideTrend style={" min-[1025px]:w-[23.45%] "} />
                        </div>
                    )}
                </div>
            </>
        );
    } else if (layouts.isDesktop) {
        return (
            <>
                {/* <div className="max-[660px]:px-4 w-full flex flex-row gap-4"> */}
                <div className="hidden min-[992px]:flex max-lg:flex-col w-full  gap-4">
                    <MainContainer window={"desktop"} style={"hidden md:flex lg:!w-[51%] "} />
                    <LeftSideProfile style={"lg:order-first lg:w-[23.3%] sticky top-[112px] p-4 "} />
                    <RightSideTrend style={" lg:w-[23.45%] sticky top-[112px] "} />
                </div>
                {/* </div> */}
            </>
        );
    } else {
        return <></>;
    }
};

export default PageWrapper;
