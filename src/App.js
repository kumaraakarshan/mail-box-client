import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContextProvider } from "./Components/Context/LoginContext";
import Welcome from "./Components/Pages/Welcome";

import "./App.css";

import SignUp from "./Components/Pages/SignUp";
import SignIn from "./Components/Pages/SignIn";

function App() {
  return (
    <React.Fragment>
      <LoginContextProvider>
        {/* <Route path="*">
          <Redirect to="/signUp" />
        </Route> */}

        <Route path="/signUp">
          <SignUp />
        </Route>

        <Route path="/signIn">
          <SignIn />
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>
      </LoginContextProvider>
    </React.Fragment>
  );
}

export default App;
