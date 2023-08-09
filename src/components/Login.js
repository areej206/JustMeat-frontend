import React, { useState } from "react";
async function loginUser(credentials) {
  return fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  // .then((data) => {
  //   return data.token;
  // });
}
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
    console.log(token);
  };
  return (
    <div className="container-fluid">
      <div className="login-wrapper form-group">
        <h1>Staff Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <p>Username</p>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <p>Password</p>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}