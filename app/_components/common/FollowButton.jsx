import React, { useState } from "react";
import followToggle from '../../functions/api/followToggle.js'


const FollowButton = ({ followeeId, textColor = "white", bgColor = "blue-400", size, isFollowed, setIsFollowed }) => {
    // const [isFollowing, setIsFollowing] = useState(isFollowed);
    console.log("followeeId", isFollowed)

    const handleFollowToggle = async () => {
        const action = isFollowed ? 'unfollow' : 'follow';
        const result = await followToggle(followeeId, action);

        if (!result.error) {
            // Update the UI state based on the follow/unfollow action
            setIsFollowed(!isFollowed);
        } else {
            // Handle the error (e.g., show an error message)
            console.error('Follow toggle error:', result.error);
        }
    };
    return (
        <button
            onClick={handleFollowToggle}
            className={`px-4 py-2 ${bgColor} ${textColor} ${size} ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full bg-white px-5 py-2 font-bold text-black  hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring`}
        >
             {isFollowed ? 'Following' : 'Follow'}
        </button>
    );
};

export default FollowButton;
