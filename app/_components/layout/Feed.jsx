import React, { useState } from "react";
import Card from "../common/Card";
import Link from "next/link";
import Image from "next/image";
import likeToggle from "../../functions/api/likeToggle.js";
import { like, comment, retweet, share, liked } from "../../../public/assets/svgs";

export const postImages = (post) => {
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    function isVideo(url) {
        return /\.(mp4|webm|ogv|mpg|mpeg)$/.test(url);
    }

    if (!post.images || !Array.isArray(post.images)) return;

    if (post.images.length > 0 && post.images) {
        return post.images.map((image, idx) => {
            return (
                <>
                    {/* <Image
                        src={image.url}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                    /> */}
                    <div className="slide flex-shrink-0 w-[26vw] h-[calc(22vw*1.5)] sm:w-[20vw] sm:h-[calc(20vw*1.5)] md:w-[13vw] md:h-[calc(10vw*1.5)] overflow-clip relative mx-2 snap-center rounded-3xl">
                        {isImage(image) && (
                            <img
                                src={image}
                                width={200}
                                height={"500px"}
                                className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                                alt={`Preview`}
                            />
                        )}
                        {isVideo(image) && (
                            <video
                                className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                                autoPlay
                                width={300}
                                height={240}
                                src={image}
                                alt={`Preview`}
                            />
                        )}
                    </div>
                </>
            );
        });
    } else {
        return <></>;
    }
};

const Feed = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLikeToggle = async () => {
        const action = isLiked ? "unlike" : "like";
        const result = await likeToggle(post._id, action);

        if (!result.error) {
            // Update the UI state based on the follow/unfollow action
            setIsLiked(!isLiked);
        } else {
            // Handle the error (e.g., show an error message)
            console.error("Follow toggle error:", result.error);
        }
    };

    console.log(post);
    return (
        <Card style=" w-full ">
            <div className="p-4 pb-0">
                <Link href={"/profile/" + post?.user?._id} className="md:flex-shrink flex-shrink-0 group block">
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
                <p className="text-base width-auto mr-2 font-normal text-white flex-shrink break-words">{post.text}</p>

                <div className="md:flex-shrink pr-6 pt-3">
                    {postImages(post)}

                    {/* <img
                        className="rounded-lg"
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                        alt="Woman paying for a purchase" */}
                    {/* /> */}
                </div>
                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center">
                            <div className="flex-1 text-center py-1 ">
                                {isLiked ? (
                                    <span onClick={handleLikeToggle} className="max-w-12 w-auto mt-1 group flex items-center text-red-600 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                        {liked}
                                    </span>
                                ) : (
                                    <span onClick={handleLikeToggle} className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                        {like}
                                    </span>
                                )}
                                {post?.likes?.length}
                            </div>
                            <div className="flex-1 text-center py-1 ">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {comment}
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 ">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {retweet}
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 ">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {share}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Feed;
