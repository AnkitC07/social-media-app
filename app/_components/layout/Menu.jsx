"use client";
import { usePathname } from "next/navigation";
import { menu } from "../../_constans";
import React from "react";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// import { menu } from "@/app/_constans";

const Menu = () => {
    const pathname = usePathname();
    return (
        <>
            {/* <div className={"flex gap-1 items-center" + (pathname == "/" ? " text-tweet-blue" : "")}>
                <HomeOutlinedIcon />
                <p className="font-medium flex ">Home</p>
            </div> */}
            {menu.map((item) => {
                return (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={
                            "flex justify-start items-center gap-2" + (pathname == item.path ? " text-tweet-blue" : "")
                        }
                    >
                        {item.icon} <p className="font-light text-lg">{item.lable}</p>
                    </Link>
                );
            })}
        </>
    );
};

export default Menu;
