import React from "react";

const SkeletonComment = ({ i }) => {
    return (
        <div key={i} className="flex flex-row items-center w-full py-4  h-full space-x-5 animate-pulse">
            <div className="w-11 h-9 bg-gray-800 rounded-full "></div>
            <div className="flex w-full flex-col space-y-2">
                <div className="h-3 bg-gray-800 rounded-md w-80"></div>
                <div className="w-48 h-3 bg-gray-800 rounded-md "></div>
            </div>
        </div>
    );
};

export default SkeletonComment;
