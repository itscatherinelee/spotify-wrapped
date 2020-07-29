import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/">
          <LandingPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
