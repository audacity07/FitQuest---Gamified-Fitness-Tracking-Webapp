import Lottie from 'lottie-react'
import React, { useState } from 'react'
import celebrate from "../assets/celebrate.json"

export const ActivityCard = ({ _id, name, emoji, goalPerWeek }) => {
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
            <div className='flex justify-between items-start'>
                <div>
                    <div className='relative flex justify-center items-center w-[100%]'>
                        <div className='absolute w-[60%]'>
                            {animationState &&
                                <Lottie animationData={celebrate} />
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-10 w-[490px] h-[160px] rounded-2xl bg-white mt-4'>
                        <div className='ml-10'>
                            <button onClick={handleButtonClick} className='text-6xl active:scale-[0.95] transition'>🏋️</button>
                        </div>
                        <div className='w-full'>
                            <div className='w-full'>
                                <p className='text-sm text-zinc-500 font-[rubik]'>Level 1 <span className='bg-[#FCEDEA] py-1 px-2 rounded-md text-base'>🔥{streakCount}</span></p>
                                <p className='font-semibold mb-2 font-[rubik]'>Metal Lifter</p>
                                <div className={`relative z-[5] bg-[#D6D8DB] h-[20px] w-[90%] rounded-full text-xs flex items-center pl-2 font-[rubik] overflow-hidden ${barWidth > 15 && "text-white"} transition`}>
                                    XP {barWidth} / 10
                                    <div className={`absolute bg-red-500 h-[20px] w-[${barWidth}%] -z-10 rounded-full -ml-2 transition-all duration-700`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
