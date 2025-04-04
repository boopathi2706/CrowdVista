import React from "react";
import "../css/AdminDash.css";
import { useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 95 },
];

const AdminDash = () => {
  const videoRef = useRef(null);
  const [camara_start, setCamara_start] = useState(null);
  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = media;
      }
      setCamara_start(media);
    } catch (e) {
      console.error("error camara not workig", e);
    }
  };
  const stopCamera = () => {
    if (camara_start) {
      camara_start.getTracks().forEach((track) => track.stop());
      setCamara_start(null);
    }
  };

  const hideDropdown = () => {
    const popup = document.getElementById("admin_details_area");
    popup.classList.remove("show_admin_details");
    popup.classList.add("hide_admin_details");
  };

  return (
    <div className="admin_main_body">
      <div className="sequare"></div>
      <div className="small_sequare"></div>
      <div className="small_sequare1"></div>

      <div className="admin_main_container">
        <div className="left_admin_side">
          <h3>Admin DashBoard</h3>
          <div className="camara_show_area">
            <video ref={videoRef} autoPlay className="camera-view" />
          </div>
          <div className="buttons_admin">
            <button className="camara_start" onClick={startCamera}>
              Start
            </button>
            <button className="camara_stop" onClick={stopCamera}>
              Stop
            </button>
          </div>
        </div>
        <div className="right_admin_side">

        <div className="app-container">
      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="chart-header">
          <h2>📊 Monthly Report 📊</h2>
          <p>Line chart showing monthly values</p>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ r: 5, fill: '#fff', stroke: '#4F46E5', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>


        </div>
      </div>

      <div
        className="admin_details_area show_admin_details"
        id="admin_details_area"
      >
        <div className="close_mark_admin_details">
          <i className="fa-solid fa-xmark" onClick={hideDropdown}></i>
        </div>

        <form action="" className="admin_login_form">
            <div className="content_admin">
              <h2>CROWD VISTA</h2>
              <h2>CROWD VISTA</h2>
            </div>

          <h2 className="admin_title">Admin Authendication</h2>
          <div className="admin_name">
            <label htmlFor="Admin_name">Admin Name </label>
            <input type="text" />
          </div>
          <div className="admin_password">
            <label htmlFor="admin_password">Admin Password </label>
            <input type="password" />
          </div>
          <button className="admin_verify_btn">Verify</button>
        </form>
      </div>

      <div className="r_sequare"></div>
      <div className="r_small_sequare"></div>
      <div className="r_small_sequare1"></div>
    </div>
  );
};
export default AdminDash;
