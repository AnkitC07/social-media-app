"use client";
import React, { useState } from "react";
import Card from "../common/Card";
import SuggestedUser from "../common/SuggestedUser";

const SuggestedUsers = () => {
    const [loading, setLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    return (
        <Card>
            <div className=" w-[300px] flex flex-col gap-8 py-4 px-8">
                <h2 className="font-bold text-lg">People you may know...</h2>
                <div className="flex flex-col gap-5">
                    {!loading && [0, 1].map((user) => <SuggestedUser key={user._id} user={user} />)}
                    {loading &&
                        [0, 1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                class="flex flex-row items-center justify-center h-full space-x-5 animate-pulse"
                            >
                                <div class="w-12 h-12 bg-gray-700 rounded-full "></div>
                                <div class="flex flex-col space-y-3">
                                    <div class="h-4 bg-gray-700 rounded-md w-20 "></div>
                                    <div class="w-16 h-4 bg-gray-700 rounded-md "></div>
                                </div>
                                <div>
                                    <div class="w-10 h-6 bg-gray-700 rounded-md "></div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Card>
    );
};

export default SuggestedUsers;
