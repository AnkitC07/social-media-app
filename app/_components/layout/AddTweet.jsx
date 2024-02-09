"use client";
import React, { useRef, useState } from "react";
import Card from "../common/Card";
import Profile from "../common/Profile";
import Image from "next/image";
import CropOriginalRoundedIcon from "@mui/icons-material/CropOriginalRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import axios from "axios";
import toast from "react-hot-toast";
import { convertBase64 } from "../../functions/convertBase64.js";

const FilePreview = ({ i, file, filesRef, setFileRef }) => {
    if (!file) return null;

    const url = URL.createObjectURL(file); // Create temporary URL using URL.createObjectURL

    // Determine file type based on mimeType or extension
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    return (
        <>
            {isImage && (
                <img
                    src={url}
                    className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={`Preview of ${file.name}`}
                />
            )}
            {isVideo && (
                <video
                    className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    autoPlay
                    width={300}
                    height={240}
                    src={url}
                    alt={`Preview of ${file.name}`}
                />
            )}

            {/* {isImage && <img className="mb-2 rounded-lg" width={300} height={240} src={url} alt={`Preview of ${file.name}`} />}
            {isVideo && <video className="mb-2 rounded-lg"  autoPlay width={300} height={240} src={url} alt={`Preview of ${file.name}`} />}
            <button
                onClick={() => {
                    filesRef.splice(i,1);
                    return setFileRef([...filesRef])
                }}
            >
                Remove
            </button> */}
        </>
    );
};

const AddTweet = ({ setPosts }) => {
    // const filesRef = useRef([]);
    const [filesRef, setFileRef] = useState([]);
    const inputRef = useRef(null);
    const [postText, setPostText] = useState("");
    const [img, setImg] = useState({
        url: null,
        file: null,
    });

    //
    const [selectedFiles, setSelectedFiles] = useState([]);
    console.log(selectedFiles, "selectedFiles");
    const handleChange = (event) => {
        const { files } = event.target;

        // Validate for allowed file types (optional)
        const allowedTypes = ["image/*", "video/*"];
        const validatedFiles = Array.from(files).filter((file) => {
            console.log(file);
            return file;
        });
        console.log(validatedFiles);

        // Update selectedFiles with the validated files
        setSelectedFiles(validatedFiles);

        // Handle other actions if needed (e.g., previewing selected files)
        // ...
    };

    // console.log(img);
    function auto_grow(element) {
        element.target.style.height = "5px";
        element.target.style.height = element.target.scrollHeight + "px";
    }
    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    const addPost = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));

        try {
            const response = await axios.post("/api/post/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for FormData
                },
            });

            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
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
                <div>
                    <Profile src={"/assets/User.jpeg"} w={50} h={50} />
                </div>
                <div className="bg-bg-card  w-full">
                    <div className="p-5 bg-[#28343E] rounded-2xl">
                        <textarea
                            // cols="30"
                            onChange={(e) => setPostText(e.target.value)}
                            value={postText}
                            onInput={auto_grow}
                            placeholder="What's on your mind? "
                            className="border-0 w-full resize-none bg-[#28343E] focus-visible:outline-none"
                        />
                        <div id="media">
                            {img.url !== null && (
                                <Image
                                    className="mb-2 rounded-lg"
                                    src={img.url}
                                    height={300}
                                    width={240}
                                    alt={"tweetImage"}
                                />
                            )}
                            {filesRef.length > 0 ? (
                                <>
                                    {/* // */}
                                    <div id="gallery" class="relative w-full" data-carousel="slide">
                                        {/* <!-- Carousel wrapper --> */}
                                        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                                            {/* <!-- Item 1 --> */}
                                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
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
                                        </div>
                                        {/* <!-- Slider controls --> */}
                                        <button
                                            type="button"
                                            class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                            data-carousel-prev
                                        >
                                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                <svg
                                                    class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 6 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 1 1 5l4 4"
                                                    />
                                                </svg>
                                                <span class="sr-only">Previous</span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                            data-carousel-next
                                        >
                                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                <svg
                                                    class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 6 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="m1 9 4-4-4-4"
                                                    />
                                                </svg>
                                                <span class="sr-only">Next</span>
                                            </span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex justify-between flex-wrap gap-2 max-[319px]:justify-end">
                            <div className="flex gap-2 text-[#03A9F4]">
                                <input
                                    accept="image/*,video/*"
                                    ref={inputRef}
                                    multiple
                                    onChange={(e) => {
                                        handleChange(e);

                                        // filesRef.current = [...e.target.files];
                                        setFileRef([...e.target.files]);
                                        const fileList = e.target.files;
                                        if (fileList) {
                                            const files = [...fileList];
                                            const url = URL.createObjectURL(files[0]);
                                            setImg({
                                                url: url,
                                                file: files[0],
                                            });
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
                                    sx={{ filter: "drop-shadow(0px 0px 3px rgb(47 223 154 / 0.5))" }}
                                    className="text-[#2FDF9A]"
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
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AddTweet;
