"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { bottomMenu } from "../../../app/_constans";

const BottomMenu = () => {
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
                        {item.icon}
                    </Link>
                );
            })}
        </>
    );
};

export default BottomMenu;
