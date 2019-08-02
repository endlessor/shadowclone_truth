import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Query } from "react-apollo";
import { ProgressSpinner } from "primereact/progressspinner";

import AdminRoutes from "./admin";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PreVote from "../pages/Prevote";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";
import Intro from "../pages/Intro";
import { AUTH_TOKEN } from "../config";
import { MeQuery } from "../queries";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN);
  return (
    <Query query={MeQuery}>
      {({ loading, error, data }) => {
        if (loading) return <ProgressSpinner />;
        return (
          <Route
            {...rest}
            render={props => {
              if (isAuthenticated) {
                if (!data.me.isAdmin) {
                  if (props.location.pathname === "/admin")
                    return <Redirect to="/prevote" />;
                  return Component ? (
                    <Component {...props} />
                  ) : (
                    <Redirect to="/prevote" />
                  );
                } else {
                  return props.location.pathname !== "/admin" ? (
                    <Redirect to="/admin" />
                  ) : (
                    <Component {...props} />
                  );
                }
              } else {
                return (
                  <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                  />
                );
              }
            }}
          />
        );
      }}
    </Query>
  );
};

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact={null} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/intro" component={Intro} />
        <PrivateRoute path="/prevote" component={PreVote} />
        <PrivateRoute path="/candidate/:id" component={VoteReasoning} />
        <PrivateRoute path="/result" component={Results} />
        <PrivateRoute path="/admin" component={AdminRoutes} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
