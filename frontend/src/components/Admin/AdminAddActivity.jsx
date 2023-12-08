import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function AdminAddActivity({ setToggleAddActivity }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  const AddActivityFun = async () => {
    let res = await fetch(`${process.env.REACT_APP_API_URL}/activity/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, emoji }),
    });
    res = await res.json();
    console.log(res);
    alert("Activity Added");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    AddActivityFun();
  };

  return (
    <div>
      <div className="relative bg-[#F7F7F7] shadow-[0px_8px_24px_rgba(149,157,165,0.2)] rounded px-8 py-6 mb-4 w-[600px]">
        <h1 className="text-2xl text-slate-500 font-[rubik] text-center mb-4 font-bold">
          Add Activity
        </h1>
        <div
          className="absolute top-3 right-4 cursor-pointer text-xl"
          onClick={() => setToggleAddActivity((prev) => !prev)}
        >
          <RxCross2 />
        </div>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <input
              className="appearance-none bg-transparent font-[rubik] border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-orange-200"
              type="text"
              placeholder="Enter Activity Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="font-[rubik] appearance-none bg-transparent border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-orange-200"
              type="text"
              placeholder="Enter Activity Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-orange-500 w-[60%] hover:bg-orange-700 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddActivity;
