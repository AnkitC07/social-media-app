"use client";
import { usePathname } from "next/navigation";
import { menu } from "../../_constans";
import React, { useState } from "react";
import Link from "next/link";

// import { menu } from "@/app/_constans";

const Menu = (
    {style=""}
) => {
    
    const pathname = usePathname();
    const [show,setShow] = useState(false)
    return (
        <>
            {menu.map((item,idx) => {
                return (
                    <Link
                        key={idx}
                        href={item.path}
                        className={
                            style +   "flex justify-start items-center gap-2" + (pathname == item.path ? " text-tweet-blue" : "")  + (item.path == '/messages' || item.path == '/notifications' ? " cursor-not-allowed ":'')
                        }
                        onClick={() => item.path === "#" && setShow(!show)}
                        
                    >
                        {item.icon}
                        <div className={"font-light text-lg" + (pathname == item.path ? " text-tweet-blue" : "")}>
                            {item.lable}
                            {show&&item?.comp}
                            {/* {idx === menu.length - 1 ?
                            <Modal width={"w-[100px] right-[-25px]  "}>
                            <ul className="text-[16px]">
                                <li className="border-b-[1px] border-gray-800 text-white hover:text-inherit">Setting</li>
                                <li className="text-white hover:text-inherit"><Logout/></li>
                            </ul>
                            </Modal>
                            :''} */}
                        </div>
                    </Link>
                );
            })}
        </>
    );``
};

export default Menu;
