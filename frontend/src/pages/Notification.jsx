import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../Redux/Notification/action";
import { getFriend, patchFriend } from "../Redux/Friend/action";
import { updateChallengeArray } from "../Redux/Challenge/action";
import Header from "../components/Navbar";
import { Toaster, toast } from 'sonner'

export function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (store) => store.notificationReducer.notification
  );

  useEffect(() => {
    dispatch(getNotification());
  }, []);

  function handleFollowBack(id) {
    const obj = {
      notificationId: id,
    };
    dispatch(patchFriend(obj)).then(() => dispatch(getFriend()));
  }

  function handleAcceptChallenge(notificationId, challengeId) {
    let obj = {
      notificationId,
      challengeId,
    };
    dispatch(updateChallengeArray(obj)).then(() => dispatch(getNotification()));
    toast.success("Challenge Accepted ! 🎉")
  }
  return (
    <>
      <Header currentSection="Notification" />
      <Toaster richColors position="top-right" />
      <div className="mt-28 text-center px-5">
        <h1 className="text-2xl font-semibold font-[rubik] text-slate-700">
          Notification Dashboard
        </h1>
        {notifications.length > 0 &&
          notifications.map((item) => (
            <div key={item._id} className="flex justify-center items-center">
              <div className="bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] flex gap-3 max-[425px]:flex-col justify-between px-5 items-center py-8 mt-5 w-[800px] rounded-3xl">
                <div className="text-left">
                  <h2 className="text-base text-[#4A5568] inline p-2 rounded-lg bg-[#EDF2F7] font-sans1 font-semibold">
                    {item.category === "friend_request"
                      ? "#Follow Request"
                      : "#Challenge Invite"}
                  </h2>
                  <h3 className="text-lg mt-3 text-[#3D3D3D] line-clamp-2">
                    <em className="font-mono text-xl font-medium">{item.content[0].toUpperCase() + item.content.slice(1)}</em> 
                  </h3>
                </div>
                <div>
                  {item.category === "friend_request" ? (
                    <button className={`bg-orange-600/90 shadow-[0px_13px_27px_-5px_rgba(50,50,93,0.25),0px_8px_16px_-8px_rgba(0,0,0,0.3)] font-medium text-white ${item.read && "bg-black/30 cursor-not-allowed font-sans1"} py-2 px-4 rounded-2xl`} onClick={() => handleFollowBack(item._id)}>
                      Follow Back
                    </button>
                  ) : (
                    <button
                      disabled={item.read}
                      className={`bg-orange-600/90 shadow-[0px_13px_27px_-5px_rgba(50,50,93,0.25),0px_8px_16px_-8px_rgba(0,0,0,0.3)] font-medium text-white ${item.read && "bg-black/30 cursor-not-allowed font-sans1"} py-2 px-4 rounded-2xl`}
                      onClick={() =>
                        handleAcceptChallenge(item._id, item.challengeId)
                      }
                    >
                      {item.read ? "Accepted" : "Accept"}

                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
