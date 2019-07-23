import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PreVote from "../pages/Prevote";
import VoteReasoning from "../pages/VoteReasoning";

const MainRoute = () => (
  <Router>
    <Route path="/" exact component={PreVote} />
    <Route path="/candidate/:id" component={VoteReasoning} />
  </Router>
);

export default MainRoute;
