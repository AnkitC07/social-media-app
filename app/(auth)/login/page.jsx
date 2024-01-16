import React from "react";

const page = () => {
    return (
        <div className="flex justify-center items-center min-h-screen flex-col bg-z">
            <div className="w-full max-w-md rounded-xl box-on-hover hover:bg-[#06141D] border ease-in-out duration-100 transform hover:-translate-y-3 hover:-translate-x-3 px-4 py-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-sm mt-1">Please login to continue</p>
                </div>

                <div className="flex flex-col justify-center items-end my-8 px-10">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border-2 border-black rounded-lg py-2.5 px-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border-2 border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />

                    <button className="bg-black text-white rounded-lg px-4 py-2.5 mt-4 hover:bg-gray-800 input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
