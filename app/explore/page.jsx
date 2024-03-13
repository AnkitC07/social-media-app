"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import SearchCom from "../../_components/common/SearchCom";
import RightSideTrend from "../../_components/layout/RightSideTrend";
import Feed from "../../_components/layout/Feed";
import axios from "axios";
import  toast from 'react-hot-toast'
import SuggestedUsers from "../../_components/layout/SuggestedUsers";
import TrendingPosts from "../../_components/layout/TrendingPosts/TrendingPosts.jsx";
import { PostContext } from "../../_context/Post";
import InfiniteScroll from "../../_components/common/InfiniteScroll";
import useResponsiveHook from "../../_components/common/ResponsiveHook";

const Explore = () => {
    const [loading, setLoading] = useState(true);
    const { isMobile } = useResponsiveHook();
    const [suggestLoading, setSuggestLoading] = useState(true);
    const {
        explorePosts,
        setExplorePosts,
        suggestedUsers,
        setSuggestedUsers,
        setShowTrendingPost,
        showTrendingPost,
        explorePage,
        setExplorePage,
    } = useContext(PostContext);
    const loadMoreRef = useRef();
    const [page, pageState] = useState(explorePage)
    const [apiLoading, apiLoadingstate] = useState(true)
    
    const getExlplorePots = async (index) => {
        apiLoadingstate(true)
        try {
            const request = await axios("/api/post/explore/get?page=" + index);
            const res = request.data
                    console.log("Explore Post Data=>", explorePage, res);
                    if (res.length == 0) {
                        setLoading(false);
                        // return index
                    } else {
                        setExplorePosts((prev) => [...prev, ...res]);
                        if (res.length < 5) {
                            setLoading(false);
                            // return index
                        } else {
                            // return index + 1
                        }
                    }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        apiLoadingstate(false)
    };


    useEffect(() => {
        console.log(explorePage, "explorePage");
        if (explorePage !== page) {
            getExlplorePots(explorePage);
        }
    }, [explorePage]);

    useEffect(() => {
        const getSuggestedUsers = () => {
            try {
                const request = axios("/api/users/suggested");
                request
                    .then((res) => {
                        console.log("Suggested Post Data=>", res.data);
                        setSuggestedUsers(res.data.suggestedUsers);
                    })
                    // .finally(() => setSuggestLoading(false));
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };
        if (suggestedUsers.length == 0) {
            getSuggestedUsers();
        }
        setSuggestLoading(false)
        return () => {
            console.log("TrendingPosts exit")
        setShowTrendingPost({
            open: false,
            tag: null,
        });
        };
    }, []);

    return (
        // <div className="container mx-auto flex flex-col gap-2">
        <div className="container mx-auto px-2 ">
            {!isMobile && <div className="w-full  -mt-5 sticky top-[83px] backdrop-blur-[2px] z-[1]">
                <SearchCom />
            </div>
            }
            <div className="flex gap-2 w-full pt-[30px]">
                {/* <div className="sticky top-[140px]">
                </div> */}
                <RightSideTrend style={"max-md:hidden sticky top-[140px] lg:w-[23.3%] md:!w-[30%]"} />

                <div className="flex flex-col items-center pb-[69px] md:pb-0 gap-2  w-full lg:!w-[51%] md:!w-[69%]">
                    {showTrendingPost.open && <TrendingPosts />}
                    <InfiniteScroll setPage={setExplorePage} loadMoreRef={loadMoreRef}>
                        {explorePosts.map((post, idx) => (
                            <Feed
                                key={idx}
                                i={idx}
                                window={"desktop"}
                                post={post}
                                posts={explorePosts}
                                setPosts={setExplorePosts}
                            />
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
                            <div id="#load-more-explore" ref={loadMoreRef} role="status" className="text-center">
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
                    </InfiniteScroll>
                </div>
                {/* <div className="sticky top-[140px]">
                </div> */}
                <SuggestedUsers
                    loading={suggestLoading}
                    suggestedUsers={suggestedUsers}
                    style={"max-lg:hidden sticky top-[140px] lg:w-[23.45%]"}
                />
            </div>
        </div>
    );
};

export default Explore;
