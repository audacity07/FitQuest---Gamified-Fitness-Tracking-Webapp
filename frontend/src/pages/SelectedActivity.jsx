import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSelectedActivity,
  getSelectedActivity,
} from "../Redux/SelectedActivity/action";
import { useSearchParams } from "react-router-dom";

export const SelectedActivity = () => {
  const { id } = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteSelectedActivity(id)).then((res) => {
      console.log(res, "res");
    });
  }, []);
  return <div>Selected Acitivity</div>;
};
