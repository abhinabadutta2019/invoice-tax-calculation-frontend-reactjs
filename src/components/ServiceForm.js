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
        if (_id && _id !== "null") {
          const invoice = await getInvoice(_id);
          setInvoiceServices(invoice.services);
        }
      } catch (error) {
        console.error("Error fetching invoice services:", error);
      }
    };

    const fetchTaxes = async () => {
      try {
        const taxesData = await getAllTaxes();
        setTaxes(taxesData.filter((tax) => !tax.disabled)); // Filter out disabled taxes
      } catch (error) {
        console.error("Error fetching taxes:", error);
      }
    };

    fetchInvoiceServices();
    fetchTaxes();
  }, [_id]);

  const handleSubmitService = async (e) => {
    e.preventDefault();

    if (discountPercentage > 100 || discountPercentage < 0) {
      alert("Discount Percentage should be between 0 and 100");
      return;
    }

    const service = {
      serviceType,
      sellingPrice: parseFloat(sellingPrice),
      discountPercentage: parseFloat(discountPercentage),
      tax: taxId,
    };

    try {
      const updatedInvoice = await addServiceToInvoice(_id, service);
      setServices([...updatedInvoice.services]);
      alert("Service added successfully!");

      // Fetch and update the latest invoice data
      if (_id && _id !== "null") {
        const updatedInvoiceData = await getInvoice(_id);
        setInvoiceServices(updatedInvoiceData.services);
        fetchInvoice();
      }

      // Clear service form fields
      setServiceType("");
      setSellingPrice(0);
      setDiscountPercentage(0);
      setTaxId("");
    } catch (error) {
      console.error("Error adding service:", error);
      alert(`Error adding service: ${error.message}`);
    }
  };

  const handleRemoveService = async (serviceId) => {
    try {
      const updatedInvoice = await removeServiceFromInvoice(_id, serviceId);
      setInvoiceServices(updatedInvoice.services);
      fetchInvoice();
      alert("Service removed successfully!");
    } catch (error) {
      console.error("Error removing service:", error);
      alert(`Error removing service: ${error.message}`);
    }
  };

  if (!_id || _id === "null") {
    return <div>{/* No Invoice Selected */}</div>;
  }

  return (
    <div className="container mt-4">
      {invoiceServices.length > 0 && (
        <>
          <h6>Services in Invoice</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Service Type</th>
                <th>Discount Percentage</th>
                <th>Discount Amount</th>
                <th>Tax Amount</th>
                <th>Selling Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.serviceType}</td>
                  <td>{service.discountPercentage}%</td>
                  <td>${service.discountAmount.toFixed(2)}</td>
                  <td>${service.taxAmount.toFixed(2)}</td>
                  <td>${service.finalPrice.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveService(service._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {invoiceServices.length === 0 && (
        <div className="p-3 mb-4 bg-light">
          <h6>No services added to this invoice yet.</h6>
        </div>
      )}
      <h6>Add Services to Invoice</h6>

      <form onSubmit={handleSubmitService}>
        <div className="mb-3">
          <label htmlFor="serviceType" className="form-label">
            Service Type:
          </label>
          <input
            id="serviceType"
            className="form-control"
            placeholder="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sellingPrice" className="form-label">
            Selling Price:
          </label>
          <input
            id="sellingPrice"
            className="form-control"
            placeholder="Selling Price"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discountPercentage" className="form-label">
            Discount Percentage:
          </label>
          <input
            id="discountPercentage"
            className="form-control"
            placeholder="Discount Percentage"
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taxId" className="form-label">
            Tax:
          </label>
          <select
            id="taxId"
            className="form-select"
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
        </div>
        <button type="submit" className="btn btn-primary">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
