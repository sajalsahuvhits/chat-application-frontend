import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../container/auth/login/Login";
import SignUp from "../container/auth/signup/Signup";
import Chat from "../container/pages/chat/Chat";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
