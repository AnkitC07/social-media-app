"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import  { PostContext } from "../../_context/Post";

const LoginPage = () => {
    const { setUserData,userData} = useContext(PostContext);
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login Successfull");
            // setUserData(response.data?.user)
            router.push("/");
        } catch (error) {
            console.log("Login Failed", error.message);
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center fixed inset-x-0 top-0 h-screen justify-center bg-z">
            <div className="w-full max-w-md rounded-xl box-on-hover hover:bg-[#06141D] border ease-in-out duration-100 transform hover:-translate-y-3 hover:-translate-x-3 px-4 py-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    {/* <p className="text-sm mt-1">Please login to continue</p> */}
                </div>
                <div className="flex flex-col justify-center items-end my-8 px-10">
                    <input
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        className="border-2 text-black border-black rounded-lg py-2.5 px-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        className="border-2 text-black border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                    />
                    <div className="flex justify-between w-full items-baseline">
                        <span>
                            Do not have an account? {" "}
                            <Link  href={'/signup'} className="text-blue-500"> Signup</Link>
                        </span>

                        <button
                            onClick={onLogin}
                            className="flex items-center bg-black text-white rounded-lg px-4 py-2.5 mt-4 hover:bg-gray-800 input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5"
                        >
                            {loading ? (
                                        <>
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                                        "Login"
                                    )}
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
