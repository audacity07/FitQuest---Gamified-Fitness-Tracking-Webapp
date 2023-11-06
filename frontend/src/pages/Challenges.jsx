import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getChallenge, postChallenge } from "../Redux/Challenge/action";

export const Challenges = () => {
  const [title, setTitle] = useState("")
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch();
  const challenges = useSelector(store => store.challengeReducer.challenge)

  const handleFriendChange = (e) => {
    setFriends(e.target.value.split(","));
  }
  const handleSubmit = () => {
    let newChallenge = {
      title,
      participants: friends
    }
    dispatch(postChallenge(newChallenge)).then((res) => (
      dispatch(getChallenge())
    ))
  }
  console.log(challenges);

  useEffect(() => {
    dispatch(getChallenge())
  }, [])

  return <>
    <Header />
    <div className="mt-28 flex justify-center items-center">
      <div className="w-[40%]">
        <h1 className="text-4xl text-slate-700 font-bold mb-10 text-center font-[rubik]">Create Challenges</h1>
        <div className="flex flex-col gap-5 mb-5">
          <input type="text" className="py-3 px-3 rounded-lg focus:outline-slate-300 font-[rubik]" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea className="py-3 px-3 rounded-lg focus:outline-slate-300 font-[rubik]" placeholder="Add Friends" type="text" name="friend" value={friends.join(",")} onChange={handleFriendChange} />

          <button className="bg-black/80 text-white py-2 rounded-lg text-lg font-[rubik]" onClick={handleSubmit}>Submit</button>
        </div>

        <div>
          <h1 className="text-3xl font-bold font-[rubik] text-center">Challenges</h1>
          <div className="flex flex-col gap-5 justify-center items-center mt-5">
            {
              challenges &&
              challenges?.map(challenge => (
                <div className="bg-white w-[400px] p-2 px-5 rounded-xl">
                  <div className="flex items-center gap-5">
                    <div className="text-6xl">🏆</div>
                    <div>
                      <p className="text-lg font-semibold text-slate-700 font-[rubik]"><span className="font-normal text-slate-400">Title</span> : {challenge.title}</p>
                      <p className="text-lg font-semibold text-slate-700 font-[rubik]"> <span className="font-normal text-slate-400">Creator :</span> {challenge.creator.username}</p>
                      <ul className="text-lg font-normal text-slate-400 font-[rubik]">
                        Participants:
                        {
                          challenge.participants.map(item => (
                            <li className="list-disc ml-10 font-medium text-slate-700">
                              {item.username}
                            </li>
                          )
                          )
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>;
  </>
};
