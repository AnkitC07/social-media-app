import React from "react";
import AddTweet from "./AddTweet";
import Feed from "./Feed";
const MainContainer = ({ children }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <AddTweet />
            <Feed />
        </div>
    );
};

export default MainContainer;
