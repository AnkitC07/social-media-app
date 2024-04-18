import React, { useContext } from "react";
import Link from "next/link";
import { PostContext } from "../../_context/Post";

const Hashtags = ({ tag, count }) => {
    const {setShowTrendingPost} = useContext(PostContext)
    return (
        <Link
            href={"/explore"}
            onClick={()=>setShowTrendingPost({
                open: true,
                tag: tag,
            })}
            key={tag}
            className="flex flex-col gap-1 mb-3"
            
        >
            <p className="font-bold hover:text-tweet-blue">#{tag}</p>
            <p className="text-[#6a6a6a] text-sm">{count} Tweets</p>
        </Link>
    );
};

export default Hashtags;
