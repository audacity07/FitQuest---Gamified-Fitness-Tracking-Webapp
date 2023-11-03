import axios from "axios";
import React, { useEffect, useState } from "react";
import { getActivity } from "../Redux/Activity/action";
import { useDispatch, useSelector } from "react-redux";

export const Activity = () => {
  const [activity, setActivity] = useState("");
  const activityData = useSelector((store) => {
    // console.log(store,"store1")
    return store.activityReducer.activity;
  });
//   console.log(activityData,"store");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // console.log(activity)
    dispatch(getActivity())
  };
  return (
    <div>
      <h1>Activity1</h1>
      <input
        type="text"
        name=""
        id=""
        placeholder="enter activity name"
        onChange={(e) => setActivity(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
