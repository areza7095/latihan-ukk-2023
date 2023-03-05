import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [namaPetugas, setNamaPetugas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const accessToken = AuthService.getCurrentAccessToken();
    const level = AuthService.getCurrentLevel();

    if(!accessToken){
      navigate("/");
    }

    if(level == 'petugas'){
      navigate("/home");
    }
  }, []);
  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(namaPetugas, username, password, telp).then(
        (response) => {
          if (response == 200) {
            navigate("/petugas");
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
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Nama Petugas
          </label>
          <input
            type="text"
            placeholder="Nama Petugas"
            class="form-control"
            value={namaPetugas}
            onChange={(e) => setNamaPetugas(e.target.value)}
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
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

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            password
          </label>
        <input
          type="password"
          placeholder="password"
          class="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Telepon
          </label>
        <input
          type="text"
          placeholder="Telepon"
          class="form-control"
          value={telp}
          onChange={(e) => setTelp(e.target.value)}
        />
        </div>
        <button type="submit" class="btn btn-success">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
