import React from "react";
import { Route, Routes } from "react-router-dom";
import Assignments from "../Pages/Assignments";
import Lectures from "../Pages/Lectures";
import Quiz from "../Pages/Quiz";
import Practice from "../Pages/Practice";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Profile from "../Pages/Profile";
import AdminLogin from "../Pages/AdminLogin";
import AdminSignup from "../Pages/AdminSignup";
import AdminList from "../Pages/AdminList";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-list" element={<AdminList />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
