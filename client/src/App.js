//import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import { Layout} from "antd";
import Header_page from './components/Header_page';
import Home from './components/Home';
function App() {
  return (
      <Layout>
        <Header_page/>
         <Home/>
      </Layout>
   
  );
}

export default App;
