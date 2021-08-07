import React, { Component } from "react";

const Navbar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a
        style={{ fontSize: "24px", fontWeight: "bold" }}
        className="navbar-brand"
        href="www.www.com"
      >
        Navbar{" "}
        <span className="badge badge-pill badge-secondary m-2">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default Navbar;
