import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { AvatarSelect } from "./Activity/AvatarSelect";
import { Login } from "../pages/Login";
import { Notification } from "../pages/Notification";
import { Challenges } from "../pages/Challenges";
import { Friend } from "../pages/Friend";
import { LeaderBoard } from "../pages/LeaderBoard";
import AdminActivity from "./Admin/AdminActivity";
import AdminAddActivity from "./Admin/AdminAddActivity";
import { Registration } from "../pages/Registration";
import Admin from "../pages/Admin";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-avatar" element={<AvatarSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/challenge" element={<Challenges />} />
      <Route path="/friend" element={<Friend />} />
      <Route path="/user-activity" element={<AvatarSelect />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminActivity" element={<AdminActivity />} />
      <Route path="/activity/add" element={<AdminAddActivity />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};
