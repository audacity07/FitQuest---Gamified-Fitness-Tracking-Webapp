import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { postUser } from '../Redux/Users/action';
import { Toaster, toast } from 'sonner'
const emoji = [
    "🏋️",
    "🏈",
    "🚴",
    "⚽",
    "🏸",
    "🏊‍♀️",
    "🏏",
    "🏑",
    "⛸",
    "🎮",
    "🤿",
    "🏀",
    "🏌️",
    "🏂️",
    "⚾️",
    "⛷️",
    "🚣",
    "🥏",
    "🤸",
    "🤾",
    "🏇",
    "🎳",
    "🏓",
    "⛸️",
    "🥊",
    "🏃️",
    "⛹️️",
    "🏊️️",
    "🏄️️",
    "🤽️️",
    "🤼️️",
    "🏐️️",
    "🎾️️",
    "🧘️",
];
export const Registration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [emojiIndex, setEmojiIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = () => {
        const newUser = {
            username,
            email,
            password
        }
        setTimeout(() => {
            dispatch(postUser(newUser)).then(() => navigate("/login"));
        }, 1000)
        toast.success("Registration successfull, Please login ! 🎉")
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setEmojiIndex((prevIndex) => (prevIndex + 1) % emoji.length);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
            <div
                className="flex justify-center items-center p-10"
            >
                <Toaster richColors position="top-right" />
                <div className="w-full">
                    <div className="text-center">
                        <span className="bg-white p-3 rounded-lg text-6xl">
                            {emoji[emojiIndex]}
                        </span>
                    </div>
                    <div className="relative mt-10 w-full md:w-[650px] m-auto">
                        <Link to={"/login"} className="absolute -top-28 -left-5 sm:left-0 text-2xl text-slate-700 cursor-pointer hover:-translate-x-1 transition"><BiArrowBack /></Link>
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
                                className="bg-orange-600 text-white py-3 font-medium rounded-lg hover:bg-black/9 0"
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
