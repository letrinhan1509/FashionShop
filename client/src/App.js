//import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import { Layout} from "antd";
import Headerpage from './components/include/HeaderPage';
import { Content } from 'antd/lib/layout/layout';
import ProductDetail from "./container/Product-detail";
import Home from "./container/Home";
import Footer from "./components/include/Footer";
import Register from "./container/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './container/Login';

function App() {
  return (
      <Router>
        <Layout>
          <Headerpage />
          <Content className="content-wrapper">
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/ProductDetail">
                <ProductDetail />
            </Route>
            <Route path="/Register">
                <Register />
            </Route>
            <Route path="/Login">
                <Login />
            </Route>
          </Content>
          <Footer />
        </Layout>
      </Router>
  );
}

export default App;
