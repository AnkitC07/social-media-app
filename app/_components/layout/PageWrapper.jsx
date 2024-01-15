"use client";
import LeftSideProfile from "./LeftSideProfile";
import MainContainer from "./MainContainer";
import RightSideTrend from "./RightSideTrend";
import ResponsiveHook from "../common/ResponsiveHook";

const PageWrapper = () => {
    const { isDesktop, isLaptop } = ResponsiveHook();
    return (
        <>
            {isDesktop ? (
                <div className="flex flex-row gap-4">
                    <LeftSideProfile />
                    <MainContainer />
                    <RightSideTrend />
                </div>
            ) : isLaptop ? (
                <div className="flex flex-row gap-4">
                    <MainContainer />
                    <div className="flex flex-col gap-4">
                        <LeftSideProfile />
                        <RightSideTrend />
                    </div>
                </div>
            ) : (
                <>
                    <div className="max-[660px]:px-4">
                        <MainContainer />
                    </div>
                </>
            )}
        </>
    );
};

export default PageWrapper;
