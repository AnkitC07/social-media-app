"use client";
import React, { useContext, useEffect, useState } from "react";
import AddTweet from "./AddTweet";
import toast from "react-hot-toast";
import Feed from "./Feed";
import axios from "axios";
import { PostContext } from "../../_context/Post";
const MainContainer = ({window, style = "" }) => {
    const { homePosts,setHomePosts } = useContext(PostContext);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (() => {
            try {
                const request = axios("/api/post/get");
                request
                    .then((res) => {
                        console.log("Post Data=>", res.data);
                        setHomePosts(res.data);
                    })
                    .finally(() => setLoading(false));
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        })();
    }, []);

    return (
        <div className={style + "show flex flex-col gap-4 w-full pb-[65px]"}>
            
                {/* <div className="group-[&amp;.show]:translate-y-0 bottom-0 fixed left-0 right-0 z-50 transition-transform translate-y-full duration-[400ms] flex flex-col items-center w-full sm:w-5/6 md:w-2/3 gap-4 sm:mx-auto rounded-t-[28px] min-h-[40%] max-h-[60%] bg-surface-100 dark:bg-surfacedark-100 shadow-xl">
                    <div className="flex justify-center p-4 w-full h-9">
                        <div className="w-8 h-1 opacity-40 bg-gray-500 rounded-full"></div>
                    </div>
                    <div className="relative px-4 text-center">
                        <p>insert content bottom sheets</p>
                        <p>insert content bottom sheets</p>
                    </div>
                </div> */}
            
            <AddTweet setPosts={setHomePosts} />
            {!loading && homePosts?.map((post, idx) => <Feed key={idx} i={idx} window={window} post={post} posts={homePosts} setPosts={setHomePosts} />)}
            {loading &&
                        [0, 1].map((_, idx) => (
                            <div key={idx} className="w-full ">
                                <div className="mx-auto max-w-lg">
                                    <div className="flex gap-1 items-center animate-pulse mb-2">
                                        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                                        <div className="h-4 w-20 rounded-md bg-gray-700"></div>
                                        <div className="h-4 w-10 rounded-md bg-gray-700"></div>
                                    </div>
                                    <div role="status" className="mb-7 animate-pulse">
                                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                        <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div role="status" className="mb-7 max-w-lg animate-pulse">
                                        <div className="flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
                                            <svg
                                                className="h-12 w-12 text-gray-200"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 640 512"
                                            >
                                                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
                                            </svg>
                                        </div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div role="status" className="my-6 animate-pulse">
                                        <div className="flex w-full justify-around">
                                            <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                            <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                            <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                            <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
        </div>
    );
};

export default MainContainer;
