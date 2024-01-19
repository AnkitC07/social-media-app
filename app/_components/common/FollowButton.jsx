import React from "react";

const FollowButton = ({ handleClick, textColor = "white", bgColor = "blue-400", size, text }) => {
    return (
        <button
            onClick={handleClick}
            className={`px-4 py-2 ${bgColor} ${textColor} ${size} font-semibold rounded-2xl`}
        >
            {text}
        </button>
    );
};

export default FollowButton;
