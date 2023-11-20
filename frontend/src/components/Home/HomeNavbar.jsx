import React from "react";
import { Link } from "react-router-dom";

export const HomeNavbar = () => {
    return (
        <div className='flex justify-between items-center pl-3 sm:px-3 sm:pl-5 md:px-32 py-6 bg-[#EFEFEF]'>
            <div className='flex items-center gap-2'>
                <p className='text-4xl bg-white px-[1px] py-[5px] rounded-2xl shadow-xl cursor-default'>🏋🏼‍♂️</p>
                <h1 className='text-lg text-zinc-700 font-semibold font-[rubik]'> FitQuest</h1>
            </div>
            <div>
                <Link to='/login' className='text-zinc-700 font-semibold py-3 px-5 rounded-md hover:bg-[#d5d5d6] transition font-[rubik]'>LOGIN</Link>
                <Link to='/register' className='text-zinc-700 font-semibold py-3 px-5 rounded-md hover:bg-[#d5d5d6] transition font-[rubik]'>SIGN UP</Link>
            </div>
        </div>
    )
}
