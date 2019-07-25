import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PreVote from "../pages/Prevote";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";

const MainRoute = () => (
  <Router>
    <Route path="/" exact component={PreVote} />
    <Route path="/candidate/:id" component={VoteReasoning} />
    <Route path="/result" component={Results} />
  </Router>
);

export default MainRoute;
