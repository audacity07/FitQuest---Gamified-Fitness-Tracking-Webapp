import React, { useEffect, useState } from "react";
import Header from "../components/Navbar";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getChallenge, postChallenge } from "../Redux/Challenge/action";
import { Toaster, toast } from 'sonner'

export const Challenges = () => {
  const [title, setTitle] = useState("");
  const [friends, setFriends] = useState("");
  const [desc, setDesc] = useState("");
  const [challengeAccordion, setChallengeAccordion] = useState(false);
  const dispatch = useDispatch();
  const challenges = useSelector((store) => store.challengeReducer.challenges);

  const handleSubmit = () => {
    let newChallenge = {
      title,
      enteredUsernames: friends,
      description: desc,
    };
    dispatch(postChallenge(newChallenge)).then(() => dispatch(getChallenge()));
    setDesc("")
    setTitle("")
    setFriends("")
    toast.success("Challenge created ! 🎉")
  };


  useEffect(() => {
    dispatch(getChallenge());
  }, []);
  return (
    <>
      <Header currentSection="Challenge" />
      <Toaster richColors position="top-right" />
      <div className="mt-28 flex justify-center items-center">
        <div className="w-full sm:w-[90%] px-2">
          <div onClick={() => setChallengeAccordion(prev => !prev)} className="group flex items-center justify-center gap-5 cursor-pointer mb-10"> <h1 className="text-4xl font-bold text-center ">Create Challenges</h1><span className={`inline text-xl group-hover:-mb-2 ${challengeAccordion ? "rotate-180" : "rotate-0"} transition-all`}><IoIosArrowDown /></span></div>
          <div className={`md:w-[600px] flex flex-col m-auto gap-5 mb-5 ${challengeAccordion ? "h-[330px]" : "h-0 opacity-0"} transition-all duration-700 overflow-hidden`}>
            <input type="text" className="py-3 px-3 rounded-lg focus:outline-slate-300" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <textarea
              className="py-3 px-3 rounded-lg focus:outline-slate-300 "
              placeholder="Add Friends"
              type="text"
              name="friend"
              value={friends}
              onChange={(e) => setFriends(e.target.value)}
            />
            <textarea
              className="py-3 px-3 rounded-lg focus:outline-slate-300 "
              placeholder="Description"
              type="text"
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button
              className="bg-orange-600 hover:bg-orange-600/90 text-white py-2 rounded-lg text-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div className="w-full px-2">
            <h1 className="text-4xl font-extrabold">CHALLENGES</h1>
            <div className="flex flex-wrap gap-5 items-center justify-around mt-10">
              {
                challenges.length > 0 &&
                challenges?.map((challenge, i) => (
                  <div key={challenge._id} className="bg-white w-full h-[500px] md:w-[32%] p-4 rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-2 transition duration-500">
                    <div className="flex items-center justify-between">
                      <h1 className="text-orange-600 font-bold text-5xl">0{i + 1}.</h1>
                      <div className="text-4xl bg-[#F2F2F2] rounded-full p-3 py-4">🏆</div>
                    </div>
                    <div className="mt-10 flex items-end h-[70%]">
                      <div>
                        <h1 className="inline py-2 px-4 rounded-2xl text-white bg-black/30 font-medium text-lg">{challenge.creator.username && challenge.creator.username[0].toUpperCase() + challenge.creator.username.slice(1)}</h1>
                        <h1 className="text-4xl font-mono font-extrabold line-clamp-1 mt-5">{challenge.title}</h1>
                        <em className="text-lg text-zinc-400 line-clamp-2">{challenge.description}</em>
                        <h1 className=" text-xl mt-2 font-semibold">Participants:</h1>
                        <span className="ml-4">
                          {challenge.participants.map((user) => (
                            user.username[0].toUpperCase() + user.username.slice(1)
                          )).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
