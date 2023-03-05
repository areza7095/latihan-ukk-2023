import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import '../index.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setCurrentAccessToken] = useState(undefined);
  const navigate = useNavigate();

  
   useEffect(() => {
    const accessToken = AuthService.getCurrentAccessToken();

    if (accessToken) {
      setCurrentAccessToken(accessToken);
    }
    if(accessToken){
      navigate("/home");
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          alert(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <>
    <div className="form-signin">
      <form onSubmit={handleLogin}>
        <h2 className="mb-3  loginTitle">Login</h2>
        <div class="form-floating mb-3 ">
          <label class="form-label ">
            Username
          </label>
        <input
          type="text"
          placeholder="username"
          class="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div class="form-floating mb-3">
          <label class="form-label">
            Password
          </label>
        <input
          type="password"
          placeholder="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit" class="btn btn-primary">Log in</button>
      </form>
    </div>
    </>
  );
};

export default Login;
