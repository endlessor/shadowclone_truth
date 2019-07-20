import React from "react";

import MainRoute from "./routes";

import "./App.scss";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  return (
    <div className="App">
      <MainRoute />
    </div>
  );
}

export default App;
