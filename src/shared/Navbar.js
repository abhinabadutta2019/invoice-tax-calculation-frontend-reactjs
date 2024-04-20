import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <h1>
          <Link to="/">Invoicely</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">Create Invoice</Link>
          </li>
          <li>
            <Link to="/all-invoice">Invoice List</Link>
          </li>
          <li>
            <Link to="/add-tax">Tax</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
