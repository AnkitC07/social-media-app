import React, { useContext, useState } from "react";
import Card from "../common/Card";
import Link from "next/link";
import Image from "next/image";
import likeToggle from "../../functions/api/likeToggle.js";
import { like, comment, retweet, share, liked } from "../../../public/assets/svgs";
import { UserContext } from "../../_context/User.jsx";
import ImageSlider from "../common/ImageSlider.jsx";
import { DarkModal } from "../common/Modal";
import { PostContext } from "../../_context/Post.jsx";

export const postImages = (post) => {
    // function isImage(url) {
    //     return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    // }
    // function isVideo(url) {
    //     return /\.(mp4|webm|ogv|mpg|mpeg)$/.test(url);
    // }
    if (!post.images || !Array.isArray(post.images)) return;
    if (post.images.length > 0 && post.images) {
        return <ImageSlider filesRef={post.images} isFeed={true} />;
    } else {
        return <></>;
    }
};

const Feed = ({ post }) => {
    const { userData } = useContext(UserContext);
    const { setCommentModal } = useContext(PostContext);
    const [isLiked, setIsLiked] = useState(post?.likes?.includes(userData._id));

    const handleLikeToggle = async () => {
        const action = isLiked ? "unlike" : "like";
        const result = await likeToggle(post._id, action);
        if (!result.error) {
            setIsLiked(!isLiked);
        } else {
            console.error("Follow toggle error:", result.error);
        }
    };

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

                <div className="md:flex-shrink pr-6 pt-3">{postImages(post)}</div>

                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center">
                            <div className="flex-1 text-center py-1 relative">
                                {isLiked ? (
                                    <span
                                        onClick={handleLikeToggle}
                                        className="max-w-12 w-auto mt-1 group flex items-center text-red-600 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                                    >
                                        {liked}
                                    </span>
                                ) : (
                                    <span
                                        onClick={handleLikeToggle}
                                        className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                                    >
                                        {like}
                                    </span>
                                )}
                                <span className="absolute text-[#6a6a6a] text-sm top-[37%] right-[66%] ">
                                    {post?.likes?.length}
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 relative">
                                <span
                                    onClick={() =>
                                        setCommentModal({
                                            open: true,
                                            post: post,
                                        })
                                    }
                                    className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                                >
                                    {comment}
                                </span>
                                <span className="absolute text-gray-600 top-[32%] right-[65%]">
                                    {/* {post?.likes?.length} */}
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 relative">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {retweet}
                                </span>
                                <span className="absolute text-gray-600 top-[32%] right-[65%]">
                                    {/* {post?.likes?.length} */}
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 relative">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {share}
                                </span>
                                <span className="absolute text-gray-600 top-[32%] right-[65%]">
                                    {/* {post?.likes?.length} */}
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
