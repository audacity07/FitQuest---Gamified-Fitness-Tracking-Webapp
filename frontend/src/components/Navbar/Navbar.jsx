import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { MobileNavLink } from '../MobileNavLink';



const navLinks = [
    { title: "personal training", href: "/", dataText: "personal training" },
    { title: "duo training", href: "/", dataText: "duo training" },
    { title: "fitlab for her", href: "/", dataText: "fitlab for her" },
    { title: "business", href: "/", dataText: "business" },
    { title: "yoga", href: "/", dataText: "yoga" },
    { title: "fitlab at home", href: "/user-board", dataText: "fitlab at home" },
]
export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(prevOpen => !prevOpen)
    }
    const menuVars = {
        initial: {
            x: "-250vh",
        },
        animate: {
            x: 1,
            transition: {
                duration: 1

            }
        },
        exit: {
            x: "-250vh",
            transition: {
                delay: 0.6,
                duration: 1

            }
        }
    }
    const containerVars = {
        initial: {
            transition: {
                staggerChildren: 0.09,
            },
        },
        open: {
            transition: {
                delayChildren: 0.6,
                staggerChildren: 0.09
            }
        }
    }
    return (
        <header>
            <nav className='flex justify-between items-center p-10 fixed top-0 left-0 w-full z-10'>
                <div className='flex items-center gap-[5rem]'>
                    <div
                        className='cursor-pointer text-md text-white z-10'
                        onClick={toggleMenu}
                    >
                        Menu
                    </div>
                    <div className='flex items-center gap-2 z-[21]'>
                        <div className='w-5 h-5 bg-yellow-400 rounded-full'>
                        </div>
                        <span >
                            fitlab
                        </span>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {
                    open &&
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className='fixed z-20 left-0 top-0 w-[50%] h-screen bg-[#183330] text-white p-10'>
                        <div className='flex h-full flex-col'>
                            <div className='flex justify-between'>
                                <p className='cursor-pointer text-base text-white' onClick={toggleMenu}>Close</p>
                            </div>
                            <motion.div
                                variants={containerVars}
                                initial="initial"
                                animate="open"
                                exit="initial"
                                className='flex flex-col h-full gap-5 mt-20'>
                                {
                                    navLinks.map((link, index) => {
                                        return (
                                            <div className='overflow-hidden'>
                                                <MobileNavLink
                                                    key={index}
                                                    title={link.title}
                                                    href={link.href}
                                                    dataText={link.dataText}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </motion.div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </header>
    )
}






