// "use client";
import LeftSideProfile from "./LeftSideProfile";
import MainContainer from "./MainContainer";
import RightSideTrend from "./RightSideTrend";
// import ResponsiveHook from "../common/ResponsiveHook";

const PageWrapper = () => {
    // const { isDesktop, isLaptop } = ResponsiveHook();
    return (
        <>
            <div className="max-[660px]:px-4 w-full flex flex-row gap-4">
                {/* <MainContainer window={'mobile'} style={"lg:hidden pb-[69px] md:pb-0 "} /> */}
                <div className="hidden min-[992px]:flex max-lg:flex-col w-full  gap-4">
                    <MainContainer window={'desktop'}  style={'hidden lg:flex lg:!w-[51%] '} />
                    <LeftSideProfile style={'lg:order-first lg:w-[23.3%]'} />
                    <RightSideTrend style={' lg:w-[23.45%] '} />
                </div>
            </div>
        </>
    );
};

export default PageWrapper;
