"use client";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PostContext } from "../../_context/Post";

const ImageModal = () => {
    const { modalImage,setModalImage } = useContext(PostContext);

    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    function isVideo(url) {
        return /\.(mp4|webm|ogv|mpg|mpeg)$/.test(url);
    }

    return (
        <>
            {/* <!-- Main modal --> */}
            {/* {modalImage.open && ( */}
            <div
                data-dialog-backdrop="image-dialog"
                data-dialog-backdrop-close="true"
                className={
                    "fixed inset-0 z-[9999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300  " +
                    (modalImage.open ? " " : " pointer-events-none opacity-0")
                }
            >
                <div
                    className="relative m-4 w-3/4 min-w-[75%] max-w-[75%] rounded-lg font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
                    role="dialog"
                    data-dialog="image-dialog"
                >
                    <div className="relative  p-0 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">
                        {isImage(modalImage?.url) && (
                            <img
                                alt="Image modal"
                                className="h-[48rem] m-auto  object-center"
                                src={modalImage?.url}
                            />
                        )}
                        {isVideo(modalImage?.url) && (
                            <video
                                className="h-[48rem] w-full object-cover object-center"
                                autoPlay
                                src={modalImage?.url}
                                alt={`modal image of Post`}
                            />
                        )}
                        <div>

                        <CloseIcon
                        sx={{
                            fontSize: "30px",
                        }}
                        onClick={() => {
                            setModalImage({
                                url: "",
                                open: false
                            })
                        }}
                        className=" absolute right-3 top-2 px-2 py-2 rounded-full text-[35px] bg-[#1d1d3d47] text-white group cursor-pointer backdrop-blur-[2px]"
                        />
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default ImageModal;
