import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./component/LogInPage";
import NavBar from "./component/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={NavBar} />
        <Route path="/" component={LoginPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
