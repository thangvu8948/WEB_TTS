import logo from './logo.svg';
import './App.css';
import { MyNavBar } from './components/navbar';
import { Homepage } from './components/homepage';

function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <Homepage/>
    </div>
  );
}

export default App;
