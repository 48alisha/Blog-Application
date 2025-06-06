import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  const { loggedUser } = useContext(AuthContext);

  console.log("Global login user: ", loggedUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
