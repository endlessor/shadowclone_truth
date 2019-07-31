import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminRoutes from "./admin";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PreVote from "../pages/Prevote";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";
import { AUTH_TOKEN, IS_ADMIN } from "../config";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN);
  const isAdmin = localStorage.getItem(IS_ADMIN);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          props.location.pathname !== "/admin" && isAdmin ? (
            <Redirect to="/admin" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/prevote" component={PreVote} />
        <PrivateRoute path="/candidate/:id" component={VoteReasoning} />
        <PrivateRoute path="/result" component={Results} />
        <PrivateRoute path="/admin" component={AdminRoutes} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
