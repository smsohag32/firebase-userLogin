import React, { useState } from "react";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const twitterProvider = new TwitterAuthProvider();
  const handleTwitterLogging = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const userLoggedIn = result.user;
        console.log(userLoggedIn);
        setSuccess("User Login successful.");
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
      .catch((error) => setError(error.message));
  };
  console.log(user);

  const handleLogin = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccess("User Login successful.");
        event.target.reset();
      })
      .catch((error) => setError(error.message));

    event.form.reset();
  };
  return (
    <div className="">
      <form
        onSubmit={handleLogin}
        className="flex flex-col min-h-[calc(100vh-160px)] items-center justify-center gap-3"
      >
        <h1>Please Login</h1>
        <p className="text-warning">{error}</p>
        <p className="text-success">{success}</p>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input input-bordered input-accent w-full max-w-xs"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          className="input input-bordered input-accent w-full max-w-xs"
          required
        />
        <input
          name="password"
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
