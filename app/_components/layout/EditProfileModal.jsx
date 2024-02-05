"use client";
import React, { useState } from "react";

const EditProfileModal = ({ onClose }) => {
    const [editFormData, setEditFormData] = useState({
        username: "",
        name: "",
        bio: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(editFormData)
        // Add your logic to save changes or update the profile
        // You can access the updated data using formData state
    };

    return (
        <div className="fixed z-1 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 backdrop-blur-lg transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 opacity-25"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-1B2730 px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-white">Edit Profile</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-300">Update your profile information.</p>
                    </div>
                    <div className="bg-1B2730 px-4 pb-4 sm:p-6 sm:pb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-white">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={editFormData.username}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full  bg-[#28343E]  rounded bg-1B2730 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full  bg-[#28343E]  rounded bg-1B2730 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bio" className="block text-sm font-medium text-white">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={editFormData.bio}
                                    onChange={handleChange}
                                    rows="3"
                                    className="mt-1 p-2 w-full  bg-[#28343E]  rounded bg-1B2730 text-white resize-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-1B2730 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-1B2730 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
