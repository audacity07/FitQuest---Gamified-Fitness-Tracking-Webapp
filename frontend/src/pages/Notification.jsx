import React, { useEffect } from "react";
import {
  deleteNotification,
  getNotification,
} from "../Redux/Notification/action";
import { useDispatch } from "react-redux";

export const Notification = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteNotification("65476bd46d67171d9f72593d")).then((res) => {
      console.log(res, "res");
    });
  }, []);
  return <div>Notification</div>;
};
