import React, { useEffect } from "react";
import Profile from "./Profile";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";

const SuggestedUser = ({ user }) => {
    const following = false;
console.log(user)
    return (
        <div className="flex gap-2 justify-between items-center">
            {/* left side */}

            {/* <div className="flex gap-2 "> */}
            <Link href="#" className="md:flex-shrink flex-shrink-0 group block text-nowrap overflow-hidden">
                <div className="suggested_user flex gap-4 items-start  ">
                    {/* <Image
                        className="inline-block rounded-sm"
                        src={"https://inc42.com/wp-content/uploads/2023/11/Elon-Musk-Web-760x570.jpg"}
                        width={50}
                        height={50}
                        alt=""
                    /> */}
                    <Profile
                        src={user.avatar}
                        w={50}
                        h={50}
                    />

                    <div className="">
                        <p className=" flex flex-wrap  items-baseline text-md leading-6 font-semibold text-white ">
                            <span className="mr-2">{user.fullName}</span>
                            <span className="text-xs break-all leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{user.username}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
            {/* right side */}
            <FollowButton
                handleClick={() => {}}
                size={"text-xs"}
                bgColor={following ? "bg-tweet-blue" : "bg-white"}
                textColor={following ? "text-white" : "text-balck"}
                following={following}
            />
            {/* </div> */}
        </div>
    );
};

export default SuggestedUser;
