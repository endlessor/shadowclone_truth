import React from "react";
import { ProgressSpinner as Spinner } from "primereact/progressspinner";

function ProgressSpinner() {
  return (
    <Spinner
      style={{ width: "30px", height: "30px" }}
      strokeWidth="4"
      fill="#EEEEEE"
      animationDuration=".5s"
    />
  );
}

ProgressSpinner.propTypes = {};

export default ProgressSpinner;
