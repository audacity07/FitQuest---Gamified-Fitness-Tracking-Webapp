import Lottie from 'lottie-react'
import React, {  useState } from 'react'
import celebrate from "../../assets/celebrate.json"
import { getSelectedActivity, updateSelectedActivity } from '../../Redux/SelectedActivity/action';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../Redux/Users/action';
// const levels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const ActivityCard = ({ _id, activity, currentXP, currentLevel, totalDays }) => {
    const [barWidth, setBarWidth] = useState(currentXP || 0);
    const [streakCount, setStreakCount] = useState(totalDays || 0);
    const [currentCount, setCurrentCount] = useState(currentLevel || 0);
    const selectedActivities = useSelector(
        (store) => store.selectedactivityReducer.selectedactivity
    );

    const auth = useSelector((store) => store.authReducer);

    const [animationState, setAnimationState] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = (_id, barWidth, streakCount) => {
        setBarWidth((prev) => prev + 10);
        setStreakCount((prev) => prev + 1);
        let currentXP = barWidth + 10 > 100 ? 0 : barWidth + 10;
        let totalDays = streakCount + 1;
        let totalXP = auth.totalXP + currentXP;
        if (barWidth >= 100) {
            setCurrentCount((prev) => prev + 1);
            setAnimationState(true);
            setBarWidth(0);
            setTimeout(() => {
                setAnimationState(false);
            }, 4000);
            const updatedLevels = {
                currentXP,
                totalDays,
                currentLevel: currentCount + 1,
            };
            dispatch(updateSelectedActivity(_id, updatedLevels)).then((res) =>
                dispatch(getSelectedActivity())
            );
        } else {
            setCurrentCount((prev) => prev);
            const updatedLevels = {
                currentXP,
                totalDays,
                currentLevel: currentCount,
            };
            dispatch(updateSelectedActivity(_id, updatedLevels)).then((res) =>
                dispatch(getSelectedActivity())
            );
        }
        dispatch(updateUser(auth.userID, { totalXP }));
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
                    <div className='flex items-center gap-2 bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] mt-4 h-[160px] rounded-2xl'>
                        <div className='ml-1'>
                            <button onClick={() => handleButtonClick(_id, barWidth, streakCount)} className='text-6xl active:scale-[0.95] transition'>{activity.emoji}</button>
                        </div>
                        <div className='w-full'>
                            <div className='w-full'>
                                <p className='text-sm text-zinc-500 font-[rubik]'>Level {currentCount}<span className='bg-[#FCEDEA] ml-[0.5rem] py-1 px-2 rounded-md text-base'>🔥{streakCount}</span></p>
                                <p className='font-semibold mb-2 font-[rubik]'>{activity.name}</p>
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
    )
}