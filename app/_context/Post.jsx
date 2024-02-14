'use client';
import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    const [posts,setPosts] = useState([])
    const [modalImage, setModalImage] = useState({
        url: '',
        open:false
    })
    const [commentModal, setCommentModal] = useState({
        open: false,
        post: {},
    })
    const [comment, setComment] = useState({
        text:''
    })
    

    return (
        <PostContext.Provider value={{ posts,setPosts, modalImage,setModalImage, commentModal, setCommentModal,comment, setComment }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider