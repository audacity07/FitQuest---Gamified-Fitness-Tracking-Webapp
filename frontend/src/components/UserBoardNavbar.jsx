import React from "react";
import { Link } from "react-router-dom";

export const UserBoardNavbar = () => {
    return (
        <div className='flex justify-between items-center px-10 md:px-32 py-6 bg-[#EFEFEF]'>
            <div className='flex items-center gap-2'>
                <p className='text-4xl bg-white px-[1px] py-[5px] rounded-2xl shadow-xl cursor-default'>🏋🏼‍♂️</p>
                <h1 className='text-lg text-zinc-700 font-semibold font-[rubik]'> FitQuest</h1>
            </div>
            <div>
                <Link to='/login' className='text-zinc-700 font-semibold py-3 px-5 rounded-md hover:bg-[#d5d5d6] transition font-[rubik]'>LOGIN</Link>
            </div>
        </div>
    )
}
