import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PreVote from "../pages/Prevote";
import VoteReasoning from "../pages/VoteReasoning";
import Results from "../pages/Results";

const MainRoute = () => (
  <Router>
    <Route path="/" exact component={PreVote} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/candidate/:id" component={VoteReasoning} />
    <Route path="/result" component={Results} />
  </Router>
);

export default MainRoute;
