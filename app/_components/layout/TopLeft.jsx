import React from "react";
import Image from "next/image";
import TwitterIcon from "@mui/icons-material/Twitter";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const TopLeft = () => {
    return (
        <div className="flex gap-4 justify-start items-center">
            {/* <TwitterIcon className="text-tweet-blue" sx={{ fontSize: "35px" }} /> */}
            <Image src={"/assets/z.jpeg"} width={90} height={80} alt="" />
        </div>
    );
};

export default TopLeft;
