"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddTweet from "./AddTweet";
import toast from "react-hot-toast";
import Feed from "./Feed";
import axios from "axios";
import { PostContext } from "../../_context/Post";
import InfiniteScroll from "../common/InfiniteScroll";
const MainContainer = ({ window: windoww, style = "" }) => {
    const { homePosts, setHomePosts, homePage, setHomePage } = useContext(PostContext);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(homePage);
    const loadMoreRef = useRef();
    // console.log("homepost", homePage);
    console.log("homePage", homePage);

    const getData = (index) => {
        try {
            // setLoading(true);
            console.log("hitting getdata", homePage);
            const request = axios("/api/post/get?page=" + index);
            request
                .then((res) => {
                    console.log("Post Data=>", homePage, res.data);
                    if (res.data.length == 0) {
                        setLoading(false);
                    } else {
                        setHomePosts((prev) => [...prev, ...res.data]);
                    }
                })
                .finally(() => {
                    // setLoading(false);
                });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        console.log("use", homePage);
        if (homePage !== page) {
            getData(homePage);
        }
    }, [homePage]);

    return (
        <InfiniteScroll setPage={setHomePage} loadMoreRef={loadMoreRef}>
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

                {homePosts?.map((post, idx) => (
                    <Feed key={idx} i={idx} window={windoww} post={post} posts={homePosts} setPosts={setHomePosts} />
                ))}

                {/* {loading &&
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
                ))} */}

                {loading && (
                    <div id="load-more" ref={loadMoreRef} role="status" className="text-center">
                        <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
        </InfiniteScroll>
    );
};

export default MainContainer;
