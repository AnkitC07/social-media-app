'use client';
import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    const [posts,setPosts] = useState([])
    

    return (
        <PostContext.Provider value={{ posts,setPosts }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider