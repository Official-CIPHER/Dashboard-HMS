import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddNewAdmin from "./components/AddNewAdmin";
import Doctors from "./components/Doctors";
import AddNewDoctor from "./components/AddNewDoctor";
import Login from "./components/Login";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";

import { Context } from "./main";

// Notification Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./App.css";

const App = () => {
  // Get the user details
  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(Context);

  useEffect(() => {
    // get the user detail only when admin login
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-system-da7n.onrender.com/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>

        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
