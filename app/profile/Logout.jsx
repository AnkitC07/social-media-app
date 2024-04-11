"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios"
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { PostContext } from "../../_context/Post";
import { socket } from "../../helpers/socket";
const Logout = () => {
    const { setUserData,userData} = useContext(PostContext);
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
                .then((data) => {
                    if (data?.data?.success) {
                        window.localStorage.removeItem("token")
                        toast.success("Logged Out Successfull");
                        socket.emit("end",{user_id:userData?._id})
                        router.push("/login");
                        setUserData({})
                    } else {
                        throw new Error("Logout Failed")
                    }
                });
        } catch (error) {
            console.log("logout failed", error);
            toast.error("Logout Failed");
        }
    };

    return (
        <button
            type="button"
            onClick={logout}
            // className="ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap  rounded-full border border-blue-500 bg-transparent px-4 py-2 font-bold text-blue-500 hover:border-blue-800 hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring"
        >
            Logout
        </button>
    );
};

export default Logout;
