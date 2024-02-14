'use client'
import React, { useContext } from "react";
import Link from "next/link";
import Card from "../common/Card";
import Profile from "../common/Profile";
import { UserContext } from "../../_context/User";

const LeftSideProfile = ({ style = "" }) => {
    const { userData } = useContext(UserContext);
    console.log(userData)
    return (
        <Card style={style}>
            <div className=" m-6 h-auto flex flex-col gap-8   ">
            {/* <div className="w-[250px] m-6 h-auto flex flex-col gap-8   "> */}
                <div className="flex flex-col gap-10 items-center text-center">
                    <div className="flex flex-col gap-4 items-center ">
                        <Link href="#">
                            <Profile src={userData.avatar} w={50} h={50} />
                        </Link>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold">{userData?.fullName}</p>
                            <p className="text-xs font-light">@{userData?.username}</p>
                        </div>
                    </div>
                    <div className="font-light">{userData?.bio}</div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Tweets</p>
                            <p className="font-semibold"> {userData?.tweets?.length} </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Followers</p>
                            <p className="font-semibold">{userData?.followers?.length}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Followings</p>
                            <p className="font-semibold">{userData?.following?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LeftSideProfile;
