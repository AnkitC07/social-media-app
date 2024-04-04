
import React, { useState } from "react";
import Card from "../common/Card";
import SuggestedUser from "../common/SuggestedUser";

const SuggestedUsers = ({ suggestedUsers, loading, style }) => {
    return (
        <Card style={style}>
            <div className={"max-w-[300px] w-full flex flex-col gap-6 py-3 px-5 "}>
                <h2 className="font-bold text-lg">People you may know...</h2>
                <div className="flex flex-col gap-5">
                    {console.log(loading,suggestedUsers)}
                    {/* {!loading && suggestedUsers.length > 0 ? (
                        suggestedUsers?.map((user, i) => <SuggestedUser key={i} user={user} />)
                    ) : (
                        <div className="py-4 pt-0 text-center text-gray-500">No more people to suggest.</div>
                    )} */}
                    {loading ? (
                        [0, 1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse"
                            >
                                <div className="w-12 h-12 bg-gray-700 rounded-full "></div>
                                <div className="flex flex-col space-y-3">
                                    <div className="h-4 bg-gray-700 rounded-md w-20 "></div>
                                    <div className="w-16 h-4 bg-gray-700 rounded-md "></div>
                                </div>
                                <div>
                                    <div className="w-10 h-6 bg-gray-700 rounded-md "></div>
                                </div>
                            </div>
                        ))
                    ) : suggestedUsers && suggestedUsers.length > 0 ? (
                        suggestedUsers?.map((user, i) => <SuggestedUser key={i} user={user} />)
                    ) : (
                        <div className="py-4 pt-0 text-center text-gray-500">No more people to suggest.</div>
                    )}

                </div>
            </div>
        </Card>
    );
};

export default SuggestedUsers;
