import React, { useState } from "react";
import { Button } from "primereact/button";
import First from "./First";
import Second from "./Second";
import "./Intro.style.scss";

const Intro = ({ history }) => {
  const [index, setIndex] = useState(0);

  const content = index === 0 ? <First /> : <Second />;
  const btnLabel = index === 0 ? "How does it work?" : "Prevote Now!";

  const handleClick = () => {
    if (index === 0) {
      setIndex(index + 1);
    } else if (index === 1) {
      history.push("/prevote");
    }
  };

  return (
    <div className="p-grid intro">
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
  );
};

export default Intro;
