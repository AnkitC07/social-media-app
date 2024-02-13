"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Profile from "./Profile";
import EmojiPicker from "emoji-picker-react";
import { PostContext } from "../../_context/Post";

const Modal = ({ children, style = "", width }) => {
    return (
        <div
            className={
                width +
                " absolute z-[-1] p-4 rounded-lg overscroll-contain bg-bg-purple shadow-[0px_0px_15px_rgba(225,225,225,0.2),0px_0px_3px_1px_rgba(225,225,225,0.15)]"
            }
        >
            <div id="scroll-style" className={" flex items-center  min-h-16 max-h-96 overflow-y-auto " + style}>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export const DarkModal = () => {
    const { commentModal, setCommentModal } = useContext(PostContext);
    console.log(commentModal);
    function auto_grow(element) {
        element.target.style.height = "5px";
        element.target.style.height = element.target.scrollHeight + "px";
    }
    const handleClose = () => {
        setCommentModal({
            open: false,
            post: {},
        });
    };
    return (
        <>
            {commentModal?.open && (
                <div
                    data-te-modal-init
                    class="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div
                        data-te-modal-dialog-ref
                        class=" relative w-auto   transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[600px] pointer-events-none opacity-1 "
                    >
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-2xl border-none bg-black bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                {/* <!--Modal title--> */}
                                {/* <!--Close button--> */}
                                <button
                                    type="button"
                                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    data-te-modal-dismiss
                                    aria-label="Close"
                                    onClick={handleClose}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="h-6 w-6"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* <!--Modal body--> */}
                            <div class="relative flex-auto p-4" data-te-modal-body-ref>
                                <div>
                                    <div className="p-4 pl-0">
                                        <Link
                                            href={"/profile/" + commentModal.post?.user?._id}
                                            onClick={handleClose}
                                            className="md:flex-shrink group block flex-shrink-0"
                                        >
                                            <div className="flex items-start">
                                                <div>
                                                    {/* <img
                                                className="inline-block h-10 w-10 rounded-full"
                                                src={
                                                    "http://localhost:3000/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1121328878142853120%2Fe-rpjoJi_bigger.png&w=48&q=75"
                                                }
                                                alt="Profile Image"
                                                /> */}
                                                    <Profile src={commentModal.post.user.avatar} w={42} h={100} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="mb-3">
                                                        <p className=" flex flex-wrap items-baseline  text-base font-medium leading-6 text-white">
                                                            <span className="mr-2">
                                                                {commentModal.post.user.fullName}
                                                            </span>
                                                            <span className="text-sm  leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                                                                @{commentModal.post.user.username} . 16 April{" "}
                                                            </span>
                                                        </p>
                                                        <p>{commentModal?.post?.text}</p>
                                                    </div>
                                                    <p className="text-sm leading-8 tracking-wide	">
                                                        <span className="text-gray-400 ">Replying to </span>
                                                        <span className="text-blue-600">
                                                            @{commentModal.post.user.username}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="pt-4 ">
                                    <div className="flex items-start">
                                        <div>
                                            <Profile
                                                src={
                                                    "http://localhost:3000/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1121328878142853120%2Fe-rpjoJi_bigger.png&w=48&q=75"
                                                }
                                                w={42}
                                                h={100}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                // cols="30"
                                                onInput={auto_grow}
                                                placeholder="Post yout reply "
                                                className="border-0 text-2xl pt-1 w-full resize-none bg-transparent focus-visible:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!--Modal footer--> */}
                <div class="flex relative flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 justify-between">
                  <div>
                    <EmojiPicker
                      height={360}
                      theme="dark"
                      reactionsDefaultOpen={true}
                      // className="!absolute top-0"
                    />
                  </div>
                                <button
                                    onClick={handleClose}
                                    class="relative inline-flex items-center justify-start inline-block px-3 py-[5px] overflow-hidden font-medium transition-all bg-tweet-blue rounded-full border border-tweet-blue hover:border-white hover:bg-black group"
                                >
                                    <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-black rounded-full"></span>
                                    <span class="relative w-full text-left text-[15px]  text-white transition-colors duration-200 ease-in-out group-hover:text-white ">
                                        Reply
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
