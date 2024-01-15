import React from "react";
import SearchCom from "../_components/common/SearchCom";
import RightSideTrend from "../_components/layout/RightSideTrend";
import Feed from "../_components/layout/Feed";
import SuggestedUsers from "../_components/layout/SuggestedUsers";

const Explore = () => {
    return (
        // <div className="container mx-auto flex flex-col gap-2">
        <div className="container mx-auto  gap-2">
            <div className="mx-auto">
                <SearchCom />
            </div>
            <div className="flex gap-2">
                <RightSideTrend />
                <div className="flex flex-col gap-2">
                    <Feed />
                    <Feed />
                    <Feed />
                </div>
                <SuggestedUsers />
            </div>
            <div></div>
        </div>
    );
};

export default Explore;
