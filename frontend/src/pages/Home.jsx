import React, { useState } from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import Lottie from "lottie-react";
import downCurvedArrow from "../assets/curved-arrow.json";
import celebrate from "../assets/celebrate.json";
import featureVideo from "../assets/feature1.mp4"
import feature2 from "../assets/feature2.webp"
import feature3 from "../assets/feature3.webp"
import { Link } from "react-router-dom";

export const Home = () => {
    const [barWidth, setBarWidth] = useState(0);
    const [streakCount, setStreakCount] = useState(0);
    const [animationState, setAnimationState] = useState(false);

    const handleButtonClick = () => {
        setBarWidth(prev => prev + 10)
        setStreakCount(prev => prev + 1)
        if (streakCount >= 9) {
            setStreakCount(0)
        }
        if (barWidth >= 90) {
            setAnimationState(true);
            setBarWidth(0);
            setTimeout(() => {
                setAnimationState(false);
            }, 4000)
        }
    };
    return (
        <div>
            <HomeNavbar />
            <section className='bg-[#EFEFEF] py-20'>
                <div className='w-[82%] m-auto'>
                    <div className='flex flex-col lg:flex-row justify-between items-center gap-40'>
                        <div>
                            <h1 className='text-6xl font-extrabold text-slate-700 font-sans2'>Gamify your <br />fitness</h1>
                            <p className='text-xl text-zinc-600 font-[rubik] mt-5 lg:mt-7'>Track your workouts to level up your avatars and climb leaderboards!</p>
                        </div>
                        <div className="relative w-full sm:w-[initial]">
                            <span className='absolute -scale-x-100 rotate-90 ml-20 -mt-1'>
                                <Lottie animationData={downCurvedArrow} />
                            </span>
                            <span className='absolute ml-32 -mt-2'> tap to grow</span>
                            <div className='flex items-center gap-1 sm:gap-10 w-full sm:w-[490px] h-[160px] rounded-2xl bg-white mt-4'>
                                <div className='ml-1 sm:ml-10'>
                                    <button onClick={handleButtonClick} className='text-6xl active:scale-[0.95] transition'>🏋️</button>
                                </div>
                                <div className='w-full'>
                                    <div className='w-full'>
                                        <p className='text-sm text-zinc-500 font-[rubik]'>Level 1 <span className='bg-[#FCEDEA] py-1 px-2 rounded-md text-base'>🔥{streakCount}</span></p>
                                        <p className='font-semibold mb-2 font-[rubik]'>Metal Lifter</p>
                                        <div className={`relative z-[5] bg-[#D6D8DB] h-[20px] w-[90%] rounded-full text-xs flex items-center pl-2 font-[rubik] overflow-hidden ${barWidth > 15 && "text-white"} transition`}>
                                            XP {barWidth} / 100
                                            <div style={{width:`${barWidth}%`}} className={`absolute bg-red-500 h-[20px] -z-10 rounded-full -ml-2 transition-all duration-700`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative flex justify-center items-center w-[100%]'>
                    <div className='absolute w-[40%]'>
                        {animationState &&
                            <Lottie animationData={celebrate} />
                        }
                    </div>
                </div>
            </section>

            <section className='py-20 pt-40 bg-[#EFEFEF]'>
                <div className='text-center'>
                    <h1 className='font-[rubik] text-5xl font-bold mb-2 text-slate-700'>Exercising consistently is hard</h1>
                    <p className='font-[rubik] text-xl text-zinc-600 px-5'>80% of New Year's resolutions fail in 2 months...</p>
                </div>
                <div className='flex flex-col md:flex-row flex-wrap justify-center gap-10 px-5 mt-20'>
                    <div className='bg-white p-10 rounded-2xl min-w-[25%]'>
                        <p className='text-6xl mb-6'>🎯</p>
                        <h3 className='text-xl font-bold text-slate-700 font-[rubik] mb-2'>Set a goal</h3>
                        <p className='text-base font-[rubik] text-zinc-500'>"I want to lose weight"</p>
                        <p className='text-base font-[rubik] text-zinc-500'>"I want to go gym 3x a week"</p>
                    </div>
                    <div className='bg-white p-10 rounded-2xl min-w-[25%]'>
                        <p className='text-6xl mb-6'>🏃</p>
                        <h3 className='text-xl font-bold text-slate-700 font-[rubik] mb-2'>Try your best</h3>
                        <p className='text-base font-[rubik] text-zinc-500'>Buy new shoes</p>
                        <p className='text-base font-[rubik] text-zinc-500'>Get gym membership</p>
                    </div>
                    <div className='bg-white p-10 rounded-2xl min-w-[25%]'>
                        <p className='text-6xl mb-6'>🤦</p>
                        <h3 className='text-xl font-bold text-slate-700 font-[rubik] mb-2'>But life doesn't change...</h3>
                        <p className='text-base font-[rubik] text-zinc-500'>“I'm not motivated”</p>
                        <p className='text-base font-[rubik] text-zinc-500'>“I forget my new habit”</p>
                    </div>
                </div>
            </section>

            <section className="bg-[#EFEFEF] py-20 px-5">
                <div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="">
                            <video className="rounded-2xl border border-gray-300 w-96" src={featureVideo} autoPlay muted loop />
                        </div>
                        <div className="md:w-[45%] lg:w-[32%]">
                            <h3 className="font-[rubik] text-orange-600 text-lg font-semibold">GAMIFICATION</h3>
                            <h1 className="font-[rubik] text-slate-700 text-4xl font-bold my-7">Make workouts fun</h1>
                            <p className="font-[rubik] text-zinc-500">Choose your workout avatars 🧘 amongst 37 characters.
                                Track your progress to gain XP and level them up!</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 my-20">
                        <div className="">
                            <img className="rounded-2xl border border-gray-300 w-96" src={feature2} />
                        </div>
                        <div className="md:w-[45%] lg:w-[32%]">
                            <h3 className="font-[rubik] text-orange-600 text-lg font-semibold">FOMO</h3>
                            <h1 className="font-[rubik] text-slate-700 text-4xl font-bold my-7">Never miss your goal</h1>
                            <p className="font-[rubik] text-zinc-500">If you don't stick to your goal, your avatar loses XP and shrinks...<br />
                                A good reason to put on your workout shoes!</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="">
                            <img className="rounded-2xl border border-gray-300 w-96" src={feature3} />
                        </div>
                        <div className="md:w-[45%] lg:w-[32%]">
                            <h3 className="font-[rubik] text-orange-600 text-lg font-semibold">SOCIAL ACCOUNTABILITY</h3>
                            <h1 className="font-[rubik] text-slate-700 text-4xl font-bold my-7">Climb leaderboards</h1>
                            <p className="font-[rubik] text-zinc-500">The more XP you earn, the higher you rank in your league. Get that 🥇 golden medal!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="register" className="text-center py-20 bg-[#EFEFEF] px-5">
                <h1 className="text-5xl text-slate-700 font-bold font-[rubik]">You're a hero!</h1>
                <div className="mt-10 bg-white inline-block py-5 w-full md:w-[700px] rounded-3xl">
                    <p className="text-lg text-zinc-600 px-3">Sign up for free and grow your avatar!</p>
                    <div className="mt-10 mb-2">
                        <Link to={"/register"} className="text-white bg-orange-600 rounded py-3 px-3 font-[rubik] font-medium">GET MY AVATAR NOW</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
