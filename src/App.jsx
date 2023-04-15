import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
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
