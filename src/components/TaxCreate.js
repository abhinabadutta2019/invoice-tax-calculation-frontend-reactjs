import React, { useState } from "react";
import { addTax } from "../services/api";

const TaxCreate = () => {
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");

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
    </div>
  );
};

export default TaxCreate;
