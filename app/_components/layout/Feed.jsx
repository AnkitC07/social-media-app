import React, { useContext, useEffect, useState } from "react";
import Card from "../common/Card";
import Link from "next/link";
import Image from "next/image";
import likeToggle from "../../functions/api/likeToggle.js";
import { like, comment, retweet, share, liked } from "../../../public/assets/svgs";
import { UserContext } from "../../_context/User.jsx";
import ImageSlider from "../common/ImageSlider.jsx";
import LikeButton from "../common/LikeButton.jsx";
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

const Feed = ({ post, i, window, posts, setPosts }) => {
    const { userData, setUserData } = useContext(UserContext);
    const { setCommentModal } = useContext(PostContext);

    const [isLiked, setIsLiked] = useState(post?.likes?.includes(userData._id));

    const handleLikeToggle = async () => {
        const action = isLiked ? "unlike" : "like";

        const result = await likeToggle(post._id, action);
        if (!result.error) {
            setPosts(prevPosts => {
                const newPosts = [...prevPosts];
                newPosts[i].likes = result.likes;
                return newPosts;
              });

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
                            src={post?.user?.avatar}
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
                <p className="text-base width-auto mr-2 font-normal text-white flex-shrink break-words whitespace-pre-line">{post.text}</p>

                <div className="md:flex-shrink pr-6 pt-3">{postImages(post)}</div>

                <div className="flex">
                    <div className="w-full">
                        <div className="flex items-center py-4">
                            <div
                                onClick={() =>
                                    setCommentModal({
                                        open: true,
                                        post: post,
                                    })
                                }
                                className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-blue-400"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                    <g>
                                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                    </g>
                                </svg>

                                {post.replies.length}
                            </div>
                            <div className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-green-400">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                    <g>
                                        <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                                    </g>
                                </svg>
                                14 k
                            </div>
                            <LikeButton
                                i={`${post?._id}-${window}`}
                                isLiked={isLiked}
                                setIsLiked={setIsLiked}
                                handleLikeToggle={handleLikeToggle}
                            />
                            <div
                                onClick={handleLikeToggle}
                                className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-red-600"
                            >
                                {/* {!isLiked ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                            <g>
                                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                                            </g>
                                        </svg>
                                    </>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                                        <g>
                                            <path
                                                fill="#e02424"
                                                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225"
                                            ></path>
                                        </g>
                                    </svg>
                                )} */}
                                {post?.likes?.length}
                            </div>
                            <div className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-blue-400">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                    <g>
                                        <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                                        <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        {/* <div className="flex items-center">
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
                                    
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 relative">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {retweet}
                                </span>
                                <span className="absolute text-gray-600 top-[32%] right-[65%]">
                                    
                                </span>
                            </div>
                            <div className="flex-1 text-center py-1 relative">
                                <span className="max-w-12 w-auto mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    {share}
                                </span>
                                <span className="absolute text-gray-600 top-[32%] right-[65%]">
                                    
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Feed;
