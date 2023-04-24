import React, { useRef, useState } from "react";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const twitterProvider = new TwitterAuthProvider();
  const emailRef = useRef();
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
    if (!/(?=.*[A-Z])./.test(password)) {
      setError("Password must be one uppercase");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        if (!loggedUser.emailVerified) {
          alert("Please verify your email");
          return;
        }
        setSuccess("User Login successful.");
        setUser(loggedUser);
        event.target.reset();
      })
      .catch((error) => setError(error.message));
  };
  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide your email reset your email.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email send a verification");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className=" flex flex-col gap-5 justify-center items-center  min-h-[calc(100vh-160px)]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-3"
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
          ref={emailRef}
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
        <input
          type="submit"
          value="Login"
          className="btn btn-primary  w-full max-w-xs"
        />
      </form>
      <p>
        <small>
          New to this website? Please{" "}
          <Link className="btn btn-outline" to="/singUp">
            Register
          </Link>
        </small>
      </p>
      <p className="">
        <button onClick={handleResetPassword} className="btn btn-outline">
          Forget password
        </button>
      </p>
      <div className="flex justify-between gap-3">
        <div onClick={handleGoogleLogging} className="btn btn-outline">
          Login with Google
        </div>
        <div onClick={handleTwitterLogging} className="btn btn-outline">
          Login with Twitter
        </div>
      </div>
    </div>
  );
};

export default Login;
