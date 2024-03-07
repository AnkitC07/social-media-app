import React from "react";
import Image from "next/image";
import Link from "next/link";
import TwitterIcon from "@mui/icons-material/Twitter";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const TopLeft = () => {
    return (
        <div className="flex gap-4 justify-start items-center">
            {/* <TwitterIcon className="text-tweet-blue" sx={{ fontSize: "35px" }} /> */}
            <Link href={'/'}>
                <Image src={"/assets/z.jpeg"} width={60} height={80} alt="" style={{ width: "auto", height: "auto" }} />
            </Link>
        </div>
    );
};

export default TopLeft;
