"use client";
import React, { useState } from "react";
import { convertBase64 } from "../../functions/convertBase64.js";
import { compressImage } from "../../functions/compressImage.js";

const EditProfileModal = ({ onClose, handleSubmit, editFormData, setEditFormData, loading }) => {
    const [disable,setDisable] = useState(false)
    const handleChange = async (e) => {
        setDisable(true)
        const { name, value, type } = e.target;

        // If the input is a file input, update the state with the file itself
        if (type === "file") {
            const base64file = await convertBase64(e.target.files[0]);
            const compressedImage = await compressImage(e.target.files[0], base64file);
            setEditFormData((prevData) => ({
                ...prevData,
                [name]: compressedImage,
            }));
        } else {
            // Otherwise, update the state with the input value
            setEditFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        setDisable(false)
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
                        <form onSubmit={(e) => handleSubmit(e, editFormData)}>
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
                                    // required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-white">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full  bg-[#28343E]  rounded bg-1B2730 text-white"
                                    // required
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
                            <div className="mb-4">
                                <label htmlFor="avatar" className="block text-sm font-medium text-white">
                                    Avatar Image
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded bg-1B2730 text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="banner" className="block text-sm font-medium text-white">
                                    Profile Banner Image
                                </label>
                                <input
                                    type="file"
                                    id="banner"
                                    name="banner"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded bg-1B2730 text-white"
                                />
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
                                    disabled={disable}
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-1B2730 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                                        "Save Changes"
                                    )}
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
