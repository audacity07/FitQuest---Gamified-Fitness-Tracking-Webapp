import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { postUser } from '../Redux/Users/action';

export const Registration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const handleRegister = () => {
        const newUser = {
            username,
            email,
            password
        }
        dispatch(postUser(newUser));
    }
    return (
        <>
            <div
                className="flex justify-center items-center p-10"
            >
                <div className="relative w-full">
                    <Link to={"/"} className="absolute sm:left-[1%] lg:left-[15%] text-2xl text-slate-700 cursor-pointer hover:-translate-x-1 transition"><BiArrowBack /></Link>
                    <div className="mt-10 w-full md:w-full lg:w-[760px] m-auto">
                        <h2 className="text-center font-[rubik] mb-10 text-4xl font-extrabold text-slate-700">Welcome to FitQuest!</h2>
                        <div className="flex flex-col gap-10">
                            <input
                                className="w-full px-2 py-3 rounded-lg outline-orange-200"
                                onChange={(e) => setUsername(e.target.value)}
                                type="email"
                                name=""
                                placeholder="username"
                                value={username}
                            />
                            <input
                                className="w-full px-2 py-3 rounded-lg outline-orange-200"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name=""
                                placeholder="email@gmail.com"
                                value={email}
                            />
                            <input
                                className="w-full px-2 py-3 rounded-lg outline-orange-200"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name=""
                                placeholder="password"
                                value={password}
                            />
                            <button
                                onClick={handleRegister}
                                className="bg-black text-white py-3 font-medium rounded-lg hover:bg-black/9 0"
                            >
                                {isLoading ? "Loading..." : "REGISTER"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
