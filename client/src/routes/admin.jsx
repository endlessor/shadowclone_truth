import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "../pages/Admin/Dashboard";

const AdminRoutes = props => {
  let sidebar = null;
  let menuButton = null;

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  useEffect(() => {
    let menuDocumentClickListener = null;
    const isMenuButtonClicked = e => {
      return e.target === menuButton || menuButton.contains(e.target);
    };
    const bindMenuDocumentClickListener = () => {
      if (!menuDocumentClickListener) {
        menuDocumentClickListener = event => {
          if (!isMenuButtonClicked(event) && !sidebar.contains(event.target)) {
            setMobileMenuActive(false);
            unbindMenuDocumentClickListener();
          }
        };

        document.addEventListener("click", menuDocumentClickListener);
      }
    };

    const unbindMenuDocumentClickListener = () => {
      if (menuDocumentClickListener) {
        document.removeEventListener("click", menuDocumentClickListener);
        menuDocumentClickListener = null;
      }
    };
    if (mobileMenuActive) bindMenuDocumentClickListener();
    else unbindMenuDocumentClickListener();
  }, [mobileMenuActive, menuButton, sidebar]);

  const toggleMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const onMenuButtonClick = () => {
    toggleMenu();
  };

  return (
    <div className="layout-wrapper">
      <div className="layout-topbar">
        <span
          ref={el => (menuButton = el)}
          className="menu-button"
          tabIndex="0"
          onClick={onMenuButtonClick}
          // onKeyDown={this.onMenuButtonKeyDown}
        >
          <i className="pi pi-bars" />
        </span>
        <div className="logo">
          <span>Truth</span>
        </div>
      </div>
      <div id="layout-content">
        <Router basename="admin">
          <Route exact path="/" component={Dashboard} />
        </Router>
      </div>
    </div>
  );
};

AdminRoutes.propTypes = {};

export default AdminRoutes;
