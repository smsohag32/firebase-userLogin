import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
const SingUp = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    // page refresh
    event.preventDefault();
    // collect data

    const email = event.target.email.value;
    const password = event.target.password.value;
    // create user in firebase
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
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
        <p>{error}</p>

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
