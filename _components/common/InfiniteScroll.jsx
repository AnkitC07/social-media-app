import React, { useContext, useEffect } from "react";
import { PostContext } from "../../_context/Post";

const InfiniteScroll = ({ loadMoreRef, setPage, children, }) => {
    const cleanup = loadMoreRef.current;


    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const observerCallback = debounce((entries) => {
        console.log('first')
        entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
                    setPage((prev) => prev + 1);
            }
        });
    }, 400);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.1,
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(cleanup);
            }
        };
    }, []);
    return <>{children}</>;
};

export default InfiniteScroll;
