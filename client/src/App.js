import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Search from "./components/Layout/Search";

import User from "./pages/User";

import { useEffect } from "react";

function App() {
  return (
    <div>
      <Search />
    </div>
  );
}

export default App;
