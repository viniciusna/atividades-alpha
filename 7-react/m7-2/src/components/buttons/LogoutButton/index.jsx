import "./style.css";
import React from "react";

function LogoutButton() {

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return React.createElement("button", {
    id: "logout-button",
    onClick: handleSubmit
  }, "Logout");
}

export default LogoutButton;
