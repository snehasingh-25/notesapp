import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export default function useAuth() {
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);

  // Load token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch notes whenever token changes
  useEffect(() => {
    if (token) getNotes();
  }, [token]);

  const register = async (name, email, password) => {
    try {
      await axios.post(`${API_URL}/signup`, { name, email, password });
      alert("Registered! Now sign in.");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  const login = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/signin`, {
        name,
        email,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Error signing in");
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setNotes([]);
  };

  const createNote = async (description) => {
    if (!description.trim()) return;
    try {
      await axios.post(
        `${API_URL}/note`,
        { description },
        { headers: { token } }
      );
      getNotes();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating note");
    }
  };

  const getNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes`, {
        headers: { token },
      });
      setNotes(res.data);
    } catch (err) {
      alert("Error fetching notes");
    }
  };

  return { token, notes, register, login, logout, createNote };
}

