import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedRecipe from "./pages/SavedRecipe";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/saved-recipe" element={<SavedRecipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </>
  );
}

export default App;
