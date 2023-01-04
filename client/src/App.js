import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Layout } from "antd";
import { GithubProvider } from "./context/github/GithubContext";
import User from "./pages/User";
import MyProfile from "./pages/MyProfile";
import Repos from "./pages/Repos";
import Login from "./pages/Login";
import "./assets/style/App.css";

function App() {
  const { Content } = Layout;
  return (
    <GithubProvider>
      <Router>
        <Layout>
          <Content>
            <Routes>
              <Route path="/main" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="main/users/:login" element={<User />} />
              <Route path="main/repos/:repo" element={<Repos />} />
              <Route path="/myprofile/:login" element={<MyProfile />} />
              <Route path="/" element={<Login />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </GithubProvider>
  );
}

export default App;
