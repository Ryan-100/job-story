import React from "react";
import Profile from "@/components/LV3/Profile/Profile";
import PrivateRoute from "@/service/Auth";

const profile = () => {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
};

export default profile;
