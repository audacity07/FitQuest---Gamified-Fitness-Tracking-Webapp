import { useEffect, useState } from "react";
import ActivityCard from "./AdminActivityCard";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { logout } from "../../Redux/Authenticate/action"
import { useDispatch } from "react-redux";
import AdminAddActivity from "./AdminAddActivity";

function AdminActivity() {
  const [data, setData] = useState([]);
  const [toggleAddActivity, setToggleAddActivity] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getImojiFun = async () => {
    try {
      let res = await fetch("http://localhost:8080/activity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res.data.activities);
      setData(res.data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    getImojiFun();
  }, [data]);

  return (
    <>
      <div>
        <div className="fixed w-[22%] h-screen bg-white pt-10 pl-10 shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
          <p className="font-[rubic] font-semibold text-xl text-slate-600">FitQuest</p>
          <div className="flex items-center w-[90%] mt-10 gap-5 bg-[#EEEFF1] rounded-xl pl-2 py-3">
            <p className="text-4xl bg-[#d4beb569] rounded-full py-2 px-1">🏋🏼‍♂️</p>
            <p className="text-[1rem] font-semibold font-[rubik]">Hello, Admin</p>
          </div>

          <div className="bg-[#EEEFF1] w-[90%] pl-5 py-2 mt-7 rounded-lg">
            <div className="flex items-center gap-5 text-zinc-500">
              <div>
                <FaUserAlt />
              </div>
              <Link
                className="text-base font-medium font-[rubik] text-zinc-500"
                to="/admin"
              >
                Admin
              </Link>
            </div>
            <div className="flex items-center gap-5 mt-5">
              <div className="text-xl text-zinc-500">
                <CgLogOut />
              </div>
              <div
                className="text-base font-medium font-[rubik] text-zinc-500 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] ml-96">
          {
            toggleAddActivity &&
            <div className="fixed top-0 left-0 h-screen bg-black/10 backdrop-blur-sm min-w-full">
              <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <AdminAddActivity setToggleAddActivity={setToggleAddActivity} />
              </div>
            </div>
          }
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-[rubik] font-semibold mb-4 mt-4">
              Total Users: {data.length}
            </h1>
            <div>
              <div
                className="mx-2 cursor-pointer font-[rubik] bg-orange-600/90 hover:bg-orange-600 text-white font-medium rounded-md py-2 px-3"
                onClick={() => setToggleAddActivity(prev => !prev)}
              >
                Add Activity
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white px-3 rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
            <table className="min-w-full table-auto mt-3">
              <thead>
                <tr className="">
                  <th className="font-[rubik] px-4 py-3 text-left text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Name</th>
                  <th className="font-[rubik] px-4 py-3 text-center text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Emoji</th>
                  <th className="font-[rubik] px-4 py-3 text-center text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Edit</th>
                  <th className="font-[rubik] px-4 py-3 text-center text-zinc-600 bg-[#faf5f4] rounded-md">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <ActivityCard key={item._id} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminActivity;
