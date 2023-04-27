import "./App.css";
import Signup from "./component/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

