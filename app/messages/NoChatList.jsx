import React from "react";

const NoChatList = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
                <svg
                    className="w-12 h-12 mx-auto mb-2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v-4m0 16v-4m0 8c7.761 0 14-6.239 14-14S19.761 0 12 0C4.239 0 0 4.239 0 12s4.239 14 12 14z"
                    />
                </svg>
                <p className="text-gray-700 text-center font-medium">No Chat Messages Yet</p>
            </div>
        </div>
    );
};

export default NoChatList;
