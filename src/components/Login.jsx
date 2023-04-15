import React, { useState } from "react";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const twitterProvider = new TwitterAuthProvider();
  const handleTwitterLogging = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const userLoggedIn = result.user;
        console.log(userLoggedIn);
      })
      .catch((error) => setError(error.massage));
  };
  const handleGoogleLogging = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const userLoggedIn = result.user;
        setUser(userLoggedIn);
      })
      .catch((error) => setError(error));
  };
  console.log(user);
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
        <button className="btn btn-primary w-full max-w-xs">Login</button>
        <div className="flex justify-between gap-3">
          <div onClick={handleGoogleLogging} className="btn btn-outline">
            Login with Google
          </div>
          <div onClick={handleTwitterLogging} className="btn btn-outline">
            Login with Twitter
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
