"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [homePosts, setHomePosts] = useState([]);
    const [explorePosts, setExplorePosts] = useState([]);
    const [profile, setProfile] = useState({});
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [modalImage, setModalImage] = useState({
        url: "",
        open: false,
    });
    const [commentModal, setCommentModal] = useState({
        open: false,
        post: {},
    });
    const [comment, setComment] = useState({
        text: "",
    });

    const [trendingTags, setTrendingTags] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [showTrendingPost, setShowTrendingPost] = useState({
        open: false,
        tag:null
    })

    return (
        <PostContext.Provider
            value={{
                posts,setPosts,
                modalImage,setModalImage,
                commentModal,setCommentModal,
                comment,setComment,
                explorePosts, setExplorePosts,
                homePosts,setHomePosts,
                suggestedUsers, setSuggestedUsers,
                profile, setProfile,
                trendingTags, setTrendingTags,
                showTrendingPost, setShowTrendingPost,
                trendingPosts, setTrendingPosts,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
