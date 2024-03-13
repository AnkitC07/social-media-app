"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Card from "../common/Card";
import Profile from "../common/Profile";
import axios from "axios";
import { PostContext } from "../../_context/Post";

const LeftSideProfile = ({ style = "" }) => {
    const { userData,leftProfileData, setLeftProfileData } = useContext(PostContext);

    const getUserProfileData = async () => {
        try {
            const res = await axios.get("/api/users/profile/data");
            console.log("Left profile data: ",res.data)
            if (res?.data?.success) {
                setLeftProfileData(res.data.data)
                return
            }
        } catch (error) {
            console.log('something went wrong in left profile data', error)
        }
    };

    useEffect(() => {

        getUserProfileData()
    },[])

    return (
        <Card style={style}>
            <div className="  h-auto flex flex-col gap-8   ">
                {/* <div className="w-[250px] m-6 h-auto flex flex-col gap-8   "> */}
                <div className="flex flex-col gap-10 items-center text-center">
                    <div className="flex flex-col gap-4 items-center ">
                        <Link href="#">
                            <Profile src={leftProfileData.avatar} w={50} h={50} />
                        </Link>
                        {!leftProfileData?.username ? (
                            <div role="status" className="max-w-sm rounded shadow animate-pulse  dark:border-gray-700">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                                <div className="w-25 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold">{leftProfileData?.fullName}</p>
                                <p className="text-xs font-light">@{leftProfileData?.username}</p>
                            </div>
                        )}
                    </div>
                    <div className="font-light whitespace-pre-line">
                        {!leftProfileData?.username ? (
                            <div role="status" className="max-w-sm rounded shadow animate-pulse  dark:border-gray-700">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                                <div className="w-45 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        ) : leftProfileData?.bio ? (
                            leftProfileData.bio
                        ) : (
                            "'No Bio' \n Edit your bio in profile page"
                        )}
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Tweets</p>
                            <p className="font-semibold"> {leftProfileData?.tweetCount} </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Followers</p>
                            <p className="font-semibold">{leftProfileData?.followerCount}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Followings</p>
                            <p className="font-semibold">{leftProfileData?.followingCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LeftSideProfile;
