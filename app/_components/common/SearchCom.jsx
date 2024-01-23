"use client";
import React, { useCallback, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import useOnClickOutside from "../../_hooks/useOnClickOutside.js";
import Hashtags from "./Hashtags.jsx";

const SearchCom = () => {
    const tags = [
        {
            tag: "Meloni",
            num: 205,
        },
        {
            tag: "BycottMaldives",
            num: 145,
        },
        {
            tag: "Oppenheimer",
            num: 45,
        },
        {
            tag: "Meloni",
            num: 205,
        },
        {
            tag: "BycottMaldives",
            num: 145,
        },
        {
            tag: "Oppenheimer",
            num: 45,
        },
        {
            tag: "Meloni",
            num: 205,
        },
        {
            tag: "BycottMaldives",
            num: 145,
        },
        {
            tag: "Oppenheimer",
            num: 45,
        },
        {
            tag: "Meloni",
            num: 205,
        },
        {
            tag: "BycottMaldives",
            num: 145,
        },
        {
            tag: "Oppenheimer",
            num: 45,
        },
    ];
    const [show, setShow] = useState(false);
    const modalRef = useRef(null);
    const openSearchModal = useCallback(() => {
        setShow(true);
    }, []);
    const handleClose = () => {
        setShow(false);
    };
    useOnClickOutside(modalRef, handleClose);
    return (
        <div ref={modalRef} className="relative min-[425px]:w-[35%] max-[425px]:mx-2 mx-auto">
            <input
                onClick={openSearchModal}
                type="text"
                placeholder={"Search Tweets"}
                className="bg-bg-card px-8 py-3 rounded-xl w-full"
            />
            <Search className="absolute top-[13px] left-[5px]" sx={{ fontSize: "22px", color: "#03A9F4" }} />
            {show && (
                <div className="absolute z-[-1] p-4 rounded-lg w-full overscroll-contain bg-bg-purple shadow-[0px_0px_15px_rgba(225,225,225,0.2),0px_0px_3px_1px_rgba(225,225,225,0.15)]">
                    <div
                        id="scroll-style"
                        className={
                            "flex items-center  min-h-16 max-h-96 overflow-y-auto " +
                            (tags ? "justify-start" : "justify-center")
                        }
                    >
                        <div className="">
                            {!tags ? (
                                <span className="font-medium text-gray-600">
                                    Try searching for people, lists, or keywords
                                </span>
                            ) : (
                                <Hashtags tags={tags} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchCom;
