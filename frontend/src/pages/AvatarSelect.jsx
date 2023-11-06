import React, { useEffect, useState } from 'react';
import { AiFillPlusCircle } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import "../App.css"
import { getActivity } from '../Redux/Activity/action';
import { ActivityCard } from '../components/ActivityCard';
import { getSelectedActivity, postSelectedActivity } from '../Redux/SelectedActivity/action';
import { getUser } from '../Redux/Users/action';
import Header from '../components/Header';
const goal = ["1x", '2x', '3x', '4x', '5x', '6x', '7x'];
export const AvatarSelect = () => {
    const [open, setOpen] = useState(false);
    const [goalBorder, setgoalBorder] = useState(0);
    const activities = useSelector((store) => store.activityReducer.activity);
    const selectedActivities = useSelector((store) => store.selectedactivityReducer.selectedactivity);
    const userID = useSelector(store => store.authReducer.userID)
    const allUser = useSelector(store => store.userReducer.users)
    const [selectAvatar, setSeletecAvatar] = useState("");
    const [allActivities, setAllActivities] = useState([]);


    const dispatch = useDispatch();

    const handleSeletecEmoji = (activitie) => {
        setSeletecAvatar(activitie)
    }
    const handleSubmitAvatar = (selectAvatar) => {
        const newActivity = {
            activity: selectAvatar._id,
            goalPerWeek: goalBorder + 1,
            date: Date.now().toString()
        }

        dispatch(postSelectedActivity(newActivity)).then((res) => (
            dispatch(getSelectedActivity())
        ))
        console.log(newActivity)
    }
    const toggleMenu = () => {
        setOpen(prev => !prev)
    }

    useEffect(() => {
        dispatch(getActivity())
        dispatch(getSelectedActivity())
        dispatch(getUser)
    }, [])
    return (
        <>
            <Header/>
            <div className='bg-[#EFEFEF] py-5 pb-28 pt-28'>
                <section className='flex justify-center items-start gap-10 '>
                    <AnimatePresence>
                        {
                            open &&

                            <motion.div
                                initial={{ opacity: 0, x: -200 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -800 }}
                                className={`w-[40%]`}>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-4xl font-extrabold font-[rubik] text-slate-700'>Create a sport avatar</h1>
                                    <span onClick={toggleMenu} className='text-2xl text-slate-700 cursor-pointer hover:-translate-x-1 transition'><BiArrowBack /></span>
                                </div>
                                <div className={`avatarSectionScrollBar w-[100%] overflow-y-auto`}>
                                    <div className='mt-10 grid grid-rows-3 grid-flow-col gap-3 my-2 '>
                                        {activities &&
                                            activities?.map((activitie) => (
                                                <span key={activitie._id} onClick={() => handleSeletecEmoji(activitie)} className={`text-4xl bg-[#E6E8EA] p-4 rounded-2xl cursor-pointer border-2 ${activitie._id === selectAvatar._id && "border-[#EA5234]"} `}>{activitie.emoji}</span>
                                            ))}
                                    </div>
                                </div>
                                <div className='my-5'>
                                    <p className='text-sm text-zinc-500 font-[rubik] mb-2'>Avatar name</p>
                                    <span className={`text-zinc-300 ${selectAvatar.name && "text-zinc-800 font-semibold"}`}>{selectAvatar.name || "Your Avatar Name"}</span>
                                </div>
                                <div>
                                    <p className='text-sm text-zinc-500 font-[rubik] mb-2'>Goal per week</p>
                                    <div className='flex gap-3'>
                                        {goal.map((level, i) => (
                                            <span key={i} onClick={() => setgoalBorder(i)} className={`flex justify-center items-center bg-white w-[70px] h-[70px] cursor-pointer rounded-full text-lg font-medium border-2 ${i === goalBorder && "border-[#EA5234]"}`}>{level}</span>
                                        ))}
                                    </div>
                                    <p className='text-sm text-zinc-500 font-[rubik] my-2 mb-4'>33 XP completion. Up to 100 XP a week</p>
                                </div>
                                <div className='text-center'>
                                    <button onClick={() => handleSubmitAvatar(selectAvatar)} className='bg-[#EA5234] w-full py-3 rounded-lg text-white font-bold hover:bg-[#c04127] transition'>CREATE AVARAT</button>
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                    <div div className={`w-[490px] ${selectedActivities.length < 2 && "h-[80vh]"} flex flex-col gap-5 justify-center items-center`}>
                        <div className='w-full flex flex-col justify-between items-center'>
                            <div className='w-full flex justify-between items-center'>
                                <div>
                                    <h3 className='text-base font-[rubik] text-zinc-500'>Hello, </h3>
                                    <p className='text-base font-bold font-[rubik] text-slate-700'>You're a hero!</p>
                                </div>
                                <div>
                                    <img className='rounded-full' src="https://placehold.co/40x40/png" alt="" />
                                </div>
                            </div>
                            <div>
                                {
                                    selectedActivities &&
                                    selectedActivities?.map((activitie) => (
                                        <ActivityCard key={activitie._id} {...activitie} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className='w-full'>
                            <button onClick={toggleMenu} className='group hover:bg-orange-600 bg-white w-full flex flex-col gap-10 justify-center items-center p-6 rounded-2xl transition duration-300 mt-10'>
                                <span className='text-2xl group-hover:text-white transition duration-300'><AiFillPlusCircle /></span>
                                <p className='font-semibold font-[rubik] group-hover:text-white transition duration-300'>ADD SPORT AVATAR</p>
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
