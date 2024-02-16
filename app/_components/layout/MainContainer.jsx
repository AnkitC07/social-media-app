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
    // const [posts,setPosts] = useState([])
    console.log(window)

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
            
                {/* <div class="group-[&amp;.show]:translate-y-0 bottom-0 fixed left-0 right-0 z-50 transition-transform translate-y-full duration-[400ms] flex flex-col items-center w-full sm:w-5/6 md:w-2/3 gap-4 sm:mx-auto rounded-t-[28px] min-h-[40%] max-h-[60%] bg-surface-100 dark:bg-surfacedark-100 shadow-xl">
                    <div class="flex justify-center p-4 w-full h-9">
                        <div class="w-8 h-1 opacity-40 bg-gray-500 rounded-full"></div>
                    </div>
                    <div class="relative px-4 text-center">
                        <p>insert content bottom sheets</p>
                        <p>insert content bottom sheets</p>
                    </div>
                </div> */}
            
            <AddTweet setPosts={setHomePosts} />
            {!loading && homePosts?.map((post, idx) => <Feed key={idx} i={idx} window={window} post={post} />)}
        </div>
    );
};

export default MainContainer;
