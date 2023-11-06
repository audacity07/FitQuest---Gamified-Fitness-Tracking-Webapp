"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"

const links = [
  {
    name: "Activity",
    link: "/user-activity",
  },
  {
    name: "Challenge",
    link: "/challenge",
  },
  {
    name: "Notification",
    link: "/notification",
  },
  {
    name: "Leaderboard",
    link: "/leaderboard",
  },
];

export default function Header() {
    const [activeSection, setActiveSection] = useState("Home");
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.clear();
        navigate("/");
    }
    return (
        <header className='z-[999] relative'>
            <motion.div className='fixed top-0 left-1/2  h-[3rem] w-full rounded-none border-white border-opacity-40 bg-white bg-opacity-60 backdrop-blur-[0.5rem] sm:top-6 sm:w-[40rem] sm:rounded-full'
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
            ></motion.div>
            <nav className='flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0'>
                <ul className='flex flex-wrap w-[22rem] items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial]  sm:flex-nowrap sm:gap-10'>
                    {links.map(link => (
                        <motion.li className='h-3/4 flex items-center justify-center relative'
                            key={link.hash}
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Link
                                className={`flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition`}
                                to={link.link}
                                onClick={() => setActiveSection(link.name)}
                            >
                                {link.name}
                                {link.name === activeSection &&
                                    <motion.span
                                        layoutId='activeSection'
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 50
                                        }}
                                        className='bg-orange-100 rounded-full absolute inset-0 -z-10'></motion.span>
                                }
                            </Link>
                        </motion.li>
                    ))}
                    <button onClick={handleLogout} className='-mt-1 py-3 hover:text-gray-950 transition'>Logout</button>
                </ul>
            </nav>
        </header>
    )
}
