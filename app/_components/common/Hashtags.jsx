import React from "react";

const Hashtags = ({ tags }) => {
    return (
        <>
            {tags.map((tag) => {
                return (
                    <div key={tag.tag} className="flex flex-col gap-1 mb-3">
                        <p className="font-bold">#{tag.tag}</p>
                        <p className="text-[#6a6a6a] text-sm">{tag.num}k Tweets</p>
                    </div>
                );
            })}
        </>
    );
};

export default Hashtags;
