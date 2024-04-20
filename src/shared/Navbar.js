import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
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
    </nav>
  );
};

export default Navbar;
