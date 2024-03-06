"use client";
import { useEffect, useState } from "react";
import LeftSideProfile from "./LeftSideProfile";
import MainContainer from "./MainContainer";
import RightSideTrend from "./RightSideTrend";
import useResponsiveHook from "../common/ResponsiveHook";
import useGetDeviceWidth from "../common/getDeviceSize";

const PageWrapper = () => {
    const layouts = useResponsiveHook()
    if (layouts.isMobile || layouts.isLaptop || layouts.isTablet) {
        return (
            <>
                <div className="max-[660px]:px-4 w-full flex  gap-4">
                    <MainContainer window={'mobile'} style={"pb-[69px] md:pb-0 "} />
                    
                    {layouts.isLaptop && <div className="p-0">
                        <LeftSideProfile style={'lg:order-first lg:w-[23.3%]'} />
                        <RightSideTrend style={' lg:w-[23.45%] '} />
                    </div>}
                </div>
            </>
        )
    } else if(layouts.isDesktop){ 
        return (
            <>
                {/* <div className="max-[660px]:px-4 w-full flex flex-row gap-4"> */}
                    <div className="hidden min-[992px]:flex max-lg:flex-col w-full  gap-4">
                        <MainContainer window={'desktop'}  style={'hidden md:flex lg:!w-[51%] '} />
                        <LeftSideProfile style={'lg:order-first lg:w-[23.3%]'} />
                        <RightSideTrend style={' lg:w-[23.45%] '} />
                    </div>
                {/* </div> */}
            </>
        );
    }else{
        return(
            <>
            no type is defined
            </>
        )
    }
};

export default PageWrapper;
