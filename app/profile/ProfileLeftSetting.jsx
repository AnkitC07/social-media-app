"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";

const ProfileLeftSetting = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
                .then((data) => {
                    if (data?.data?.success) {
                        toast.success("Logout Successfull");
                        router.push("/");
                    } else {
                        throw new Error("Logout Failed")
                    }
                });
        } catch (error) {
            console.log("logout failed", error.message);
            toast.error("Logout Failed");
        }
    };

    return (
        <div className="h-[90vh] w-64 px-5 py-2 flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center gap-5">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>
            <button
                onClick={logout}
                className="ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap  rounded-full border border-blue-500 bg-transparent px-4 py-2 font-bold text-blue-500 hover:border-blue-800 hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileLeftSetting;
