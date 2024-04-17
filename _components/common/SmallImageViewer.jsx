import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const SmallImageViewer = ({ filesRef, setFileRef }) => {
    return (
        <div className="relative text-zinc-50 font-generalSans">
            <div className=" max-h-20 overflow-y-scroll  smooth-scroll w-full whitespace-nowrap touch-pan-x before:shrink-0 after:shrink-0  snap-mandatory flex flex-wrap snap-x">
                {filesRef.length > 0
                    ? filesRef?.map((file, idx) => (
                          <Preview key={idx} i={idx} filesRef={filesRef} file={file} setFileRef={setFileRef} />
                      ))
                    : ""}
            </div>
        </div>
    );
};

function Preview({ i, file, filesRef, setFileRef }) {
    console.log(file);
    if (!file) return null;
    let isImage, isVideo, url;

    url = URL.createObjectURL(file); // Create temporary URL using URL.createObjectURL

    // Determine file type based on mimeType or extension
    isImage = file.type.startsWith("image/");
    isVideo = file.type.startsWith("video/");

    return (
        <>
            <div className="slide flex-shrink-0 w-[55px] h-[60px] relative m-2 snap-center rounded-3xl">
                {isImage && (
                    <img
                        // onClick={handleClick}
                        src={url}
                        width={200}
                        height={"500px"}
                        className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                        alt={`Preview of post`}
                    />
                )}
                {isVideo && (
                    <video
                        // onClick={handleClick}
                        className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                        autoPlay
                        width={300}
                        height={240}
                        src={url}
                        alt={`Preview of Post`}
                    />
                )}
                {
                    <CloseIcon
                        sx={{
                            fontSize: "15px",
                            // height: '10px',
                            // width: '8px'
                            
                        }}
                        // style={{fontSize:'10px'}}
                        onClick={() => {
                            filesRef.splice(i, 1);
                            return setFileRef([...filesRef]);
                        }}
                        className=" absolute  right-0.5 top-2 hover:scale-125 rounded-full bg-bg-card text-white group cursor-pointer backdrop-blur-[2px]"
                    />
                }
            </div>
        </>
    );
}

export default SmallImageViewer;
