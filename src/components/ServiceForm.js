import React, { useState, useEffect } from "react";
import {
  addServiceToInvoice,
  getInvoice,
  removeServiceFromInvoice,
  getAllTaxes,
} from "../services/api";

const ServiceForm = ({ _id, setServices, fetchInvoice }) => {
  const [serviceType, setServiceType] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxId, setTaxId] = useState("");
  const [invoiceServices, setInvoiceServices] = useState([]);
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    const fetchInvoiceServices = async () => {
      try {
        const invoice = await getInvoice(_id);
        setInvoiceServices(invoice.services);
      } catch (error) {
        console.error("Error fetching invoice services:", error);
      }
    };

    const fetchTaxes = async () => {
      try {
        const taxesData = await getAllTaxes();
        setTaxes(taxesData);
      } catch (error) {
        console.error("Error fetching taxes:", error);
      }
    };

    fetchInvoiceServices();
    fetchTaxes();
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
      fetchInvoice();

      // Clear service form fields
      setServiceType("");
      setSellingPrice(0);
      setDiscountPercentage(0);
      setTaxId("");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleRemoveService = async (serviceId) => {
    try {
      const updatedInvoice = await removeServiceFromInvoice(_id, serviceId);
      setInvoiceServices(updatedInvoice.services);
      fetchInvoice();
    } catch (error) {
      console.error("Error removing service:", error);
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
                <button onClick={() => handleRemoveService(service._id)}>
                  Remove
                </button>
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
        <select
          placeholder="Tax"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          required
        >
          <option value="">Select Tax</option>
          {taxes.map((tax, index) => (
            <option key={index} value={tax._id}>
              {tax.taxName} - {tax.taxRate}%
            </option>
          ))}
        </select>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default ServiceForm;
