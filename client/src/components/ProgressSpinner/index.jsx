import React from "react";
import { PulseLoader } from "react-spinners";

function ProgressSpinner() {
  return <PulseLoader sizeUnit="px" size={12} color={"#9B50B0"} />;
}

ProgressSpinner.propTypes = {};

export default ProgressSpinner;
