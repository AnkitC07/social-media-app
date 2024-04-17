import React, { useEffect, useRef } from "react";
import { Stack, Box, Typography, Menu, MenuItem, IconButton, Divider } from "@mui/material";
import { formatTime } from "../../app/functions/getTIme";

const TextMsg = ({ el }) => {
    const estimatedTopSpanHeight = 20;
    const reff = useRef(null);
    useEffect(() => {}, [reff]);
    return (
        <li className={"flex " + (el?.incoming ? "justify-start" : "justify-end")}>
            <div
                style={{ width: "calc(90% - 85px)" }}
                className={
                    "relative max-w-md px-4 py-2  rounded shadow " +
                    (el?.incoming ? "bg-bg-card" : "text-gray-700 bg-gray-100") +
                    (el?.message?.length >= 48
                        ? " pb-5" // Add margin-top class conditionally
                        : "")
                }
            >
                <span ref={reff} className="inline-block  max-w-md text-pretty break-all">
                    {el?.message}
                </span>
                {/* <span className="inline-block absolute text-xs right-1 bottom-1">{formatTime(el?.date)}</span> */}
                <span className={`absolute text-xs right-1 bottom-1`}>
                    {formatTime(el?.date)}
                </span>
            </div>
        </li>
    );
};

export default TextMsg;
