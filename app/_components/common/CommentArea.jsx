import React, { useContext } from "react";
import Profile from "../common/Profile";
import formatTimeDifference from '../../functions/getTIme.js'
import { UserContext } from "../../_context/User";

const CommentArea = ({ commentModal, comment, setComment }) => {
    const { userData } = useContext(UserContext)
    console.log(commentModal)
    const handleChange = (e) => {
        setComment({
            text: e.target.value,
        });
    };

    const comments = (comment) => {
        console.log(comment)
        return (
            <div key={comment._id} className="flex items-start pt-4">
                        <div>
                            <Profile src={comment.user.avatar} w={60} h={100} />
                        </div>
                        <div className="ml-4 ">
                            <div className="mb-3 break-words">
                                <p className=" flex flex-wrap items-baseline  text-base font-medium leading-6 text-white">
                                    <span className="mr-2">{comment.user.fullName}</span>
                                    <span className="text-sm  leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                                        @{comment.user.username} . {formatTimeDifference(comment.createdAt)} 
                                    </span>
                                </p>
                                <p className=" ">{comment?.text}</p>
                            </div>
                            {/* <p className="text-sm leading-8 tracking-wide	">
                                <span className="text-gray-400 ">Replying to </span>
                                <span className="text-blue-600">
                                    @{commentModal.post.user.username}
                                </span>
                            </p> */}
                        </div>
                    </div>
        )
    }
    return (
        <div className="pt-4 sm:w-[40%] flex flex-col justify-end ">
            <div className="flex flex-col justify-end">
                {/* Comments */}
                <div className="flex flex-col divide-y divide-[#ffffff26] ml-4 overflow-y-auto max-h-[444px]">

                    {commentModal.post.replies.map((reply,idx)=>comments(reply))}
                </div>
                {/* Add comment */}
                <div className="flex items-start pl-4 pt-4  border-t border-[#ffffff26]">
                    <div>
                        <Profile
                            src={
                                userData.avatar
                            }
                            w={42}
                            h={100}
                        />
                    </div>
                    <div>
                        <textarea
                            // onClick={() => setOpenEmoji(false)}
                            onChange={handleChange}
                            value={comment?.text}
                            // cols="30"
                            placeholder="Post yout reply"
                            className="border-0 text-xl pt-1 w-full resize-none bg-transparent !focus-visible:!outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentArea;
