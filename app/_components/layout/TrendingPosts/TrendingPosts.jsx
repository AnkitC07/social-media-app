"use client";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../_context/Post";
import axios from "axios";
import Feed from "../Feed";

const TrendingPosts = () => {
    const [loading, setLoading] = useState(false);
    const { showTrendingPost,setShowTrendingPost, trendingPosts, setTrendingPosts } = useContext(PostContext);

    useEffect(() => {
        const getTrendingPosts = () => {
            try {
              setLoading(true);
                axios
                    .get(`/api/tags/posts?tag=${showTrendingPost.tag}`)
                    .then((response) => {
                        console.log("TrendingPosts",response.data);
                        setTrendingPosts(response.data.posts.tweets);
                    })
                    .finally(() => setLoading(false));
            } catch (error) {}
        };
        getTrendingPosts();
        return () => {
          setShowTrendingPost({
              open: false,
              tag: null,
            });
        };
    }, []);

    return (
        <>
            <div>Trending Posts</div>
            {trendingPosts.map((post, idx) => (
                <Feed
                    key={idx}
                    i={idx}
                    window={"desktop-trending"}
                    post={post}
                    posts={trendingPosts}
                    setPosts={setTrendingPosts}
                />
            ))}
            <div>Explore Posts</div>
        </>
    );
};

export default TrendingPosts;
