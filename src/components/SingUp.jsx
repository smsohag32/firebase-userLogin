import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
const SingUp = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (event) => {
    // page refresh
    event.preventDefault();
    // collect data

    setError("");
    setSuccess("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    // create user in firebase
    console.log(email, password);
    // validation check in regular ex
    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("please type one uppercase letter");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");
        const loggedUser = result.user;
        setUser(loggedUser);
        event.target.reset();
        setSuccess("Your Account created successfully done !!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  console.log(user, error);
  //   const handleEmailChange = (event) => {
  //     setEmail(event.target.value);
  //   };

  //   const handlePassword = (event) => {};
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col min-h-[calc(100vh-160px)] items-center justify-center gap-3"
      >
        <h1>Please Register</h1>
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
        <p className="text-red-900">{error}</p>
        <p className="text-green-400">{success}</p>

        <input
          className="btn btn-primary"
          type="submit"
          value="register"
        ></input>
      </form>
    </div>
  );
};

export default SingUp;
