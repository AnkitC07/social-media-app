import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";
import followToggle from "../../app/functions/api/followToggle";

import { PostContext } from "../../_context/Post";
import ProfileLink from "./ProfileLink";
import { socket } from "../../helpers/socket";

const SuggestedUser = ({ user, }) => {
    const { setUserData,userData,token } = useContext(PostContext);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollowToggle = async (toggle) => {
        // Update the UI state based on the follow/unfollow action
        setIsFollowed(toggle);
        console.log("handleFollowToggle=>", toggle);
        const action = toggle ? "follow" : "unfollow";
        const result = await followToggle(socket,userData?._id,user._id, action,token);

        if (!result.error) {
            if (toggle) {
                setUserData((state) => {
                    return {
                        ...state,
                        following: [...state.following, user._id],
                    };
                });
            } else {
                setUserData((state) => {
                    return {
                        ...state,
                        following: state.following.filter((followin) => followin !== user._id),
                    };
                });
            }
        } else {
            // Handle the error (e.g., show an error message)
            console.error("Follow toggle error:", result.error);
        }
    };
    return (
        <div className="flex gap-2 justify-between items-center">
            {/* left side */}

            {/* <div className="flex gap-2 "> */}
            <ProfileLink href={`/profile/${user._id}`} className="md:flex-shrink flex-shrink-0 group block text-nowrap overflow-hidden">
                <div className="suggested_user flex gap-4 items-start  ">
                    {/* <Image
                        className="inline-block rounded-sm"
                        src={"https://inc42.com/wp-content/uploads/2023/11/Elon-Musk-Web-760x570.jpg"}
                        width={50}
                        height={50}
                        alt=""
                    /> */}
                    <Profile src={user.avatar} w={50} h={50} />

                    <div className="">
                        <p className=" flex flex-wrap  items-baseline text-md leading-6 font-semibold text-white ">
                            <span className="mr-2">{user.fullName}</span>
                            <span className="text-xs break-all leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{user.username}
                            </span>
                        </p>
                    </div>
                </div>
            </ProfileLink>
            {/* right side */}
            <FollowButton
                handleFollowToggle={handleFollowToggle}
                size={"text-xs"}
                bgColor={isFollowed ? "!bg-tweet-blue" : "bg-white"}
                textColor={isFollowed ? "!text-white" : "text-balck"}
                isFollowed={isFollowed}
            />
            {/* </div> */}
        </div>
    );
};

export default SuggestedUser;
