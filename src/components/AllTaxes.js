// AllTaxes.js
import React, { useState, useEffect } from "react";
import { getAllTaxes } from "../services/api";

const AllTaxes = () => {
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
  }, []);

  return (
    <div>
      <h6>All Taxes</h6>
      <table>
        <thead>
          <tr>
            <th>Tax Name</th>
            <th>Tax Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax._id}>
              <td>{tax.taxName}</td>
              <td>{tax.taxRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTaxes;
