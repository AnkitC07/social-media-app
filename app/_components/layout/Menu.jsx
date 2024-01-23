"use client";
import { usePathname } from "next/navigation";
import { menu } from "../../_constans";
import React from "react";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// import { menu } from "@/app/_constans";

const Menu = (
    {style=""}
) => {
    const pathname = usePathname();
    return (
        <>
            {menu.map((item) => {
                return (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={
                            style +   "flex justify-start items-center gap-2" + (pathname == item.path ? " text-tweet-blue" : "")
                        }
                    >
                        {item.icon} <p className={"font-light text-lg" + (pathname == item.path ? " text-tweet-blue" : "")}>{item.lable}</p>
                    </Link>
                );
            })}
        </>
    );
};

export default Menu;
