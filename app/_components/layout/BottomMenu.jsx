"use client";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import Link from "next/link";
import { bottomMenu } from "../../../app/_constans";
import Profile from "../common/Profile";
import { PostContext } from "../../_context/Post";

const BottomMenu = () => {
    const {userData} = useContext(PostContext)
    const pathname = usePathname();
    return (
        <>
            {bottomMenu.map((item, i) => {
                return (
                    <Link
                        key={i}
                        href={item.path}
                        className={
                            "flex justify-start items-center gap-2 " + (pathname == item.path ? " text-tweet-blue" : "")
                        }
                    >
                        {
                            item.path === '/profile' ?
                                <Profile src={userData.avatar} w={25} h={25} />
                                :
                                item.icon
                        }
                    </Link>
                );
            })}
        </>
    );
};

export default BottomMenu;
