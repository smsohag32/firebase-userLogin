import React from "react";

const Login = () => {
  return (
    <div className="">
      <form className="flex flex-col min-h-[calc(100vh-160px)] items-center justify-center gap-3">
        <h1>Please Login</h1>
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
        <button className="btn btn-outline w-full max-w-xs">Login</button>
      </form>
    </div>
  );
};

export default Login;
