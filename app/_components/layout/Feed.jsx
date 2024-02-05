import React from "react";
import Card from "../common/Card";
import Link from "next/link";
import Image from "next/image";
import { like, comment, retweet, share } from "../../../public/assets/svgs";

const Feed = ({ post }) => {
    console.log(post);
    const postImages = () => {
        if (post.images.length>0 && post.images) {
            return post.images.map((image, idx) => {
                return (
                    <>
                        {/* <Image
                            src={image.url}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                        /> */}
                        <img key={idx} className="rounded-lg" src={image} alt="Post image" />
                    </>
                );
            });
        } else {
            return <></>;
        }
    };
    return (
        <Card style=" w-full ">
            <div className="p-4 pb-0">
                <Link href="#" className="md:flex-shrink flex-shrink-0 group block">
                    <div className="flex gap-6 items-start">
                        <Image
                            className="inline-block rounded-full"
                            src={"https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"}
                            width={40}
                            height={40}
                            alt=""
                        />

                        <div className="">
                            <p className=" flex flex-wrap  items-baseline text-lg leading-6 font-semibold text-white mb-3">
                                <span className="mr-2">{post.user.username}</span>
                                <span className="text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @{post.user.username} . 16 April
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="pl-20">
                <p className="text-base width-auto mr-2 font-normal text-white flex-shrink break-words">
                    {post.text}
                    {/* Day 07 of the challenge <span className="text-blue-400">#100DaysOfCode</span> I was wondering what I
                    can do with <span className="text-blue-400">#tailwindcss</span>, so just started building Twitter UI
                    using Tailwind and so far it looks so promising. I will post my code after completion. [07/100]
                    <span className="text-blue-400"> #WomenWhoCode #CodeNewbie</span> */}
                </p>

                <div className="md:flex-shrink pr-6 pt-3">
                    {postImages()}
                    {/* <img
                        className="rounded-lg"
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                        alt="Woman paying for a purchase" */}
                    {/* /> */}
                </div>
                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center">
                            {[like, comment, retweet, share].map((svg, i) => (
                                <div key={i} className="flex-1 text-center py-1 ">
                                    <a
                                        href="#"
                                        className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
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
