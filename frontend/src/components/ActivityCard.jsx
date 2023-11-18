import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import celebrate from "../assets/celebrate.json"
import { getSelectedActivity, updateSelectedActivity } from '../Redux/SelectedActivity/action';
import { useDispatch, useSelector } from "react-redux";
// const levels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const ActivityCard = ({ _id, activity, currentXP, currentLevel, totalDays, totalXP }) => {
    const [barWidth, setBarWidth] = useState(currentXP || 0);
    const [streakCount, setStreakCount] = useState(totalDays || 0);
    const [currentCount, setCurrentCount] = useState(currentLevel || 0);
    const selectedActivities = useSelector((store) => store.selectedactivityReducer.selectedactivity);

    const [animationState, setAnimationState] = useState(false);
    const dispatch = useDispatch()


    const handleButtonClick = (_id, barWidth, streakCount) => {
        setBarWidth(prev => prev + 10)
        setStreakCount(prev => prev + 1)
        if (barWidth >= 100) {
            setAnimationState(true);
            setBarWidth(0);
            setTimeout(() => {
                setAnimationState(false);
            }, 4000);
            const updatedLevels = {
                currentXP: barWidth + 10 > 100 ? 0 : barWidth + 10,
                totalDays: streakCount + 1,
                totalXP: totalXP + currentXP,
                currentLevel: currentLevel + 1,
            };
            setCurrentCount(prev => prev + 1);
            dispatch(updateSelectedActivity(_id, updatedLevels)).then((res) => (
                dispatch(getSelectedActivity())
            ));

        } else {
            const updatedLevels = {
                currentXP: barWidth + 10 > 100 ? 0 : barWidth + 10,
                totalDays: streakCount + 1,
                currentLevel: currentLevel,
            };
            setCurrentCount(prev => prev);
            dispatch(updateSelectedActivity(_id, updatedLevels)).then((res) => (
                dispatch(getSelectedActivity())
            ));

        }
    };
    return (
        <div>
            <div className='w-full flex justify-between items-start'>
                <div className='w-full'>
                    <div className='relative flex justify-center items-center w-[100%]'>
                        <div className='absolute w-[100%]'>
                            {animationState &&
                                <Lottie animationData={celebrate} />
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-2 bg-white mt-4 h-[160px] rounded-2xl'>
                        <div className='ml-1'>
                            <button onClick={() => handleButtonClick(_id, barWidth, streakCount)} className='text-6xl active:scale-[0.95] transition'>{activity.emoji}</button>
                        </div>
                        <div className='w-full'>
                            <div className='w-full'>
                                <p className='text-sm text-zinc-500 font-[rubik]'>Level {currentCount}<span className='bg-[#FCEDEA] ml-[0.5rem] py-1 px-2 rounded-md text-base'>🔥{streakCount}</span></p>
                                <p className='font-semibold mb-2 font-[rubik]'>{activity.name}</p>
                                <div className={`relative z-[5] bg-[#D6D8DB] h-[20px] w-[90%] rounded-full text-xs flex items-center pl-2 font-[rubik] overflow-hidden ${barWidth > 15 && "text-white"} transition`}>
                                    XP {barWidth} / 100
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
