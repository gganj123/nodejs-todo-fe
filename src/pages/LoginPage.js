import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });

      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        navigate("/");
      } else {
        throw new Error(response.data.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      toast.error("비밀번호가 일치하지 않습니다.", {
        position: "top-center",
      });
      setError(error.error || "서버 오류가 발생했습니다.");
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        {error && <div className="red-error">{error}</div>}

        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
