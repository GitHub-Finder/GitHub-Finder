import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Layout } from "antd";
import { GithubProvider } from "./context/github/GithubContext";
import User from "./pages/User";
import Repo from "./pages/Repo";
import Repos from "./pages/Repos";
import Issues from "./pages/Issues";
import Issue from "./pages/Issue";
import "./assets/style/App.css";
import { FaGithub } from "react-icons/fa";

function App() {
  const { Header, Footer, Content } = Layout;
  return (
    <GithubProvider>
      <Router>
        <Layout>
          <Header>
            <div className="wrapper">
              <div className="logo">
                <Link to={"/"}>
                  <FaGithub className="githubIcon" />
                  GitHub Finder
                </Link>
              </div>
              <div className="links">
                <Link to={"/"}>Home</Link>
                <Link to={"/friends"}>Friends</Link>
                <Link to={"/repositories"}>Repositories</Link>
                <Link to={"/issues"}>Issues</Link>
                <Link to={"/about"}>About</Link>
              </div>
            </div>
            <div className="links"></div>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/users/:login" element={<User />} />
              <Route path="/repositories" element={<Repos />} />
              <Route path="/repos/:repo" element={<Repo />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/issues/:issue" element={<Issue />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </GithubProvider>
  );
}

export default App;
