import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Layout } from "antd";
import { GithubProvider } from "./context/github/GithubContext";
import User from "./pages/User";

function App() {
  const { Header, Footer, Content } = Layout;
  return (
    <GithubProvider>
      <Router>
        <Layout>
          <Header>NAVBAR</Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Content>
          <Footer>FOOTER</Footer>
        </Layout>
      </Router>
    </GithubProvider>
  );
}

export default App;
