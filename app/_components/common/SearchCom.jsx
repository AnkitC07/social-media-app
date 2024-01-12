import React from "react";
import { Search } from "@mui/icons-material";

const SearchCom = () => {
    return (
        <div className="relative">
            <input type="text" placeholder={"Search Tweets"} className="bg-bg-card px-8 py-2 rounded-xl" />
            <Search className="absolute top-[10px] left-[5px]" sx={{ fontSize: "20px", color: "#03A9F4" }} />
        </div>
    );
};

export default SearchCom;
