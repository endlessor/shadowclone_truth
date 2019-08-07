import React from "react";
import { ProgressSpinner as Spinner } from "primereact/progressspinner";

function ProgressSpinner() {
  return (
    <Spinner
      style={{ width: "50px", height: "50px" }}
      strokeWidth="8"
      fill="#EEEEEE"
      animationDuration=".5s"
    />
  );
}

ProgressSpinner.propTypes = {};

export default ProgressSpinner;
