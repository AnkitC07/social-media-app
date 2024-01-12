import React from "react";
import BottomMenu from "./BottomMenu";

const BottomBar = () => {
    return (
        <div className="bg-bg-purple max-[660px]:px-2 sticky bottom-0 flex justify-between items-center gap-4 py-4 w-full">
            <BottomMenu />
        </div>
    );
};

export default BottomBar;
