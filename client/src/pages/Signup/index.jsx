import React, { useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { SignupMutation } from "../../queries/auth";
import { AUTH_TOKEN } from "../../config";
import { Card } from "primereact/card";

function Signup({ location }) {
  const [authInfo, setAuthInfo] = useState({ email: "", password: "" });
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  const signupSuccess = data => {
    const { token } = data.signup;
    localStorage.setItem(AUTH_TOKEN, token);
    setRedirectToReferer(true);
  };

  const handleInputChange = e => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value
    });
  };

  const { from } = { from: { pathname: "/intro" } };
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }

  return (
    <div className="p-sm-12 p-md-4">
      <Card title="Login">
        <Mutation
          mutation={SignupMutation}
          variables={authInfo}
          onCompleted={signupSuccess}
        >
          {mutation => (
            <form
              onSubmit={e => {
                e.preventDefault();
                mutation();
              }}
            >
              <div className="p-grid p-justify-center">
                <div className="p-col-8 p-fluid">
                  <span className="p-float-label">
                    <InputText
                      id="email"
                      name="email"
                      value={authInfo.email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="email">Email</label>
                  </span>
                </div>
                <div className="p-col-8 p-fluid">
                  <span className="p-float-label">
                    <Password
                      id="password"
                      name="password"
                      feedback={false}
                      value={authInfo.password}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                  </span>
                </div>
                <div className="p-grid p-col-8 p-justify-end">
                  <Button
                    className="p-button-raised"
                    label="Login"
                    type="submit"
                  />
                </div>
              </div>
            </form>
          )}
        </Mutation>
      </Card>
    </div>
  );
}

Signup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object
  })
};

export default Signup;
