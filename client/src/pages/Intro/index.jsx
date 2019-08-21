import React, { useState } from "react";
import { Button } from "primereact/button";
import First from "./First";
import Second from "./Second";
import "./Intro.style.scss";

const Intro = ({ history, match }) => {
  const [index, setIndex] = useState(0);

  const content = index === 0 ? <First /> : <Second />;
  const btnLabel = index === 0 ? "How does it work?" : "Prevote Now!";

  const handleClick = () => {
    if (index === 0) {
      setIndex(index + 1);
    } else if (index === 1) {
      history.push(`${match.url}/prevote`);
    }
  };

  return (
    <div className="p-col-12 p-sm-12 p-md-6 intro page">
      <div className="p-grid p-align-center">
        <div className="p-col-12 intro__header">
          <h2>
            <span className="pi pi-external-link" />
            Indecision 2020
          </h2>
        </div>
        <div className="p-col-12">{content}</div>
        <div className="p-col-12 intro__footer">
          <div className="p-fluid">
            <Button label={btnLabel} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
