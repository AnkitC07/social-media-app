import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const TopLeft = () => {
    return (
        <div className="flex gap-4 justify-start items-center">
            <TwitterIcon className="text-tweet-blue" sx={{ fontSize: "35px" }} />
            {/* <div className="flex gap-1 text-[#03A9F4]">
                <HomeOutlinedIcon sx={{ color: "" }} />
                <p className="font-medium">Home</p>
            </div> */}
        </div>
    );
};

export default TopLeft;
