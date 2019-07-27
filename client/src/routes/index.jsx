import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PreVote from "../pages/Prevote";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";
import { AUTH_TOKEN } from "../config";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const MainRoute = () => (
  <Router>
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <PrivateRoute path="/" exact component={PreVote} />
    <PrivateRoute path="/candidate/:id" component={VoteReasoning} />
    <PrivateRoute path="/result" component={Results} />
  </Router>
);

export default MainRoute;
