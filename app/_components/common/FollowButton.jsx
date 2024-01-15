import React from "react";

const FollowButton = ({ handleClick, textColor, bgColor, size, text }) => {
    return (
        <button
            onClick={handleClick}
            className={`px-4 py-2 bg-${bgColor} text-${textColor} text-${size} font-semibold rounded-2xl`}
        >
            {text}
        </button>
    );
};

export default FollowButton;
