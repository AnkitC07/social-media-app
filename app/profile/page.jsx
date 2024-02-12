"use client";
import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import EditProfileModal from "../_components/layout/EditProfileModal";
import { UserContext } from "../_context/User";
import FollowButton from "../_components/common/FollowButton";
import Feed, { postImages } from "../_components/layout/Feed";

const ProfilePage = ({ params }) => {
    const { userData } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [postLoading,setPostLoading]= useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [profile, setProfile] = useState({});
    const [editFormData, setEditFormData] = useState({
        username: "",
        name: "",
        bio: "",
        avatar: null, // to store the avatar file
        banner: null, // to store the banner file
    });
    if (params?.id) {
        const id = params.id;
    }

    const editProfleApi = async () => {
        setLoading(true);
        try {
            const request = axios.put("/api/users/profile/edit?id=" + params?.id, editFormData);

            request
                .then((res) => {
                    console.log("Edit Profile Successfull", res.data);

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
        console.log(editFormData);
        editProfleApi();
    };

    useEffect(() => {
        (async () => {
            try {
                await axios
                    .get(`/api/users/profile?id=${params?.id == undefined ? "user" : params?.id}`)
                    .then((res) => {
                        const isCurrentUserFollowing = res.data.data.followers.includes(userData._id);
                        console.log(res.data.data, userData._id);
                        setProfile(res.data.data);
                        setEditFormData({
                            username: res.data.data.username,
                            name: res.data.data.fullName,
                            bio: res.data.data.bio,
                            avatar: res.data.data.avatar, // to store the avatar file
                            banner: res.data.data.banner, // to store the banner file
                        });
                        
                        setIsFollowed(isCurrentUserFollowing);
                    }).finally(() => {
                        setPostLoading(false)
                    });
            } catch (error) {
                console.log(error);
                toast.error("User not found");
            }
        })();
    }, []);

    return (
        <>
            <section className="border border-y-0 border-gray-800 mx-auto" style={{ maxWidth: "600px" }}>
                <div>
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat"
                        style={{
                            height: "200px",
                            backgroundImage: profile?.banner
                                ? `url(${profile?.banner})`
                                : "url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)",
                        }}
                    >
                    </div>
                    <div className="p-4">
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
                                        {profile?.avatar && (
                                            <Image
                                                className="rounded-full border-4 border-gray-900"
                                                src={profile?.avatar}
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
                            <div className="flex flex-col text-right">
                                {params?.id && profile._id !== userData._id ? (
                                    // isFollowed ?
                                    //     (
                                    //     <button
                                    //         onClick={() => handleFollow(!isFollowed)}
                                    //         className="ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full border border-blue-500 bg-tweet-blue px-5 py-2 font-bold text-white  hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring"
                                    //     >
                                    //         Following
                                    //     </button>
                                    // ) : (
                                    //     <button
                                    //         onClick={() => handleFollow(!isFollowed)}
                                    //         className="ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full border border-blue-500 bg-white px-5 py-2 font-bold text-black  hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring"
                                    //     >
                                    //         Follow
                                    //     </button>
                                    // )
                                    <FollowButton followeeId={profile._id} following={isFollowed} />
                                ) : (
                                    <button
                                        onClick={() => setOpenModal(!openModal)}
                                        className="ml-auto mr-0  flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full border border-blue-500 bg-transparent px-4 py-2 font-bold text-blue-500  hover:border-blue-800 hover:shadow-lg focus:outline-none focus:ring"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* <!-- Profile info --> */}
                        <div className="ml-3 mt-3 w-full justify-center space-y-1">
                            {/* <!-- User basic--> */}
                            <div>
                                <h2 className="text-xl font-bold leading-6 text-white">{profile?.fullName}</h2>
                                <p className="text-sm font-medium leading-5 text-gray-600">@{profile?.username}</p>
                            </div>
                            {/* <!-- Description and others --> */}
                            <div className="mt-3">
                                <p className="mb-4 leading-tight text-white">{profile?.bio}</p>
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
                                    <span className="font-bold text-white">
                                        {profile?.following?.length < 1 ? 0 : profile?.following?.length}
                                    </span>
                                    <span className="text-gray-600"> Following</span>
                                </div>
                                <div className="px-3 text-center">
                                    <span className="font-bold text-white">
                                        {profile?.followers?.length < 1 ? 0 : profile?.followers?.length}{" "}
                                    </span>
                                    <span className="text-gray-600"> Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-800" />
                </div>
                <ul className="list-none">
                    {!postLoading && profile.tweets.map((post, idx) => 
                        <li key={idx}>
                            {console.log(post.text.split("\n"))}
                            
                        {/* <!--second tweet--> */}
                        <article className="duration-350 transition ease-in-out hover:bg-gray-800">
                            <div className="p-4 pb-0">
                                <Link href="#" className="md:flex-shrink group block flex-shrink-0">
                                    <div className="flex items-start">
                                        <div>
                                            <img
                                                className="inline-block h-10 w-10 rounded-full"
                                                src={profile.avatar}
                                                alt="Profile Image"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <p className=" flex flex-wrap items-baseline mb-3 text-base font-medium leading-6 text-white">
                                                    <span className="mr-2">{profile.fullName}</span>
                                                <span className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                                                    {" "}
                                                    @{profile.username} . 16 April{" "}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="pl-[75px] pr-5">
                                    <p className="width-auto flex-shrink text-base font-medium text-white whitespace-pre-line">
                                        {post.text}
                                    </p>
                                        {/* {postTextEdit(post.text)} */}
                                        {/* <pre className="width-auto flex-shrink text-base font-medium text-white font-[inherit]">
                                            {post.text}
                                        </pre> */}

                                <div className="pr-6 pt-3 md:flex-shrink">
                                {postImages(post)}
                                </div>

                                <div className="flex items-center py-4">
                                    <div className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-blue-400">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                            <g>
                                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                            </g>
                                        </svg>
                                        12.3 k
                                    </div>
                                    <div className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-green-400">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                            <g>
                                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                                            </g>
                                        </svg>
                                        14 k
                                    </div>
                                    <div className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-red-600">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                            <g>
                                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                                            </g>
                                        </svg>
                                        14 k
                                    </div>
                                    <div className="duration-350 flex flex-1 items-center text-xs  text-white transition ease-in-out hover:text-blue-400">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                                            <g>
                                                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                                                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-800" />
                        </article>
                        </li>
                         )}
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
