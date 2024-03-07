"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {


    const [homePage,setHomePage] = useState(0)
    const [explorePage,setExplorePage] = useState(0)
    const [profilePage,setProfilePage] = useState(0)

    const [leftProfileData, setLeftProfileData] = useState({});



    const [userData, setUserData] = useState({})
    const [profile, setProfile] = useState({
        tweets:[]
    });
    
    useEffect(() => {
        // Validate if the data id present in the state.
        if (!userData?._id) {
            (async() => {
                try {
                    console.log('useEffect userData')
                    await axios.get('/api/users/profile?id=user').then(res => {
                        setUserData(res.data.data)
                    })
                } catch (error) {
                    console.log('Error while fetching user data', error)
                }
            })()
        }
    },[])


    console.log("Homeposts",userData)
    const [posts, setPosts] = useState([]);
    const [homePosts, setHomePosts] = useState([]);
    const [explorePosts, setExplorePosts] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [modalImage, setModalImage] = useState({
        url: "",
        open: false,
    });
    const [commentModal, setCommentModal] = useState({
        open: false,
        post: {},
        callback: () => {}
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
                userData, setUserData,
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
                homePage, setHomePage,
                explorePage, setExplorePage,
                profilePage, setProfilePage,
                leftProfileData, setLeftProfileData
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
