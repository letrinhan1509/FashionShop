import logo from './logo.svg';
import './App.css';
import Allproduct from './components/All-Product';
import Navigation from './components/Navigation';
function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Allproduct></Allproduct>
    </div>
  );
}

export default App;
