"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import EditProfileModal from "../../_components/layout/EditProfileModal";
import FollowButton from "../../_components/common/FollowButton";
import followToggle from "../functions/api/followToggle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "../../_components/common/Modal";
import Logout from "./Logout";
import { PostContext } from "../../_context/Post";

import FeedPost from "../../_components/common/FeedPost.jsx";
import likeToggle from "../functions/api/likeToggle";
import InfiniteScroll from "../../_components/common/InfiniteScroll";
import { socket } from "../../helpers/socket";

const ProfilePage = ({ params }) => {
    const {
        profile,
        setProfile,
        userData,
        leftProfileData,
        setLeftProfileData,
        setUserData,
        profilePage,
        setProfilePage,
        unKnownProfilePage,
        setUnknownProfilePage,
        token
    } = useContext(PostContext);
    const selectPage = () => {
        return params?.id === undefined ? profilePage : unKnownProfilePage;
    };
    const [loading, setLoading] = useState(true);
    const loadMoreRef = useRef();
    const [page, setPage] = useState(selectPage());
    const [inLoading, setInLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    // const [profile, setProfile] = useState({});
    const [editFormData, setEditFormData] = useState({
        username: userData.username,
        name: userData?.fullName ? userData.fullName : "",
        bio: userData?.bio ? userData.bio : "",
        avatar: null, // to store the avatar file
        banner: null, // to store the banner file
    });

    // useEffect(() => {
    //     console.log("------------profile page data-----------",userData._id === params?.id || params?.id === undefined, userData);
    //     if (userData._id === params?.id || params?.id === undefined) {
    //         setProfile(userData);
    //         setLoading(false);
    //     }
    // }, [userData, params?.id]);

    // useEffect(() => {
    //     setProfile(profile)
    //     console.log('data')
    // },[userData])




    // Edit Profile Details
    const editProfleApi = async () => {
        setLoading(true);
        try {
            const request = axios.put("/api/users/profile/edit?id=" + params?.id, editFormData);

            request
                .then((res) => {
                    // console.log("Edit Profile Successfull", res.data);

                    setEditFormData({
                        username: res.data.data.username,
                        name: res.data.data.fullName,
                        bio: res.data.data.bio,
                        avatar: res.data.data.avatar, // to store the avatar file
                        banner: res.data.data.banner, // to store the banner file
                    });

                    toast.success("Edit Profile Successfull");
                })
                .finally(() => {
                    setLoading(false);
                    setOpenModal(false);
                });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Profile Edit Submit Button
    const handleSubmit = (e, editFormData) => {
        e.preventDefault();
        // console.log(editFormData);
        editProfleApi();
    };

    // Follow/Unfollow
    const handleFollowToggle = async (toggle) => {
        // Update the UI state based on the follow/unfollow action
        setIsFollowed(toggle);
        // console.log("handleFollowToggle=>", toggle);
        const action = toggle ? "follow" : "unfollow";
        token
        const result = await followToggle(socket,userData?._id,params.id, action,token);

        if (!result.error) {
            if (toggle) {
                setProfile((state) => {
                    return {
                        ...state,
                        followerCount: state.followerCount + 1,
                    };
                });
                setUserData((state) => {
                    return {
                        ...state,
                        followingCount: state.followingCount + 1,
                    };
                });
                setIsFollowed(true)
            } else {
                setProfile((state) => {
                    return {
                        ...state,
                        followerCount: state.followerCount - 1,
                    };
                });
                setUserData((state) => {
                    return {
                        ...state,
                        followingCount: state.followingCount - 1,
                    };
                });
                setIsFollowed(false)
            }
        } else {
            // Handle the error (e.g., show an error message)
            console.error("Follow toggle error:", result.error);
        }
    };

    // Like/Unlike
    const handleLikeToggle = async (idx, isLiked, setIsLiked, post) => {
        const action = isLiked ? "unlike" : "like";
        const result = await likeToggle(post._id, action);
        if (!result.error) {
            setProfile((prevPosts) => {
                // console.log("profile state=", prevPosts);
                const newPofile = { ...prevPosts };
                newPofile.tweets[idx].likes = result.likes;
                return newPofile;
            });
            setIsLiked(!isLiked);
        } else {
            console.error("Follow toggle error:", result.error);
        }
        return result;
    };

    // Get profile data
    const getData = async () => {
        try {
            setLoading(true);
            setPostLoading(true);
            await axios
                .get(`/api/users/profile?id=${params?.id == undefined ? "user" : params?.id}`)
                .then((res) => {
                    const isCurrentUserFollowing = res.data.data.isFollowed;
                    console.log("onload", res.data.data);
                    // setProfile(res.data.data);
                    setLeftProfileData(res.data.data);
                    setEditFormData({
                        username: res.data.data.username,
                        name: res.data.data.fullName,
                        bio: res.data.data.bio,
                        avatar: res.data.data.avatar, // to store the avatar file
                        banner: res.data.data.banner, // to store the banner file
                    });
                    // console.log("is followed", isCurrentUserFollowing);
                    setIsFollowed(isCurrentUserFollowing);
                })
                .finally(() => {
                    setPostLoading(false);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            toast.error("User not found");
        }
    };

    // Get posts
    const getProfilePots = async (index) => {
        try {
            const request = await axios(
                `/api/post/profile/get?id=${params?.id == undefined ? "user" : params?.id}&page=${index}`
            );
            const res = request.data;
            console.log("Profile Post Data=>", profilePage, res);
            if (res.length == 0) {
                setInLoading(false);
            } else {
                    
               
                setProfile((prev) => {
                    console.log(prev);
                    return {
                        ...prev,
                        tweets: prev.tweets ? [...prev?.tweets, ...res] : [...res],
                    };
                });
                
                    
                if (res.length < 5) {
                    setInLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };


    // This is for Posts
    useEffect(() => {
        console.log(selectPage(), page);
        if (selectPage() !== page) {
            getProfilePots(selectPage());
        }
        return () => {
            // setProfile(state => {
            //     return {
            //         ...state,
            //         tweets: [],
            //     }
            // });
            // params?.id === undefined ? setProfilePage(0) : setUnknownProfilePage(0);
        };
    }, [selectPage()]);


    // This is for User Data
    useEffect(() => {
        // console.log(userData,leftProfileData)
        if (params?.id !== undefined) {
            getData();
        } else if (JSON.stringify(userData) !== "{}") {
            setLeftProfileData(userData);
            // console.log('userData')
            setLoading(false);
        } else if(JSON.stringify(leftProfileData) !== "{}") {
            setUserData(leftProfileData);
            // console.log('leftProfileData')
            setLoading(false);
        } else {
            // console.log('else')
            getData();
        }
    }, [userData]); 


    // This if to only cleanup function of posts state
    useEffect(() => {   
        return () => {
            setProfile(state => {
                return {
                    ...state,
                    tweets: [],
                }
            });
            params?.id === undefined ? setProfilePage(0) : setUnknownProfilePage(0);
        } 
    },[])

    return (
        <>
            <section className="border border-y-0 border-gray-800 mx-auto" style={{ maxWidth: "600px" }}>
                <div>
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat"
                        style={{
                            height: "200px",
                            backgroundImage: leftProfileData?.banner
                                ? `url(${leftProfileData?.banner})`
                                : "url(https://res.cloudinary.com/deyq54d8b/image/upload/v1708498415/Social-Media-App/default-banner.jpg)",
                        }}
                    ></div>
                    <div className="p-4">
                        {/* <!-- Profile Top Area --> */}
                        <div className="relative flex w-full">
                            {/* <!-- Avatar --> */}
                            <div className="flex flex-1">
                                <div style={{ marginTop: "-6rem" }}>
                                    <div
                                        style={{ height: "9rem", width: "9rem" }}
                                        className="md avatar relative rounded-full"
                                    >
                                        {/* <img
                                            style={{ height: "9rem", width: "9rem" }}
                                            className="md relative rounded-full border-4 border-gray-900"
                                            src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                                            alt=""
                                        /> */}
                                        {leftProfileData?.avatar ? (
                                            <Image
                                                className="rounded-full border-4 border-gray-900"
                                                src={leftProfileData?.avatar}
                                                alt="Profile picture"
                                                width={225}
                                                height={225}
                                            />
                                        ) : (
                                            <Image
                                                className="rounded-full border-4 border-gray-900"
                                                src={
                                                    "https://res.cloudinary.com/deyq54d8b/image/upload/v1707136917/Social-Media-App/default-profile.jpg"
                                                }
                                                alt="Profile picture"
                                                width={225}
                                                height={225}
                                            />
                                        )}
                                        <div className="absolute"></div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Follow Button --> */}
                            <div className="flex items-center ">
                                {postLoading || loading ? (
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                ) : params?.id ? (
                                    <FollowButton
                                        bgColor={isFollowed ? "!bg-tweet-blue" : "bg-white"}
                                        textColor={isFollowed ? "!text-white" : "text-balck"}
                                        isFollowed={isFollowed}
                                        handleFollowToggle={handleFollowToggle}
                                    />
                                ) : (
                                    <button
                                        onClick={() => setOpenModal(!openModal)}
                                        className="ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full border border-blue-500 bg-transparent px-4 py-2 font-bold text-blue-500  hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                                <MoreVertIcon
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                    onClick={() => setShow(!show)}
                                    // className=" absolute right-3 top-2 px-2 py-2 rounded-full text-[35px] bg-[#1d1d3d47] text-white group cursor-pointer backdrop-blur-[2px]"
                                />
                                {show && (
                                    <Modal width={" !z-[999] w-fit bottom-[-75px] lg:right-[-70px] !py-2 !pb-1 "}>
                                        <p className="flex flex-col text-[16px]">
                                            <span className="border-b-[1px] pb-1 border-gray-800 text-white hover:text-tweet-blue">
                                                Setting
                                            </span>
                                            <span className="text-white hover:text-tweet-blue">
                                                <Logout />
                                            </span>
                                        </p>
                                    </Modal>
                                )}
                            </div>
                        </div>

                        {/* <!-- Profile info --> */}
                        <div className="ml-3 mt-3 w-full justify-center space-y-1">
                            {/* <!-- User basic--> */}
                            <div>
                                {!leftProfileData?.username ? (
                                    <div
                                        role="status"
                                        className="max-w-sm rounded shadow animate-pulse  dark:border-gray-700"
                                    >
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                                        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-bold leading-6 text-white">
                                            {leftProfileData?.fullName}
                                        </h2>
                                        <p className="text-sm font-medium leading-5 text-gray-600">
                                            @{leftProfileData?.username}
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* <!-- Description and others --> */}
                            <div className="mt-3">
                                <p className="mb-4 leading-tight text-white">{leftProfileData?.bio}</p>
                                {/* <div className="flex flex-wrap gap-1 text-sm text-gray-600">
                                    <span className="mr-2 flex">
                                        <svg viewBox="0 0 24 24" className="paint-icon h-5 w-5">
                                            <g>
                                                <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                                                <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                                            </g>
                                        </svg>
                                        <a
                                            href="https://ricardoribeirodev.com/personal/"
                                            target="#"
                                            className="ml-1 leading-5 text-blue-400"
                                        >
                                            www.RicardoRibeiroDEV.com
                                        </a>
                                    </span>
                                    <span className="mr-2 flex">
                                        <svg viewBox="0 0 24 24" className="paint-icon h-5 w-5 fill-white">
                                            <g>
                                                <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                                                <circle cx="7.032" cy="8.75" r="1.285"></circle>
                                                <circle cx="7.032" cy="13.156" r="1.285"></circle>
                                                <circle cx="16.968" cy="8.75" r="1.285"></circle>
                                                <circle cx="16.968" cy="13.156" r="1.285"></circle>
                                                <circle cx="12" cy="8.75" r="1.285"></circle>
                                                <circle cx="12" cy="13.156" r="1.285"></circle>
                                                <circle cx="7.032" cy="17.486" r="1.285"></circle>
                                                <circle cx="12" cy="17.486" r="1.285"></circle>
                                            </g>
                                        </svg>
                                        <span className="ml-1 leading-5">Joined December, 2019</span>
                                    </span>
                                </div> */}
                            </div>
                            <div className="flex w-full items-start justify-start divide-x divide-solid divide-gray-800 pt-3">
                                <div className="pr-3 text-center">
                                    <span className="font-bold text-white">{leftProfileData?.followingCount}</span>
                                    <span className="text-gray-600"> Following</span>
                                </div>
                                <div className="px-3 text-center">
                                    <span className="font-bold text-white">{leftProfileData?.followerCount} </span>
                                    <span className="text-gray-600"> Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-800" />
                </div>
                <ul className="list-none pb-[63px] md:pb-0 ">
                    {/* {profile?.tweets ? (

                        profile?.tweets?.map((post, idx) => (
                            <FeedPost
                                key={idx}
                                idx={idx}
                                post={post}
                                profile={profile}
                                handleLikeToggle={handleLikeToggle}
                                userData={userData}
                            />
                        ))
                    ) : (
                        <div className="w-full mt-4">
                            <div className="mx-auto max-w-lg">
                                <div className="flex gap-1 items-center animate-pulse mb-2">
                                    <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                                    <div className="h-4 w-20 rounded-md bg-gray-700"></div>
                                    <div className="h-4 w-10 rounded-md bg-gray-700"></div>
                                </div>
                                <div role="status" className="mb-7 animate-pulse">
                                    <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-7 max-w-lg animate-pulse">
                                    <div className="flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
                                        <svg
                                            className="h-12 w-12 text-gray-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 640 512"
                                        >
                                            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
                                        </svg>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="my-6 animate-pulse">
                                    <div className="flex w-full justify-around">
                                        <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                        <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                        <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                        <div className="h-5 w-5 rounded-lg bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
                    <InfiniteScroll
                        setPage={params?.id == undefined ? setProfilePage : setUnknownProfilePage}
                        loadMoreRef={loadMoreRef}
                    >
                        {profile?.tweets?.map((post, idx) => (
                            <FeedPost
                                key={idx}
                                idx={idx}
                                post={post}
                                profile={profile}
                                handleLikeToggle={handleLikeToggle}
                                userData={leftProfileData}
                            />
                        ))}

                        {inLoading && (
                            <div id="#load-more-explore" ref={loadMoreRef} role="status" className="text-center">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </InfiniteScroll>
                </ul>
            </section>
            {openModal && (
                <EditProfileModal
                    onClose={() => setOpenModal(false)}
                    handleSubmit={handleSubmit}
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                    loading={loading}
                />
            )}
        </>
    );
};

export default ProfilePage;
