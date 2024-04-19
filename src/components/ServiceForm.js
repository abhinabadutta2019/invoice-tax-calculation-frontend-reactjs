import React, { useState } from "react";
import { addServiceToInvoice } from "../services/api";

const ServiceForm = ({ invoiceNumber, setServices }) => {
  const [serviceType, setServiceType] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxId, setTaxId] = useState("");

  const handleSubmitService = async (e) => {
    e.preventDefault();

    const service = {
      serviceType,
      sellingPrice: parseFloat(sellingPrice),
      discountPercentage: parseFloat(discountPercentage),
      tax: taxId,
    };

    try {
      const updatedInvoice = await addServiceToInvoice(invoiceNumber, service);
      setServices([...updatedInvoice.services]);

      // Clear service form fields
      setServiceType("");
      setSellingPrice(0);
      setDiscountPercentage(0);
      setTaxId("");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div>
      <h6>Add Services to Invoice</h6>

      <form onSubmit={handleSubmitService}>
        <input
          placeholder="Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
        />
        <input
          placeholder="Selling Price"
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          required
        />
        <input
          placeholder="Discount Percentage"
          type="number"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          required
        />
        <input
          placeholder="Tax ID"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          required
        />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default ServiceForm;
