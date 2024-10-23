import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (password.trim().length < 3 || password.trim().length > 8) {
      setPasswordError("비밀번호는 3자 이상 8자 이하로 입력해주세요.");
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name) {
        toast.error("이름을 적어주세요.", {
          position: "top-center",
        });
        throw new Error("이름을 적어주세요.");
      }
      if (!emailRegex.test(email)) {
        toast.error("올바른 이메일 형식을 입력해주세요.", {
          position: "top-center",
        });
        throw new Error("이메일 형식이 올바르지 않습니다.");
      }
      if (passwordError) {
        toast.error("비밀번호를 확인해주세요.", {
          position: "top-center",
        });
        throw new Error("비밀번호를 확인해주세요.");
      }
      if (password !== secPassword) {
        toast.error("비밀번호가 일치하지 않습니다.", {
          position: "top-center",
        });
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      const response = await api.post("/user", { name, email, password });
      if (response.status === 200) {
        toast.success("회원가입이 완료되었습니다!", {
          position: "top-center",
        });
        navigate("/login");
      } else {
        toast.error(response.data.error, {
          position: "top-center",
        });
        throw new Error(response.data.error);
      }
    } catch (error) {
      toast.error(error.error, {
        position: "top-center",
      });
      setError(error.error);
    }
  };

  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

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
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <Form.Label>Re-enter the password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter the password"
            onChange={(event) => setSecPassword(event.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
