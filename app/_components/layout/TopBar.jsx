"use client";
import React from "react";
import Menu from "./Menu";
import TopLeft from "./TopLeft";
// import TopRight from "./TopRight";
// import ResponsiveHook from "../common/ResponsiveHook";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { usePathname } from "next/navigation";

const TopBar = () => {
    const pathname = usePathname();
    const isPublicPath = pathname === "/login" || pathname === "/signup";

    // const { isMobile } = ResponsiveHook();
    return (
        <div className="flex justify-between gap-4 py-6 sticky top-0 bg-[#06141d8f] backdrop-blur-[2px] z-[1] max-[660px]:px-2 ">
            {!isPublicPath ? (
                <>
                    <TopLeft />
                    <div className="flex gap-8 items-center">
                        {/* {isMobile ? (
                            ) : (
                                // ""
                                )} */}
                                <TextsmsOutlinedIcon className="md:!hidden " sx={{ fontSize: "30px" }} />
                            <Menu style={'max-md:hidden '} />
                    </div>
                </>
            ) : (
                ""
            )}
            {/* <TopRight /> */}
        </div>
    );
};

export default TopBar;
