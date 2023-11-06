import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../Redux/Notification/action";
import { patchFriend } from "../Redux/Friend/action";
import axios from "axios";
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
    dispatch(patchFriend(obj));
  }

  async function handleAcceptChallenge(notificationId, challengeId) {
    try {
      await axios.patch(`http://localhost:8080/user/updatechallenge`,

        { notificationId, challengeId }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcGlzaCIsInVzZXJJRCI6IjY1NDY3MDUwNjZhMzA0NzM0NjVjY2FlOCIsImlhdCI6MTY5OTIwMTMyNSwiZXhwIjoxNjk5ODA2MTI1fQ.XIm4Q1_AOY88yLwKLmf2aY36Nf6_ExfK5SlSDjcsk7Y`
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <div className="mt-28 text-center">
        <h1 className="text-2xl font-semibold font-[rubik] text-slate-700">Notification Dashboard</h1>
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
                  <h3 className="mt-2 text-orange-400 font-[rubik] font-medium">{item.content}</h3>
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
