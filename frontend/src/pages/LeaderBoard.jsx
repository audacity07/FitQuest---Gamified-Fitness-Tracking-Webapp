import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getUser } from '../Redux/Users/action';
import Header from "../components/Navbar"
import { getAllSelectedActivity, getSelectedActivity } from '../Redux/SelectedActivity/action';
import AdminUserCard from '../components/Admin/AdminUserCard';
import { getFriend, postFriend } from '../Redux/Friend/action';
export const LeaderBoard = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.authReducer.userData);
    const AllUsers = useSelector((store) => store.userReducer.allUsers);
    const allSelectedActivity = useSelector(
        (store) => store.selectedactivityReducer.allSelectedActivity
    );

    const [sortedvalue, setSortedvalue] = useState([]);
    AllUsers.sort((a, b) => b.totalXP - a.totalXP);
    const [sport, setSport] = useState("");

    const handleChange = (e) => {
        const newSport = e.target.value;
        setSport(newSport);

        let value = allSelectedActivity
            .filter((item) => item.activity.name.toLowerCase() === newSport)
            .sort((a, b) => b.currentXP - a.currentXP);
        setSortedvalue(value);
    };

    useEffect(() => {
        dispatch(getUser()).then(() => dispatch(getAllSelectedActivity()));
        // dispatch(getSelectedActivity());
    }, []);
    function handleFollow(id) {
        const obj = { friendId: id };
        dispatch(postFriend(obj)).then(() => getFriend());
    }
    return (
        <>
            <Header currentSection="Leaderboard" />
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
                    <div className='w-[90%] m-auto py-5'>
                        <div className='w-[95%] m-auto'>
                            <div className='text-center flex items-center justify-center'>
                                <div className="bg-white  min-w-full md:w-[90%] lg:w-[1000px] max-[425px]:overflow-scroll rounded-md py-3 px-3 shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
                                    <table className="w-full text-center">
                                        <thead>
                                            <tr>
                                                <th className="font-sans1 px-4 py-3 font-extrabold text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">S.No</th>
                                                <th className="font-sans1 px-4 py-3 font-extrabold text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">User Name</th>
                                                <th className="font-sans1 px-4 py-3 font-extrabold text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Total XP</th>
                                                <th className="font-sans1 px-4 py-3 font-extrabold text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Follow</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sport === "" &&
                                                AllUsers.map((item, i) => (
                                                    <tr>
                                                        <td className="text-gray-500 font-sans1 font-semibold">
                                                            {i + 1}
                                                        </td>
                                                        <td className="text-gray-500 text-center font-sans1 font-semibold">
                                                            {AllUsers.length > 0 && 
                                                                item !== null &&
                                                                item?.username[0].toUpperCase() +
                                                                item.username.slice(1) +
                                                                " " + 
                                                                (i === 0
                                                                    ? "🥇"
                                                                    : i === 1
                                                                        ? "🥈" 
                                                                        : i === 2
                                                                            ? "🥉"
                                                                            : "")
                                                            }
                                                        </td>
                                                        <td className="text-gray-500 text-center font-sans1 font-semibold">
                                                            {item.totalXP +
                                                                " " +
                                                                (i === 0
                                                                    ? "🔥"
                                                                    : i === 1
                                                                        ? "🔥"
                                                                        : i === 2
                                                                            ? "🔥"
                                                                            : "")}
                                                        </td>
                                                        <td className='py-2'>
                                                            <button
                                                                onClick={(e) => handleFollow(item._id)}
                                                                className={` font-semibold py-2 ${userData._id === item._id ? "bg-black/30 text-white cursor-not-allowed font-sans1" : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"} px-4 rounded-2xl`}
                                                            >
                                                                {userData._id === item._id ? "You" : "Follow"}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            {sport &&
                                                sortedvalue.length > 0 &&
                                                sortedvalue?.map((item, i) => (
                                                    <tr> 
                                                        <td className="text-gray-500 font-sans1 font-semibold">
                                                            {i + 1}
                                                        </td>
                                                        <td className="text-gray-500 text-center font-sans1 font-semibold">
                                                            {item.user !== null && item.user.username[0].toUpperCase() +
                                                                item.user.username.slice(1) +
                                                                " " +
                                                                (i === 0
                                                                    ? "🥇"
                                                                    : i === 1
                                                                        ? "🥈"
                                                                        : i === 2
                                                                            ? "🥉"
                                                                            : "")}
                                                        </td>
                                                        <td className="text-gray-500 text-center font-sans1 font-semibold">
                                                            {item.user.totalXP +
                                                                " " +
                                                                (i === 0
                                                                    ? "🔥"
                                                                    : i === 1
                                                                        ? "🔥"
                                                                        : i === 2
                                                                            ? "🔥"
                                                                            : "")}
                                                        </td>
                                                        <td className='py-2'>
                                                            <button
                                                                onClick={(e) => handleFollow(item.user._id)}
                                                                className={` font-semibold py-2 ${userData._id === item._id ? "bg-black/30 text-white cursor-not-allowed font-sans1" : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"} px-4 rounded-2xl`}
                                                            >
                                                                {userData._id === item._id ? "You" : "Follow"}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}