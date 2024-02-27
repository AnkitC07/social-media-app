"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import useOnClickOutside from "../../_hooks/useOnClickOutside.js";
import Hashtags from "./Hashtags.jsx";
import Modal from "../common/Modal.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Profile from "./Profile.jsx";
import { PostContext } from "../../_context/Post.jsx";

const SearchCom = () => {
    const { trendingTags } = useContext(PostContext);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        users: [],
        hashtags: [],
    });
    console.log(searchData)


    // useEffect(() => {
    //     const getData = setTimeout(() => {
    //         try {
    //             setLoading(true);
    //             axios
    //                 .get(`api/post/search?q=${search}`)
    //                 .then((response) => {
    //                     console.log(response.data);
    //                     setSearchData({ users: response.data.users, hashtags: response.data.hashtags });
    //                 })
    //                 .finally(() => setLoading(false));
    //         } catch (error) {
    //             console.log(error);
    //             toast.error(error.message);
    //         }
    //     }, [1000]);

    //     return () => clearTimeout(getData);
    // }, [search]);

    useEffect(() => {
        const getData = async () => {
            if (search !== "") {
                // Only proceed if search term is not empty
                try {
                    setLoading(true);
                    const response = await axios.get(`api/post/search?q=${search}`);
                    setSearchData({ users: response.data.users, hashtags: response.data.hashtags });
                } catch (error) {
                    console.error(error);
                    toast.error(error.message); // Assuming you have a toast library
                } finally {
                    setLoading(false);
                }
            }
        };

        // Debounce using a separate variable and clearTimeout
        let timeoutId;
        const debouncedGetData = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(getData, 1000); // Delay of 1 second
        };

        debouncedGetData();

        // Cleanup function to clear timeout on unmount
        return () => clearTimeout(timeoutId);
    }, [search]);

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder={"Search Tweets"}
                className="bg-bg-card px-8 py-3 rounded-xl w-full"
            />
            <Search className="absolute top-[13px] left-[5px]" sx={{ fontSize: "22px", color: "#03A9F4" }} />
            {show && (
                <>
                    <Modal style={tags ? "justify-start" : "justify-center"} width={"w-full "}>
                        <div className="pb-4">
                            {!searchData.users.length > 0 ? (
                                <span className="font-medium text-gray-600">Try searching for people.</span>
                            ) : (
                                searchData.users.map((user) => (
                                    <Link
                                        key={user._id}
                                        href={"/profile/" + user?._id}
                                        className="md:flex-shrink flex-shrink-0 group block my-3"
                                    >
                                        <div className="flex gap-1 items-start">
                                            {/*<Image
                                                className="inline-block rounded-sm"
                                                src={"https://inc42.com/wp-content/uploads/2023/11/Elon-Musk-Web-760x570.jpg"}
                                                width={50}
                                                height={50}
                                                alt=""
                                            /> */}
                                            <Profile src={user.avatar} w={40} h={25} />

                                            <div className="">
                                                <p className=" flex flex-wrap flex-col  items-baseline text-sm leading-6 font-semibold text-white ">
                                                    <span className="mr-2">{user.fullName}</span>
                                                    <span className="text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                        @{user.username}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                        <div className="pt-4">
                            <div className="text-center mb-2 text-gray-500 text-lg">
                                <span>Trends for you.</span>
                            </div>
                            {!searchData.hashtags.length > 0 ? (
                                <span className="font-medium text-gray-600">Try searching for hashtags.</span>
                            ) : (
                                searchData.hashtags.map((tag) => (
                                    <Hashtags key={tag.hashtag} tag={tag.hashtag} count={tag.tweets.length} />
                                ))
                            )}
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default SearchCom;
