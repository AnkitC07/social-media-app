'use client'
import React, { useEffect, useState } from "react";
import AddTweet from "./AddTweet";
import toast from "react-hot-toast";
import Feed from "./Feed";
import axios from "axios";
const MainContainer = ({ style = "" }) => {
    const [loading, setLoading] = useState(true);
    const [posts,setPosts] = useState([])
    
    useEffect(() => {
        (() => {
            try {
                const request = axios('/api/post/get');
                request.then((res) => {
                    console.log('Post Data=>', res.data);
                    setPosts(res.data)
                }).finally(()=>setLoading(false))
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        })()
    },[ ])


    return (
        <div className={style + "flex flex-col gap-4 w-full pb-[65px]"}>
            <AddTweet />
            {!loading && posts.map((post, idx) => <Feed key={idx} post={post} />)}
        </div>
    );
};

export default MainContainer;
