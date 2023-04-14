import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-200px)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
