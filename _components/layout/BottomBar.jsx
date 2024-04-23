"use client";
import React from "react";
import BottomMenu from "./BottomMenu";
import ResponsiveHook from "../common/ResponsiveHook";
import { usePathname } from "next/navigation";

const BottomBar = () => {
    const pathname = usePathname();
    const isPublicPath = pathname === "/login" || pathname === "/signup";
    const { isMobile } = ResponsiveHook();
    return (
        <>
            {!isPublicPath ? (
                pathname === "/messages" && isMobile ? (
                    ""
                ) : (
                    <div className="container mx-auto fixed bottom-0 left-0 right-0 border-t border-t-gray-800">
                        <div className="md:hidden bg-bg-purple max-[660px]:px-2 flex justify-between items-center gap-4 py-4 w-full">
                            <BottomMenu />
                        </div>
                    </div>
                )
            ) : (
                ""
            )}
        </>
    );
};

export default BottomBar;
