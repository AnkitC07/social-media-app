"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            const data = response.data;
            console.log("signup success", data);
            router.push("/login");
        } catch (error) {
            console.log("Signup Failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen flex-col bg-z">
            <div className="w-full max-w-md rounded-xl box-on-hover hover:bg-[#06141D] border ease-in-out duration-100 transform hover:-translate-y-3 hover:-translate-x-3 px-4 py-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Signup</h1>
                    {/* <p className="text-sm mt-1">Please login to continue</p> */}
                </div>

                <div className="flex flex-col justify-center items-end my-8 px-10">
                    <input
                        value={user.username}
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value });
                        }}
                        type="text"
                        placeholder="Username"
                        className="border-2 text-black border-black rounded-lg py-2.5 px-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <input
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                        type="email"
                        placeholder="Email"
                        className="border-2 text-black border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <input
                        value={user.password}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                        type="password"
                        placeholder="Password"
                        className="border-2 text-black border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />

                    <div className="flex justify-between w-full items-baseline">
                        <span>
                            Already have an account?{" "}
                            <Link href={"/login"} className="text-blue-500">
                                {" "}
                                Login
                            </Link>
                        </span>
                        <button
                            onClick={onSignup}
                            className="bg-black text-white rounded-lg px-4 py-2.5 mt-4 hover:bg-gray-800 input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
