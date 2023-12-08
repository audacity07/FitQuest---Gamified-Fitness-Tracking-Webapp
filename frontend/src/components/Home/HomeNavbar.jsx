import React from "react";
import { Link } from "react-router-dom";

export const HomeNavbar = () => {
  return (
    <div className="flex justify-between items-center  sm:px-3 sm:pl-5 md:px-32 py-6 px-3 bg-[#EFEFEF]">
      <div className="flex items-center gap-2">
        <p className="text-3xl min-[375px]:text-4xl bg-white px-[1px] py-[5px] rounded-2xl shadow-xl cursor-default">
          🏋🏼‍♂️
        </p>
        <h1 className="text-base min-[375px]:text-lg text-zinc-700 font-semibold font-sans2">
          {" "}
          FitQuest
        </h1>
      </div>
      <div>
        <Link
          to="/login"
          className="text-zinc-700 font-semibold py-1 px-2 min-[375px]:py-3 min-[375px]:px-4 rounded-md hover:bg-[#d5d5d6] transition text-sm min-[375px]:text-base font-sans2"
        >
          LOGIN
        </Link>
        <Link
          to="/register"
          className="text-zinc-700 font-semibold py-1 px-2 min-[375px]:py-3 min-[375px]:px-4 rounded-md hover:bg-[#d5d5d6] transition text-sm min-[375px]:text-base font-sans2"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};
