import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Router basename="admin">
      <Route exact path="/" component={Dashboard} />
    </Router>
  );
};

AdminRoutes.propTypes = {};

export default AdminRoutes;
