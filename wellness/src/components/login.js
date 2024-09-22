import React, { useState } from 'react';
import { Form,useLocation } from 'react-router-dom';
import  Showerror  from './showerror';

function Login() {
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: ''
  });


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message') || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form method="post" action ="/login" >
        <div>
          <label htmlFor="loginId">Login ID</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            value={credentials.loginId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
        <Showerror message = {message}/>
      </Form>
    </div>
  );
}

export default Login;
