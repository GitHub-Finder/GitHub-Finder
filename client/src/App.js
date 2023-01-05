import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import User from "./pages/User";
import MyProfile from "./pages/MyProfile";
import Repos from "./pages/Repos";
import Login from "./components/Login";
import "./assets/style/App.css";
import Signup from "./components/Signup";
import Friends from "./pages/Friends";
import Main from "./pages/Main";

function App() {
  return (
    <GithubProvider>
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="main/users/:login" element={<User />} />
          <Route path="main/repos/:repo" element={<Repos />} />
          <Route path="/myprofile/:login" element={<MyProfile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </GithubProvider>
  );
}

export default App;
