import React, { useState, useEffect } from "react";
import { getAllTaxes, toggleTaxDisabled } from "../services/api";

const AllTaxes = ({ onNewTaxAdded }) => {
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const allTaxes = await getAllTaxes();
        setTaxes(allTaxes);
      } catch (error) {
        console.error("Error fetching taxes:", error);
      }
    };

    fetchTaxes();
  }, [onNewTaxAdded]);

  const handleToggleTax = async (id) => {
    try {
      const updatedTax = await toggleTaxDisabled(id);
      setTaxes((prevTaxes) =>
        prevTaxes.map((tax) =>
          tax._id === updatedTax._id
            ? { ...tax, disabled: updatedTax.disabled }
            : tax
        )
      );
    } catch (error) {
      console.error("Error toggling tax:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h6 className="mb-4">All Taxes</h6>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tax Name</th>
            <th>Tax Rate (%)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax._id}>
              <td>{tax.taxName}</td>
              <td>{tax.taxRate}%</td>
              <td>{tax.disabled ? "Disabled" : "Enabled"}</td>
              <td>
                <button
                  className={`btn ${
                    tax.disabled ? "btn-success" : "btn-danger"
                  }`}
                  onClick={() => handleToggleTax(tax._id)}
                >
                  {tax.disabled ? "Enable" : "Disable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTaxes;
