import React from "react";
import AddTweet from "./AddTweet";
import Feed from "./Feed";
const MainContainer = () => {
    return (
        <div className="flex flex-col gap-4 w-full pb-[65px]">
            <AddTweet />
            <Feed />
        </div>
    );
};

export default MainContainer;
