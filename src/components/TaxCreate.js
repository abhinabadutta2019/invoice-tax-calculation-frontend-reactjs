import React, { useState } from "react";
import { addTax, getAllTaxes } from "../services/api";
import AllTaxes from "./AllTaxes";
import Footer from "../shared/Footer";

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

    if (parseFloat(taxRate) > 100) {
      alert("Tax Rate should be less than or equal to 100");
      return;
    }

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
    <>
      <div className="container mt-5 pb-4">
        <h6 className="mb-4">Add Tax</h6>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Tax Name"
              value={taxName}
              onChange={(e) => setTaxName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Tax Rate (%)"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Tax
          </button>
        </form>

        {/* Display all taxes */}
        <AllTaxes onNewTaxAdded={handleNewTaxAdded} />
        <Footer />
      </div>
    </>
  );
};

export default TaxCreate;
