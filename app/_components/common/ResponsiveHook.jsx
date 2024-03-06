"use client";
// import { useMediaQuery } from "react-responsive";

// const ResponsiveHook = () => {
//     const isDesktop = useMediaQuery({ minWidth: 1025 });
//     const isLaptop = useMediaQuery({ maxWidth: 1024, minWidth: 992 });
//     const isTablet = useMediaQuery({ maxWidth: 991, minWidth: 767 });
//     const isMobile = useMediaQuery({ maxWidth: 768 });
//     return { isDesktop, isLaptop, isTablet, isMobile };
// };

// export default ResponsiveHook;

import { useState, useEffect } from "react";

const useResponsiveHook = () => {
    const [isDesktop, setIsDesktop] = useState(false); // Default for server
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const handleResize = () => {
        const width = window.innerWidth;
        setIsDesktop(width >= 1025);
        setIsLaptop(width >= 992 && width <= 1024);
        setIsTablet(width >= 768 && width <= 991);
        setIsMobile(width <= 767);
    };

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { isDesktop, isLaptop, isTablet, isMobile };
};

export default useResponsiveHook;
