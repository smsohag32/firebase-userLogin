import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // page refresh
    event.preventDefault();
    // collect data
    const email = event.target.email.value;
    const password = event.target.password.value;
    // create user in firebase

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .then((error) => {
        console.error(error);
      });
  };

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
