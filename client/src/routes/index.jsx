import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { Query, compose, withApollo } from "react-apollo";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AdminRoutes from "./admin";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PreVote from "../pages/Prevote";
import CandidateDetail from "../pages/CandidateDetail";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";
import Intro from "../pages/Intro";
import Final from "../pages/Final";

import { ProgressSpinner } from "../components";
import { AUTH_TOKEN, persistor } from "../config";
import { MeQuery } from "../queries";

import "./styles.scss";
import ScrollToTop from "./ScrollToTop";

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
  const logoutHandler = () => {
    persistor.pause();
    persistor.purge().then(() => {
      localStorage.removeItem(AUTH_TOKEN);
      persistor.resume();
      props.client.resetStore();
      props.history.push("/");
    });
  };
  return (
    <div className="layout-wrapper">
      <div className="layout-topbar">
        <div className="logo">
          <span>Indecision2020</span>
        </div>
        {localStorage.getItem(AUTH_TOKEN) && (
          <div className="topbar-menu">
            <div className="menu-button" onClick={logoutHandler}>
              Log out
            </div>
          </div>
        )}
      </div>
      <div id="layout-content">
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  timeout={600}
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
                      <PrivateRoute path="/admin" component={AdminRoutes} />
                      <PrivateRoute
                        path="/voter-reason/candidate/:id"
                        component={VoteReasoning}
                      />
                      <PrivateRoute path="/prevote" component={PreVote} />
                      <PrivateRoute path="/result" component={Results} />
                      <PrivateRoute path="/final" component={Final} />
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
      </div>
    </div>
  );
};

const AnimationRoutes = compose(
  withApollo,
  withRouter
)(Routes);

const MainRoute = () => {
  return (
    <Router>
      <ScrollToTop>
        <AnimationRoutes />
      </ScrollToTop>
    </Router>
  );
};

export default MainRoute;
