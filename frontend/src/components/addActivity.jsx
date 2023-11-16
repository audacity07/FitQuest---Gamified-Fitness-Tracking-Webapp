import { useState } from "react";

function AddActivity() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  const AddActivityFun = async () => {
    let res = await fetch("http://localhost:8080/activity/add", {
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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url('/giphy.gif')` }}
    >
      <div className="bg-white shadow-md rounded px-8 py-6 mb-4 w-96">
        <h1 className="text-2xl text-center mb-4 font-bold">Add Activity</h1>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Activity Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Activity Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default AddActivity;
