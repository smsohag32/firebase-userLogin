import React from "react";

const Login = () => {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered input-accent w-full max-w-xs"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          className="input input-bordered input-accent w-full max-w-xs"
          required
        />
        <input
          type="password"
          placeholder="Your password"
          className="input input-bordered input-accent w-full max-w-xs"
        />
      </div>
      <button className="btn btn-outline">Login</button>
    </div>
  );
};

export default Login;
