"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../common/Card";
import Profile from "../common/Profile";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import CropOriginalRoundedIcon from "@mui/icons-material/CropOriginalRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import axios from "axios";
import toast from "react-hot-toast";
import { convertBase64 } from "../../functions/convertBase64.js";
import { UserContext } from "../../_context/User";

const FilePreview = ({ i, file, filesRef, setFileRef }) => {
    if (!file) return null;

    const url = URL.createObjectURL(file); // Create temporary URL using URL.createObjectURL

    // Determine file type based on mimeType or extension
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    return (
        <>
            <div className="slide flex-shrink-0 w-[26vw] h-[calc(22vw*1.5)] sm:w-[20vw] sm:h-[calc(20vw*1.5)] md:w-[13vw] md:h-[calc(10vw*1.5)] overflow-clip relative mx-2 snap-center rounded-3xl">
                {isImage && (
                    <img
                        src={url}
                        width={200}
                        height={"500px"}
                        className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                        alt={`Preview of ${file.name}`}
                    />
                )}
                {isVideo && (
                    <video
                        className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                        autoPlay
                        width={300}
                        height={240}
                        src={url}
                        alt={`Preview of ${file.name}`}
                    />
                )}
                <CloseIcon
                    sx={{
                        fontSize: "30px",
                    }}
                    onClick={() => {
                        filesRef.splice(i, 1);
                        return setFileRef([...filesRef]);
                    }}
                    className=" absolute right-3 top-2 px-2 py-2 rounded-full bg-bg-card text-white group cursor-pointer backdrop-blur-[2px]"
                />
            </div>
        </>
    );
};

const AddTweet = ({ setPosts }) => {
    // const filesRef = useRef([]);
    const { userData } = useContext(UserContext);
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(false);
    const [filesRef, setFileRef] = useState([]);
    const inputRef = useRef(null);
    const slidesContainerRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        const slideWidth = slidesContainerRef.current.querySelector(".slide")?.clientWidth;
        

        const handleNextClick = () => {
            slidesContainerRef.current.scrollLeft += slideWidth;
        };

        const handlePrevClick = () => {
            slidesContainerRef.current.scrollLeft -= slideWidth;
        };

        nextButtonRef?.current?.addEventListener("click", handleNextClick);
        prevButtonRef?.current?.addEventListener("click", handlePrevClick);

        return () => {
            // Cleanup function for event listeners
            nextButtonRef?.current?.removeEventListener("click", handleNextClick);
            prevButtonRef?.current?.removeEventListener("click", handlePrevClick);
        };
    }, [filesRef]);

    function auto_grow(element) {
        element.target.style.height = "5px";
        element.target.style.height = element.target.scrollHeight + "px";
    }

    const addPost = async () => {
        setLoading(true)
        const formData = new FormData();
        filesRef.forEach((file) => formData.append("files", file));
        formData.append("postText", postText);

        try {
            await axios
                .post("/api/post/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Required for FormData
                    },
                })
                .then((response) => {
                    setPosts(posts => [
                        response.data.tweet,
                        ...posts
                    ]);
                    // clearing reseting Add post area.
                    setFileRef([]);
                    setPostText("");
                    toast.success("Tweet Added Successfully");
                    console.log("Add post data=>", response.data);
                }).finally(()=>setLoading(false));
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Add post failed");
        }

        // try {
        //     console.log(img);
        //     const postData = {
        //         postText: postText,
        //         img: img.file ? await convertBase64(img.file) : "",
        //     };

        //     await axios.post("/api/post/add", postData).then((response) => {
        //         setPosts(response.data.data.tweet);
        //         console.log("Add post data=>", response.data);
        //     });
        // } catch (error) {
        //     console.log("Add post failed", error);
        //     toast.error("Add post failed");
        // }
    };

    return (
        <Card>
            <div className="flex gap-2 p-4">
                <div className="w-[8%]">
                    <Profile src={userData.avatar} w={50} h={50} />
                </div>
                <div className="bg-bg-card  w-[91.5%]">
                    <div className="p-5 bg-[#28343E] rounded-2xl">
                        <textarea
                            // cols="30"
                            onChange={(e) => setPostText(e.target.value)}
                            value={postText}
                            onInput={auto_grow}
                            placeholder="What's on your mind? "
                            className="border-0 w-full resize-none bg-[#28343E] focus-visible:outline-none"
                        />
                        <div id="media" className="pb-3">
                            {/* {img.url !== null && (
                                <Image
                                    className="mb-2 rounded-lg"
                                    src={img.url}
                                    height={300}
                                    width={240}
                                    alt={"tweetImage"}
                                />
                            )} */}

                            <div className="relative text-zinc-50 font-generalSans">
                                <div
                                    ref={slidesContainerRef}
                                    className="slides overflow-scroll smooth-scroll w-full whitespace-nowrap touch-pan-x before:shrink-0 after:shrink-0  snap-mandatory flex snap-x"
                                >
                                    {filesRef.length > 0
                                        ? filesRef.map((file, idx) => (
                                              <FilePreview
                                                  key={file?.name}
                                                  i={idx}
                                                  filesRef={filesRef}
                                                  file={file}
                                                  setFileRef={setFileRef}
                                              />
                                          ))
                                        : ""}
                                </div>

                                {filesRef?.length > 2 ? (
                                    <>
                                        {/* <!-- Buttons	 --> */}
                                        <div className="absolute  -left-4  top-1/2 items-center hidden md:flex">
                                            <button
                                                ref={prevButtonRef}
                                                role="button"
                                                className="prev px-2 py-2 rounded-full  bg-bg-card text-white group"
                                                aria-label="prev"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-5 h-5 group-active:-translate-x-2 transition-all duration-200 ease-linear"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="absolute  -right-[15px] top-1/2  items-center hidden md:flex">
                                            <button
                                                ref={nextButtonRef}
                                                role="button"
                                                className="next px-2 py-2 rounded-full bg-bg-card text-white group"
                                                aria-label="next"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-5 h-5 group-active:translate-x-2 transition-all duration-200 ease-linear"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex justify-between flex-wrap gap-2 max-[319px]:justify-end">
                            <div className="flex gap-2 text-[#03A9F4]">
                                <input
                                    disabled={filesRef?.length >= 4}
                                    accept="image/*,video/*"
                                    ref={inputRef}
                                    multiple
                                    onChange={(e) => {
                                        if (filesRef.length <= 4) {
                                            setFileRef([...filesRef, ...e.target.files]);
                                        }
                                    }}
                                    type="file"
                                    name="image"
                                    id="uploadImage"
                                    className="hidden"
                                />
                                {/* Display file previews */}

                                <CropOriginalRoundedIcon
                                    onClick={() => inputRef.current.click()}
                                    sx={{
                                        filter: "drop-shadow(0px 0px 3px rgb(47 223 154 / 0.5))",
                                        cursor: filesRef?.length >= 4 ? "not-allowed" : "pointer",
                                    }}
                                    className={"text-[#2FDF9A] "}
                                />
                                <PlayCircleOutlineRoundedIcon
                                    sx={{
                                        filter: "drop-shadow(0px 0px 3px rgb(0 168 240 / 0.5))",
                                    }}
                                    className="text-[#03A9F4]"
                                />
                                <RoomRoundedIcon
                                    sx={{
                                        filter: "drop-shadow(0px 0px 3px rgb(251 110 110 / 0.5))",
                                    }}
                                    className="text-[#FB6E6E]"
                                />
                            </div>
                            <button onClick={addPost} className="py-1 px-4 bg-[#03A9F4] text-sm rounded-2xl">
                            {loading ? (
                                        <>
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                                                    fill="#1C64F2"
                                                />
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        "Create"
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AddTweet;
