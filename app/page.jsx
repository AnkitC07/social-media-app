"use client";
import LeftSideProfile from "./_components/layout/LeftSideProfile";
import MainContainer from "./_components/layout/MainContainer";
import RightSideTrend from "./_components/layout/RightSideTrend";
import ResponsiveHook from "./_components/common/ResponsiveHook";
export default function Home() {
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
}
