import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { Query } from "react-apollo";
import { ProgressSpinner } from "primereact/progressspinner";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AdminRoutes from "./admin";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PreVote from "../pages/Prevote";
import CandidateDetail from "../pages/CandidateDetail";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";
import Intro from "../pages/Intro";
import { AUTH_TOKEN } from "../config";
import { MeQuery } from "../queries";

import "./styles.scss";

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

const getPathDepth = location => {
  let pathArr = (location || {}).pathname.split("/");
  pathArr = pathArr.filter(n => n !== "");
  return pathArr.length;
};

const Routes = props => {
  const [prevDepth] = useState(getPathDepth(props.location));

  return (
    <Route
      render={({ location }) => {
        console.log(location)
        console.log(getPathDepth(location), prevDepth)
        return (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={500}
              classNames="pageSlider"
              mountOnEnter={false}
              unmountOnExit={true}
            >
              <div
                className={
                  getPathDepth(location) - prevDepth > 0 ? "left" : "right"
                }
              >
                <Switch location={location}>
                  <PrivateRoute path="/" exact={null} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/intro" component={Intro} />
                  <PrivateRoute path="/voter-reason/candidate/:id" component={VoteReasoning} />
                  <PrivateRoute path="/result" component={Results} />
                  <PrivateRoute path="/admin" component={AdminRoutes} />
                  <PrivateRoute path="/prevote" component={PreVote} />
                  <PrivateRoute
                    path="/candidate/:id"
                    component={CandidateDetail}
                  />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        );
      }}
    />
  );
};

const AnimationRoutes = withRouter(Routes);

const MainRoute = () => {
  return (
    <Router>
      <AnimationRoutes />
    </Router>
  );
};

export default MainRoute;
