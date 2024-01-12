"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
function getWindowDimensions() {
    let width, height;
    if (typeof window !== "undefined") {
        const { innerWidth, innerHeight } = window;
        width = innerWidth;
        height = innerHeight;
    }
    const w = width > 1024 ? "L" : width <= 1024 && width > 786 ? "M" : width <= 786 && "S";
    return {
        w,
    };
}

export default useWindowDimensions;
