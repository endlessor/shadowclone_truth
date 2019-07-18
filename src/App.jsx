import React from "react";

import "./App.scss";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

import PreVote from "./pages/Prevote";

function App() {
  return (
    <div className="App">
      <PreVote />
    </div>
  );
}

export default App;
