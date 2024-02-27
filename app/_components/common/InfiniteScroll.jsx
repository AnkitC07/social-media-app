import React, { useEffect } from "react";

const InfiniteScroll = ({ loadMoreRef, setPage, children }) => {
    const cleanup = loadMoreRef.current
    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log('Obeserver')
                setPage((prev) => prev + 1);
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 1.0,
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
