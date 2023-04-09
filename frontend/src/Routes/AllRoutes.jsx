import React from "react";
import { Route, Routes } from "react-router-dom";
import UserForm from "../components/form/UserForm";
import PostForm from "../components/form/PostForm";
import PostAnalytics from "../components/analytics/PostAnalytics";
import UserAnalytics from "../components/analytics/UserAnalytics";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/post_form" element={<PostForm />} />
      <Route path="/post_analytics" element={<PostAnalytics />} />
      <Route path="/user_analytics" element={<UserAnalytics />} />
    </Routes>
  );
};

export default AllRoutes;
