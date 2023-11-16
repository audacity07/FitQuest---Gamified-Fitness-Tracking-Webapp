import React, { useState } from "react";
import { UserBoardNavbar } from "../components/UserBoardNavbar";
import Lottie from "lottie-react";
import downCurvedArrow from "../assets/curved-arrow.json";
import celebrate from "../assets/celebrate.json";

export const UserBoard = () => {
  const [barWidth, setBarWidth] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [animationState, setAnimationState] = useState(false);

  const handleButtonClick = () => {
    setBarWidth((prev) => prev + 10);
    setStreakCount((prev) => prev + 1);
    if (streakCount >= 9) {
      setStreakCount(0);
    }
    if (barWidth >= 90) {
      setAnimationState(true);
      setBarWidth(0);
      setTimeout(() => {
        setAnimationState(false);
      }, 4000);
    }
  };
  return (
    <div>
      <UserBoardNavbar />
      <section className="bg-[#EFEFEF] py-20">
        <div className="w-[82%] m-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-6xl font-extrabold text-slate-700 font-[rubik]">
                Gamify your <br />
                fitness
              </h1>
              <p className="text-xl text-zinc-600 font-[rubik]">
                Track your workouts to level up your avatars and climb <br />{" "}
                leaderboards!
              </p>
            </div>
            <div clsrelative="relative">
              <span className="absolute -scale-x-100 rotate-90 ml-20 -mt-1">
                <Lottie animationData={downCurvedArrow} />
              </span>
              <span className="absolute ml-32 -mt-2"> tap to grow</span>
              <div className="flex items-center gap-10 w-[490px] h-[160px] rounded-2xl bg-white mt-4">
                <div className="ml-10">
                  <button
                    onClick={handleButtonClick}
                    className="text-6xl active:scale-[0.95] transition"
                  >
                    🏋️
                  </button>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <p className="text-sm text-zinc-500 font-[rubik]">
                      Level 1{" "}
                      <span className="bg-[#FCEDEA] py-1 px-2 rounded-md text-base">
                        🔥{streakCount}
                      </span>
                    </p>
                    <p className="font-semibold mb-2 font-[rubik]">
                      Metal Lifter
                    </p>
                    <div
                      className={`relative z-[5] bg-[#D6D8DB] h-[20px] w-[90%] rounded-full text-xs flex items-center pl-2 font-[rubik] overflow-hidden ${
                        barWidth > 15 && "text-white"
                      } transition`}
                    >
                      XP {barWidth} / 10
                      <div
                        className={`absolute bg-red-500 h-[20px] w-[${barWidth}%] -z-10 rounded-full -ml-2 transition-all duration-700`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center items-center w-[100%]">
          <div className="absolute w-[40%]">
            {animationState && <Lottie animationData={celebrate} />}
          </div>
        </div>
      </section>

      <section className="py-20 pt-40 bg-[#EFEFEF]">
        <div className="text-center">
          <h1 className="font-[rubik] text-5xl font-bold mb-2 text-slate-700">
            Exercising consistently is hard
          </h1>
          <p className="font-[rubik] text-xl text-zinc-600">
            80% of New Year's resolutions fail in 2 months...
          </p>
        </div>
        <div className="flex justify-center gap-10 mt-20">
          <div className="bg-white p-10 rounded-2xl min-w-[25%]">
            <p className="text-6xl mb-6">🎯</p>
            <h3 className="text-xl font-bold text-slate-700 font-[rubik] mb-2">
              Set a goal
            </h3>
            <p className="text-base font-[rubik] text-zinc-500">
              "I want to lose weight"
            </p>
            <p className="text-base font-[rubik] text-zinc-500">
              "I want to go gym 3x a week"
            </p>
          </div>
          <div className="bg-white p-10 rounded-2xl min-w-[25%]">
            <p className="text-6xl mb-6">🏃</p>
            <h3 className="text-xl font-bold text-slate-700 font-[rubik] mb-2">
              Try your best
            </h3>
            <p className="text-base font-[rubik] text-zinc-500">
              Buy new shoes
            </p>
            <p className="text-base font-[rubik] text-zinc-500">
              Get gym membership
            </p>
          </div>
          <div className="bg-white p-10 rounded-2xl min-w-[25%]">
            <p className="text-6xl mb-6">🤦</p>
            <h3 className="text-xl font-bold text-slate-700 font-[rubik] mb-2">
              But life doesn't change...
            </h3>
            <p className="text-base font-[rubik] text-zinc-500">
              “I'm not motivated”
            </p>
            <p className="text-base font-[rubik] text-zinc-500">
              “I forget my new habit”
            </p>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </div>
  );
};
