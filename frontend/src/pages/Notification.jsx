import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../Redux/Notification/action";
import { getFriend, patchFriend } from "../Redux/Friend/action";
import { updateChallengeArray } from "../Redux/Challenge/action";
import Header from "../components/Header";

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
  }

  return (
    <>
      <Header currentSection="Notification" />
      <div className="mt-28 text-center">
        <h1 className="text-2xl font-semibold font-[rubik] text-slate-700">
          Notification Dashboard
        </h1>
        {notifications.length > 0 &&
          notifications.map((item) => (
            <div key={item._id} className="flex justify-center items-center">
              <div className="bg-white flex justify-around items-center py-3 mt-5 w-[45%] rounded-full">
                <div className="text-left">
                  <h2 className="text-xl text-zinc-500 font-[rubik] font-medium">
                    {item.category === "friend_request"
                      ? "Friend Request"
                      : "#Challenge Invite"}
                  </h2>
                  <h3 className="mt-2 text-orange-400 font-[rubik] font-medium">
                    {item.content}
                  </h3>
                </div>
                <div>
                  {item.category === "friend_request" ? (
                    <button onClick={() => handleFollowBack(item._id)}>
                      Follow Back
                    </button>
                  ) : (
                    <button
                      className="bg-black/80 text-white py-2 px-4 rounded-full "
                      onClick={() =>
                        handleAcceptChallenge(item._id, item.challengeId)
                      }
                    >
                      Accept
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
