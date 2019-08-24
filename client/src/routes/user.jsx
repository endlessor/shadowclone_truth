import React from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PreVote from "../pages/Prevote";
import CandidateDetail from "../pages/CandidateDetail";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";
import Final from "../pages/Final";
import Intro from "../pages/Intro";

import { usePrevious, getPathDepth } from "../utils";

const UserRoutes = props => {
  const prevDepth = usePrevious(getPathDepth(props.location));
  const baseName = props.match.url;

  return (
    <Route
      render={({ location }) => {
        const cn = getPathDepth(location) - prevDepth >= 0 ? "left" : "right";
        return (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={600}
              classNames="pageSlider"
              mountOnEnter={false}
              unmountOnExit={true}
            >
              <div className={cn}>
                <Switch>
                  <Route exact path={baseName} component={Intro} />
                  <Route path={`${baseName}/prevote`} component={PreVote} />
                  <Route
                    path={`${baseName}/voter-reason/candidate/:id`}
                    component={VoteReasoning}
                  />
                  <Route path={`${baseName}/vote/result`} component={Results} />
                  <Route path={`${baseName}/final`} component={Final} />
                  <Route
                    path={`${baseName}/candidate/:id`}
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

UserRoutes.propTypes = {};

export default UserRoutes;
