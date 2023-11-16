import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { UserBoard } from "../pages/UserBoard";
import { AvatarSelect } from "../pages/AvatarSelect";
import { Login } from "../pages/Login";
import { Notification } from "../pages/Notification";
import { Challenges } from "../pages/Challenges";
import { Friend } from "../pages/Friend";
import { LeaderBoard } from "../pages/LeaderBoard";
import Admin from "../components/Admin/admin";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserBoard />} />
      <Route path="/select-avatar" element={<AvatarSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/challenge" element={<Challenges />} />
      <Route path="/friend" element={<Friend />} />
      <Route path="/user-activity" element={<AvatarSelect />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
    </Routes>
  );
};
