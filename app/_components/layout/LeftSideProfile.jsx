import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "../common/Card";
import Profile from "../common/Profile";

const LeftSideProfile = () => {
    return (
        <Card>
            <div className="w-[250px] m-6 h-auto flex flex-col gap-8   ">
                <div className="flex flex-col gap-10 items-center text-center">
                    <div className="flex flex-col gap-4 items-center ">
                        <Link href="#">
                            <Profile src={"/assets/User.jpeg"} w={50} h={50} />
                            {/* <Image src="" alt="Profle Photo" width={50} height={50} className="rounded-full" /> */}
                        </Link>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold">User Name</p>
                            <p className="text-xs font-light">@user.name</p>
                        </div>
                    </div>
                    <div className="font-light">UI/UX Designer and Web Developer from India</div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Tweets</p>
                            <p className="font-semibold">19</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Followers</p>
                            <p className="font-semibold">409</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-extralight">Followings</p>
                            <p className="font-semibold">208</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LeftSideProfile;
