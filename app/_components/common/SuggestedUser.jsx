import React from "react";
import Profile from "./Profile";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";

const SuggestedUser = ({ user }) => {
    const following = false;
    return (
        <div className="flex gap-2 justify-between items-center">
            {/* left side */}

            {/* <div className="flex gap-2 "> */}
            <Link href="#" className="md:flex-shrink flex-shrink-0 group block">
                <div className="flex gap-6 items-start">
                    <Image
                        className="inline-block rounded-sm"
                        src={"https://inc42.com/wp-content/uploads/2023/11/Elon-Musk-Web-760x570.jpg"}
                        width={50}
                        height={50}
                        alt=""
                    />
                    {/* <Profile
                        src={"https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"}
                        w={25}
                        h={25}
                    /> */}

                    <div className="">
                        <p className=" flex flex-wrap  items-baseline text-md leading-6 font-semibold text-white ">
                            <span className="mr-2">Elon Musk</span>
                            <span className="text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @elonmusk
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
            {/* right side */}
            <FollowButton
                handleClick={() => {}}
                size={"xs"}
                bgColor={following ? "white" : "blue-400"}
                textColor={following ? "black" : "white"}
                text={following ? "Unfollow" : "Follow"}
            />
            {/* </div> */}
        </div>
    );
};

export default SuggestedUser;
