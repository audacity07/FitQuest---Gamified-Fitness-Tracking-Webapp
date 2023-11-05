import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getChallenge, postChallenge } from "../Redux/Challenge/action";

export const Challenges = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      title: "3000",
      participants: ["6546a708b15755cd9fadee59", "65476bb16d67171d9f725935"],
    };
    dispatch(postChallenge(obj)).then((res) => {
      console.log(res, "res");
    });
  }, []);
  return <div>Challenges</div>;
};
