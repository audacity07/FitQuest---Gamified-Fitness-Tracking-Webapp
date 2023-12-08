import { useEffect, useState } from "react";
import AdminUserCard from "../components/Admin/AdminUserCard";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import AdminAddActivity from "../components/Admin/AdminAddActivity";

function Admin() {
  const [users, setUsers] = useState([]);
  const [toggleAddActivity, setToggleAddActivity] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user`);
      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleLogout = () => {
    // dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <div>
      <div className="flex gap-14">
        <div className="w-[22%] h-screen bg-white pt-10 pl-10 shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
          <p className="font-[rubik] font-semibold text-xl text-slate-600">FitQuest</p>
          <div className="flex items-center w-[90%] mt-10 gap-5 bg-[#EEEFF1] rounded-xl pl-2 py-3">
            <p className="text-4xl bg-[#d4beb569] rounded-full py-2 px-1">🏋🏼‍♂️</p>
            <p className="text-[1rem] font-semibold font-[rubik]">Hello,Admin</p>
          </div>

          <div className="bg-[#EEEFF1] w-[90%] pl-5 py-2 mt-7 rounded-lg">
            <div className="flex items-center gap-5 text-zinc-500">
              <div>
                <FaUserAlt />
              </div>
              <Link
                className="text-base font-medium font-[rubik] text-zinc-500"
                to="/adminActivity"
              >
                Activity
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
        <div className="w-[70%] mt-10">
          {
            toggleAddActivity &&
            <div className="absolute top-0 left-0 bg-black/10 backdrop-blur-sm min-w-full min-h-screen ">
              <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <AdminAddActivity setToggleAddActivity={setToggleAddActivity} />
              </div>
            </div>
          }
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-[rubik] font-semibold mb-4 mt-4">
              Total Users: {users.length}
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

          <div className="overflow-x-auto bg-white rounded-md py-3 px-3 shadow-[0px_8px_24px_rgba(149,157,165,0.2)]">
            <table className="min-w-full text-center">
              <thead className="">
                <tr>
                  <th className="font-[rubik] px-4 py-3 text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">UserName</th>
                  <th className="font-[rubik] px-4 py-3 text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Email</th>
                  <th className="font-[rubik] px-4 py-3 text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">CreatedAt</th>
                  <th className="font-[rubik] px-4 py-3 text-zinc-600 bg-[#faf5f4] rounded-md border-r-4 border-white">Update</th>
                  <th className="font-[rubik] px-4 py-3 text-zinc-600 bg-[#faf5f4] rounded-md">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <AdminUserCard key={item._id} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
