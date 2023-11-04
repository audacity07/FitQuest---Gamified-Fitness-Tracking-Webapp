import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"
import { getActivity } from '../Redux/Activity/action';
const goal = ["1x", '2x', '3x', '4x', '5x', '6x', '7x'];
export const AvatarSelect = () => {
    const [goalBorder, setgoalBorder] = useState(0);
    const activities = useSelector((store) => store.activityReducer.activity);
    const [selectAvatar, setSeletecAvatar] = useState("")
    const dispatch = useDispatch()

    const handleSeletecEmoji = (activitie) => {
        setSeletecAvatar(activitie)
    }
    const handleSubmitAvatar = () => {
        const newAvatar = {
            selectAvatar,
            goalBorder: goalBorder + 1

        }
        console.log(newAvatar)
    }
    useEffect(() => {
        dispatch(getActivity())
    }, [])

    return (
        <div className='bg-[#EFEFEF] py-5 pb-28'>
            <section className='flex justify-center items-center'>
                <div className='w-[39%]'>
                    <h1 className='text-4xl font-extrabold font-[rubik] text-slate-700'>Create a sport avatar</h1>
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
                        <button onClick={handleSubmitAvatar} className='bg-[#EA5234] w-full py-3 rounded-lg text-white font-bold hover:bg-[#c04127] transition'>CREATE AVARAT</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
