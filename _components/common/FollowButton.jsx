import React, { useState } from "react";
import followToggle from "../../app/functions/api/followToggle.js";
import {socket} from '../../app/layout.jsx'

const FollowButton = ({ textColor = "white", bgColor = "blue-400", size, isFollowed, handleFollowToggle }) => {
    console.log("FollowButton",isFollowed)
    return (
        <button
            onClick={() =>
                
                handleFollowToggle(!isFollowed)}
            className={`px-4 py-2 ${bgColor} ${textColor} ${size} ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full bg-white px-5 py-2 font-bold text-black  hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring`}
        >
            {isFollowed ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;
