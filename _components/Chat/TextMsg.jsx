import React from "react";
import {
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

const TextMsg = ({ el }) => {
    console.log('------------')

    return (
        
            <li key={idx} class={"flex " + (el?.incoming ? "justify-start" : "justify-end")}>
                <div
                    class={
                        "relative max-w-xl px-4 py-2  rounded shadow " +
                        (el?.incoming ? "bg-bg-card" : "text-gray-700 bg-gray-100")
                    }
                >
                    <span class="block">{el?.message}</span>
                </div>
            </li>
        
    );
};

export default TextMsg;
