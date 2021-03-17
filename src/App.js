import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { MyNavBar } from "./components/navbar";
import { Homepage } from "./components/homepage";
import { Mos } from "./components/mos";
import { Tks } from "./components/tks";
import { NewHomepage } from "./components/newHomepage";
function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <Router>
        <Route exact path="/" component={NewHomepage} />
        <Route exact path="/eval" component={Mos} />
        <Route exact path="/tks" component={Tks} />
      </Router>
    </div>
  );
}

export default App;
