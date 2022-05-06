import React from "react";
import "./style.css";

const StandardHeader = ({ children }) => {
  return React.createElement("header", {
    id: "standard-header"
  }, React.createElement("p", {
    id: "profiler-header"
  }, "Profiler"), children);
};

export default StandardHeader;
