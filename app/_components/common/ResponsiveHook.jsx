import { useMediaQuery } from "react-responsive";

const ResponsiveHook = () => {
    const isDesktop = useMediaQuery({ minWidth: 1025 });
    const isLaptop = useMediaQuery({ maxWidth: 1024, minWidth: 992 });
    const isTablet = useMediaQuery({ maxWidth: 991, minWidth: 767 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return { isDesktop, isLaptop, isTablet, isMobile };
};

export default ResponsiveHook;
