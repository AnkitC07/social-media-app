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
import {convertBase64} from '../../functions/convertBase64.js'

const AddTweet = ({setPosts}) => {
    const imgRef = useRef(null);
    const [postText, setPostText] = useState("");
    const [img, setImg] = useState({
        url: null,
        file: null,
    });
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
        try {
            console.log(img)
            const postData = {
                postText: postText,
                img: img.file ? await convertBase64(img.file):'',
            };

        
            await axios.post("/api/post/add", postData).then(response => {
                setPosts(response.data.data.tweet)
                console.log("Add post data=>", response.data);
             })
            
        } catch (error) {
            console.log("Add post failed", error);
            toast.error("Add post failed");
        }
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
                        </div>
                        <div className="flex justify-between flex-wrap gap-2 max-[319px]:justify-end">
                            <div className="flex gap-2 text-[#03A9F4]">
                                <input
                                    accept="image/*"
                                    ref={imgRef}
                                    onChange={(e) => {
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
                                <CropOriginalRoundedIcon
                                    onClick={() => imgRef.current.click()}
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
