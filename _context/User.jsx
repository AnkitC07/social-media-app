'use client';
import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

// console.log('user context')
    // useEffect(() => {
    //     // Validate if the data id present in the state.
    //     if (!userData?._id) {
    //         (async() => {
    //             try {
    //                 await axios.get('/api/users/profile?id=user').then(res => {
    //                     console.log(res.data.data)
                       
    //                 })
    //             } catch (error) {
    //                 console.log('Error while fetching user data', error)
    //             }
    //         })()
    //     }
    // },[])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider