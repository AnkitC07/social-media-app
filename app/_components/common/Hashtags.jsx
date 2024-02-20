import React from "react";

const Hashtags = ({ tag,count }) => {
    return (
        <div key={tag} className="flex flex-col gap-1 mb-3">
            <p className="font-bold">#{tag}</p>
            <p className="text-[#6a6a6a] text-sm">{count} Tweets</p>
        </div>
    );
};

export default Hashtags;
