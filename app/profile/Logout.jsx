"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios"
import { useEffect, useState } from "react";
const Logout = () => {
    const router = useRouter();
    const [isLogout,stateLogout] = useState(false)

    useEffect(()=>{
        if(isLogout){
            router.push("/");
        }
    },[isLogout])

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
                .then((data) => {
                    if (data?.data?.success) {
                        stateLogout(true)
                        toast.success("Logged Out Successfull");
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
