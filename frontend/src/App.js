import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./scenes/Login";
import CusDashboard from "./scenes/customer/CusDashboard";
import OwnDashboard from "./scenes/owner/OwnDashboard";

function App() {
  const username = localStorage.getItem("username");
  console.log(username);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            username ? (
              <Navigate to={`/${username}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/admin" element={<OwnDashboard />} />
        <Route path="/user" element={<CusDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
