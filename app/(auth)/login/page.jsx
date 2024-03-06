"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { PostContext } from "../../_context/Post";

const LoginPage = () => {
    const { setUserData,userData} = useContext(PostContext);
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [isLogin,loginState] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(isLogin){
            router.push("/");
        }
    },[isLogin,loading,userData])

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            setUserData(response.data.user);
            toast.success("Login Successfull");
            loginState(true)
        } catch (error) {
            console.log("Login Failed", error.message);
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen flex-col bg-z">
            <div className="w-full max-w-md rounded-xl box-on-hover hover:bg-[#06141D] border ease-in-out duration-100 transform hover:-translate-y-3 hover:-translate-x-3 px-4 py-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-sm mt-1">Please login toPage continue</p>
                </div>
                <div className="flex flex-col justify-center items-end my-8 px-10">
                    <input
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        className="border-2 border-black rounded-lg py-2.5 px-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        className="border-2 border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <div className="flex justify-between w-full items-baseline">
                        <span>
                            Do not have an account? {" "}
                            <Link  href={'/signup'} className="text-blue-500"> Signup</Link>
                        </span>

                        <button
                            onClick={onLogin}
                            className="bg-black text-white rounded-lg px-4 py-2.5 mt-4 hover:bg-gray-800 input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                        >

                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
