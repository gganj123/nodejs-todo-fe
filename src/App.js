import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getUSer = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getUSer();
  }, []);

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <TodoPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
