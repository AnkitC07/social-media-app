import React from "react";
import Profile from "./Profile";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";

const SuggestedUser = ({ user }) => {
    const following = true;
    return (
        <div className="flex gap-2 justify-between items-center">
            {/* left side */}

            <div className="flex gap-2 ">
                <Link href="#" className="md:flex-shrink flex-shrink-0 group block">
                    <div className="flex gap-6 items-start">
                        {/* <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                            alt=""
                        /> */}
                        {/* <Image
                            className="inline-block rounded-full"
                            src={"https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"}
                            width={40}
                            height={40}
                            alt=""
                        /> */}
                        <Profile src={""} w={25} h={25} />

                        <div className="">
                            <p className=" flex flex-wrap  items-baseline text-lg leading-6 font-semibold text-white mb-3">
                                <span className="mr-2">Elon Musk</span>
                                <span className="text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @elonmusk . 16 April
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
                <FollowButton
                    handleClick={() => {}}
                    size={"sm"}
                    bgColor={following ? "white" : "blue-400"}
                    textColor={following ? "black" : "white"}
                />
            </div>
        </div>
    );
};

export default SuggestedUser;
