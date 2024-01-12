import React from "react";
import Card from "../common/Card";
import Link from "next/link";
import { like, comment, retweet, share } from "../../../public/assets/svgs";

const Feed = () => {
    return (
        <Card>
            <div className="flex flex-shrink-0 p-4 pb-0">
                <Link href="#" className="flex-shrink-0 group block">
                    <div className="flex gap-4 items-start">
                        <div>
                            <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                            />
                        </div>
                        <div className="ml-2">
                            <p className="text-lg leading-6 font-semibold text-white">
                                Sonali Hirave
                                <span className=" ml-4 text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @ShonaDesign . 16 April
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="pl-20">
                <p className="text-base width-auto font-normal text-white flex-shrink">
                    Day 07 of the challenge <span className="text-blue-400">#100DaysOfCode</span> I was wondering what I
                    can do with <span className="text-blue-400">#tailwindcss</span>, so just started building Twitter UI
                    using Tailwind and so far it looks so promising. I will post my code after completion. [07/100]
                    <span className="text-blue-400"> #WomenWhoCode #CodeNewbie</span>
                </p>

                <div className="md:flex-shrink pr-6 pt-3">
                    <img
                        className="rounded-lg  h-64"
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                        alt="Woman paying for a purchase"
                    />
                </div>
                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center">
                            {[like, comment, retweet, share].map((svg, i) => (
                                <div key={i} className="flex-1 text-center py-2 m-2">
                                    <a
                                        href="#"
                                        className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                                    >
                                        {svg}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Feed;
