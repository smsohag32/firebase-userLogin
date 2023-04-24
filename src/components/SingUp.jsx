import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const SingUp = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    // page refresh handle
    event.preventDefault();

    setError("");
    setSuccess("");
    // collect input data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    // validation check in regEx
    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("please type one uppercase letter");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 carecters");
    }

    // create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");
        const loggedUser = result.user;
        setUser(loggedUser);
        event.target.reset();
        setSuccess("Your Account created successfully done !!");
        verificationEmail(loggedUser);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const verificationEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("please verify your email");
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col min-h-[calc(100vh-160px)] items-center justify-center gap-3"
      >
        <h1>Please Register</h1>
        <p>
          <small className="text-red-500">{error}</small>
        </p>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input input-bordered input-accent w-full max-w-xs"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="input input-bordered input-accent w-full max-w-xs"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          className="input input-bordered input-accent w-full max-w-xs"
        />

        <p className="text-green-400">{success}</p>

        <input
          className="btn btn-primary"
          type="submit"
          value="register"
        ></input>
        <p>
          <small>
            Already have an account? Please
            <Link className="btn btn-outline" to="/login">
              Login
            </Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default SingUp;
