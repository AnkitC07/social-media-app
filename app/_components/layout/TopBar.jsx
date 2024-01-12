// "use client";
import React from "react";
import Menu from "./Menu";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import ResponsiveHook from "../common/ResponsiveHook";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

const TopBar = () => {
    const { isMobile } = ResponsiveHook();
    return (
        <div className="flex justify-between gap-4 my-6 max-[660px]:px-2 ">
            <TopLeft />
            <div className="flex gap-8 items-center">
                {isMobile ? <TextsmsOutlinedIcon sx={{ fontSize: "30px" }} /> : <Menu />}
            </div>
            {/* <TopRight /> */}
        </div>
    );
};

export default TopBar;
