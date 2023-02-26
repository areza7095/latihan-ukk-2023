import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [namaPetugas, setNamaPetugas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(namaPetugas, username, password, telp).then(
        (response) => {
          if (response == 200) {
            navigate("/home");
            window.location.reload();
          }
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
    <div>
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <input
          type="text"
          placeholder="Nama Petugas"
          value={namaPetugas}
          onChange={(e) => setNamaPetugas(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telepon"
          value={telp}
          onChange={(e) => setTelp(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
