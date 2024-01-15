import React from "react";

const FollowButton = ({ handleClick, textColor, bgColor, size }) => {
    return <button onClick={handleClick} className={`px-4 py-2 bg-${bgColor} text-${textColor} text-${size}`}></button>;
};

export default FollowButton;
