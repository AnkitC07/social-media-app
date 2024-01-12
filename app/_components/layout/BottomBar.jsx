import React from "react";
import BottomMenu from "./BottomMenu";
import ResponsiveHook from "../common/ResponsiveHook";

const BottomBar = () => {
    const { isMobile } = ResponsiveHook();
    return (
        <>
            {isMobile && (
                <div className=" bg-bg-purple max-[660px]:px-2 fixed bottom-0 left-0 right-0 flex justify-between items-center gap-4 py-4 w-full">
                    <BottomMenu />
                </div>
            )}
        </>
    );
};

export default BottomBar;
