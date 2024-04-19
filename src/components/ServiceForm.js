import React, { useState, useEffect } from "react";
import { addServiceToInvoice, getInvoice } from "../services/api";

const ServiceForm = ({ _id, setServices }) => {
  const [serviceType, setServiceType] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxId, setTaxId] = useState("");
  const [invoiceServices, setInvoiceServices] = useState([]);

  useEffect(() => {
    const fetchInvoiceServices = async () => {
      try {
        const invoice = await getInvoice(_id);
        setInvoiceServices(invoice.services);
      } catch (error) {
        console.error("Error fetching invoice services:", error);
      }
    };

    fetchInvoiceServices();
  }, [_id]);

  const handleSubmitService = async (e) => {
    e.preventDefault();

    const service = {
      serviceType,
      sellingPrice: parseFloat(sellingPrice),
      discountPercentage: parseFloat(discountPercentage),
      tax: taxId,
    };

    try {
      const updatedInvoice = await addServiceToInvoice(_id, service);
      setServices([...updatedInvoice.services]);

      // Fetch and update the latest invoice data
      const updatedInvoiceData = await getInvoice(_id);
      setInvoiceServices(updatedInvoiceData.services);

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
      {invoiceServices.length > 0 && (
        <>
          <h6>Services in Invoice</h6>
          <ul>
            {invoiceServices.map((service, index) => (
              <li key={index}>
                <span>{service.serviceType}</span>-
                <span>Price - ${service.sellingPrice}</span> -
                <span>Discount- {service.discountPercentage}%</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {invoiceServices.length === 0 && (
        <h6>No services added to this invoice yet.</h6>
      )}

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