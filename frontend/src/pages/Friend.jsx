import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getFriend } from "../Redux/Friend/action";

export const Friend = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriend()).then((res) => {
      console.log(res, "res");
    });
  }, []);
  return <div>Friend</div>;
};
