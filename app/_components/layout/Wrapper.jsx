"use client";
import React from "react";
import LeftSideProfile from "./LeftSideProfile";
import RightSideTrend from "./RightSideTrend";
import MainContainer from "./MainContainer";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import ResponsiveHook from "../common/ResponsiveHook";
import useWindowDimensions from "../../_hooks/useWindowDimensions";

const Wrapper = ({ childs }) => {
    const { w } = useWindowDimensions();
    console.log(w);
    const { isDesktop, isLaptop, isTablet, isMobile } = ResponsiveHook();

    console.log("isDesktop", isDesktop, "isLaptop", isLaptop, "isTablet", isTablet, "isMobile", isMobile);

    return (
        <main className="wrapper container mx-auto">
            <TopBar />

            {/* Skeleton */}

            {/* <div class="max-w-lg mx-auto">
                {" "}
                <div role="status" class="my-7 animate-pulse">
                    {" "}
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
                    <span class="sr-only">Loading...</span>{" "}
                </div>
                <div role="status" class="max-w-lg mb-7 animate-pulse">
                    {" "}
                    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700">
                        {" "}
                        <svg
                            class="w-12 h-12 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                        >
                            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
                        </svg>{" "}
                    </div>
                    <span class="sr-only">Loading...</span>{" "}
                </div>
                <div role="status" class="my-6 animate-pulse">
                    {" "}
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
                    <span class="sr-only">Loading...</span>{" "}
                </div>
                <div role="status" class="my-6 animate-pulse">
                    {" "}
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
                    <span class="sr-only">Loading...</span>{" "}
                </div>
                <div role="status" class="mb-6 mt-7 animate-pulse">
                    {" "}
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
                    <span class="sr-only">Loading...</span>{" "}
                </div>
                <div role="status" class="my-6 animate-pulse">
                    {" "}
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
                    <span class="sr-only">Loading...</span>{" "}
                </div>
            </div> */}

            {isDesktop ? (
                <div className="flex flex-row gap-4">
                    <LeftSideProfile />
                    <MainContainer>{childs}</MainContainer>
                    <RightSideTrend />
                </div>
            ) : isLaptop ? (
                <div className="flex flex-row gap-4">
                    <MainContainer>{childs}</MainContainer>
                    <div className="flex flex-col gap-4">
                        <LeftSideProfile />
                        <RightSideTrend />
                    </div>
                </div>
            ) : (
                <>
                    <div className="max-[660px]:px-4">
                        <MainContainer>{childs}</MainContainer>
                    </div>
                </>
            )}
            {isMobile && <BottomBar />}
        </main>
    );
};

export default Wrapper;
