import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <h1 className="navbar-brand">
          <Link to="/">📇Invoicely</Link>
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/all-invoice" className="nav-link">
                Invoice List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-tax" className="nav-link">
                Tax
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Create Invoice
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
