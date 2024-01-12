import React from "react";
import Link from "next/link";
import { bottomMenu } from "../../../app/_constans";

const BottomMenu = () => {
    return (
        <>
            {bottomMenu.map((item, i) => {
                return (
                    <Link key={i} href={item.path} className="flex justify-start items-center gap-2 ">
                        {item.icon}
                    </Link>
                );
            })}
        </>
    );
};

export default BottomMenu;
