import React from "react";
import { Route, Routes } from "react-router-dom";
import Assignments from "../Pages/Assignments";
import Lectures from "../Pages/Lectures";
import Quiz from "../Pages/Quiz";
import Practice from "../Pages/Practice";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

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
      </Routes>
    </div>
  );
};

export default AllRoutes;
