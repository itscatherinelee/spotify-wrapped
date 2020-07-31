import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "../Login/Login";
import LandingView from "../LandingView/LandingView";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/">
          <Login/>
        </Route>
        <Route exact path ="/landingPage">
          <LandingView/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;