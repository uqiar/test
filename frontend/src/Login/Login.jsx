import React, { useState } from "react";
import styles from "./Login.module.css"; // Import CSS Module
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.userID);
      onLogin();
      navigate("/play");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("User not found. Please register first.");
      } else {
        setError(error.response?.data.message || "Error logging in");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
          {error && <span className={styles.error}>{error}</span>}
        </form>

        <p className={styles.register}>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
