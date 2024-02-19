"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import useOnClickOutside from "../../_hooks/useOnClickOutside.js";
import Hashtags from "./Hashtags.jsx";
import Modal from "../common/Modal.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const SearchCom = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        users: [],
        hashtags: [],
    });

    useEffect(() => {
        const getData = setTimeout(() => {
            try {
                setLoading(true);
                axios
                    .get(`api/post/search?q=${search}`)
                    .then((response) => {
                        console.log(response.data);
                        setSearchData({ users: response.data.users, hashtags: response.data.hashtags });
                    })
                    .finally(() => setLoading(false));
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }, [1000]);

        return () => clearTimeout(getData);
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
                            {!searchData.users.length>0 ? (
                                <span className="font-medium text-gray-600">
                                    Try searching for people.
                                </span>
                            ) : (
                                    searchData.users.map(user => (
                                        <p key={user._id}>
                                            {user.username}
                                        </p>
                                )) 
                            )}
                        </div>
                        <div className="pt-4">
                            {!searchData.hashtags.length>0 ? (
                                <span className="font-medium text-gray-600">
                                    Try searching for hashtags.
                                </span>
                            ) : (
                                    searchData.hashtags.map(tag => (
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
