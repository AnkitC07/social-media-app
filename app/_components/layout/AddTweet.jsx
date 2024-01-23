"use client";
import React from "react";
import Card from "../common/Card";
import Profile from "../common/Profile";
import CropOriginalRoundedIcon from "@mui/icons-material/CropOriginalRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";

const AddTweet = () => {
    function auto_grow(element) {
        console.log(element);
        element.target.style.height = "5px";
        element.target.style.height = element.target.scrollHeight + "px";
    }

    return (
        <Card>
            <div className="flex gap-2 p-4">
                <div>
                    <Profile src={"/assets/User.jpeg"} w={50} h={50} />
                </div>
                <div className="bg-bg-card  w-full">
                    <div className="p-5 bg-[#28343E] rounded-2xl">
                        <textarea
                            // cols="30"
                            onInput={auto_grow}
                            placeholder="What's on your mind? "
                            className="border-0 w-full resize-none bg-[#28343E] focus-visible:outline-none"
                        />
                        <div className="flex justify-between flex-wrap gap-2 max-[319px]:justify-end">
                            <div className="flex gap-2 text-[#03A9F4]">
                                <CropOriginalRoundedIcon
                                    sx={{ filter: "drop-shadow(0px 0px 3px rgb(47 223 154 / 0.5))" }}
                                    className="text-[#2FDF9A]"
                                />
                                <PlayCircleOutlineRoundedIcon
                                    sx={{
                                        filter: "drop-shadow(0px 0px 3px rgb(0 168 240 / 0.5))",
                                    }}
                                    className="text-[#03A9F4]"
                                />
                                <RoomRoundedIcon
                                    sx={{
                                        filter: "drop-shadow(0px 0px 3px rgb(251 110 110 / 0.5))",
                                    }}
                                    className="text-[#FB6E6E]"
                                />
                            </div>
                            <button className="py-1 px-4 bg-[#03A9F4] text-sm rounded-2xl">Tweet</button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AddTweet;
