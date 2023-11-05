import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { UserBoard } from "../pages/UserBoard";
import { AvatarSelect } from "../pages/AvatarSelect";
import { Login } from "../pages/Login";
import { Notification } from "../pages/Notification";
import { SelectedActivity } from "../pages/SelectedActivity";
import { Challenges } from "../pages/Challenges";
import { Activity } from "../pages/Activity";
import { Friend } from "../pages/Friend";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-board" element={<UserBoard />} />
      <Route path="/select-avarat" element={<AvatarSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/selectedactivities" element={<SelectedActivity />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/friend" element={<Friend />} />
       <Route path='/user-activity' element={<AvatarSelect/>}/>

    </Routes>
  );
};

