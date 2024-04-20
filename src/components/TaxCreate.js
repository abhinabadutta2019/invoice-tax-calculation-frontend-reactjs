import React, { useState } from "react";
import { addTax, getAllTaxes } from "../services/api";
import AllTaxes from "./AllTaxes";

const TaxCreate = () => {
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const handleNewTaxAdded = async () => {
    try {
      const allTaxes = await getAllTaxes();
      return allTaxes;
    } catch (error) {
      console.error("Error fetching taxes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tax = {
        taxName,
        taxRate: parseFloat(taxRate),
      };

      await addTax(tax);
      setTaxName("");
      setTaxRate("");
      handleNewTaxAdded();
    } catch (error) {
      console.error("Error adding tax:", error);
    }
  };

  return (
    <div>
      <h6>Add Tax</h6>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tax Name"
          value={taxName}
          onChange={(e) => setTaxName(e.target.value)}
          required
        />
        <input
          placeholder="Tax Rate (%)"
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          required
        />
        <button type="submit">Add Tax</button>
      </form>

      {/* Display all taxes */}
      <AllTaxes onNewTaxAdded={handleNewTaxAdded} />
    </div>
  );
};

export default TaxCreate;
