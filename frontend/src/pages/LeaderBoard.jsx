import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getUser } from '../Redux/Users/action';
import Header from "../components/Header"
import { getSelectedActivity } from '../Redux/SelectedActivity/action';
export const LeaderBoard = () => {
    const dispatch = useDispatch()
    const AllUsers = useSelector((store) => store.userReducer.users);
    const selectedactivity = useSelector((store) => store.selectedactivityReducer.selectedactivity);
    const [sortedvalue, setSortedvalue] = useState([])
    AllUsers.sort((a, b) => b.totalXP - a.totalXP);
    const [sport, setSport] = useState("");
    const handleChange = (e) => {
        const newSport = e.target.value;
        setSport(newSport);

        let value = selectedactivity
            .filter(item => item.activity.name.toLowerCase() === newSport)
        // .sort((a, b) => b.currentXP - a.currentXP);
        setSortedvalue(value);
    }
    console.log(sortedvalue, "value")
    useEffect(() => {
        dispatch(getUser)
        dispatch(getSelectedActivity())
    }, [])
    return (
        <>
            <Header currentSection="Leaderboard"/>
            <div className='flex justify-center items-center mb-20'>
                <div className='w-full'>
                    <div className='mt-28 mb-10 text-center'>
                        <select value={sport} className='px-10 py-5' onChange={handleChange}>
                            <option value="">----Top Sports----</option>
                            <option value="gym">🏋️ - Gym</option>
                            <option value="cycling">🚴🏼 - Cycling</option>
                            <option value="karate">🥋 - Karate</option>
                            <option value="football">⚽ - Football</option>
                        </select>
                    </div>
                    <div className='w-[70%] m-auto py-5'>
                        <div className='w-[95%] m-auto'>
                            <div className='shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white py-3 rounded-2xl flex items-center justify-between px-4'>
                                <p className='py-2  text-xl font-[rubik] text-slate-600'>S.No</p>
                                <p className=' text-xl font-[rubik] text-slate-600'>User Name</p>
                                <p className=' text-xl font-[rubik] text-slate-600'>Total XP</p>
                            </div>
                            <div className='text-center mt-4'>
                                {
                                    sport === "" &&
                                    AllUsers?.map((user, i) => (
                                        <div key={user._id} className={`w-full flex justify-between items-center my-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white py-1 rounded-2xl px-6`}>
                                            <p className='py-3 font-medium '>{i + 1}.</p>
                                            <p className='font-medium '>{user?.username[0].toUpperCase() + user.username.slice(1)}</p>
                                            <p className='font-medium '>{user.totalXP}</p>
                                        </div>
                                    ))
                                }
                                {
                                    sport &&
                                    sortedvalue?.map((user, i) => (
                                        <div key={user._id} className={`w-full flex justify-between items-center my-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] bg-white py-1 rounded-2xl px-6`}>
                                            <p className='py-3 font-medium '>{i + 1}.</p>
                                            <p className='font-medium '>{user?.username[0].toUpperCase() + user.username.slice(1)}</p>
                                            <p className='font-medium '>{user.totalXP}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
