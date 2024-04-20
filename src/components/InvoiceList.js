import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInvoices, deleteInvoice } from "../services/api";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getAllInvoices();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDeleteInvoice = async (id) => {
    try {
      await deleteInvoice(id);
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== id)
      );

      // Check if the deleted invoice is the current one in local storage and remove it
      const savedId = localStorage.getItem("_id");
      if (savedId === id) {
        localStorage.removeItem("_id");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleEditInvoice = (id) => {
    navigate(`/edit-invoice/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h6>All Invoices</h6>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Tax</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customerName}</td>
              <td>${invoice.totalDiscountAmount.toFixed(2)}</td>
              <td>${invoice.totalTaxAmount.toFixed(2)}</td>
              <td>${invoice.totalAmount.toFixed(2)}</td>
              <td>
                <button onClick={() => handleEditInvoice(invoice._id)}>
                  Edit / Details
                </button>
                <button onClick={() => handleDeleteInvoice(invoice._id)}>
                  Delete
                </button>
                {/* <button>View</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
