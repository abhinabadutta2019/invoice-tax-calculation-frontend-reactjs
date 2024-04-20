import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInvoices, deleteInvoice } from "../services/api";
import { downloadInvoicePdf } from "../services/api"; // Import the downloadInvoicePdf function

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

  const handleDownloadInvoice = async (id) => {
    try {
      await downloadInvoicePdf(id); // Call the downloadInvoicePdf function
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h6>All Invoices</h6>
      <table className="table table-bordered">
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
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditInvoice(invoice._id)}
                >
                  Edit / Details
                </button>
                <button
                  className="btn btn-success me-2" // Added success class
                  onClick={() => handleDownloadInvoice(invoice._id)} // Added handleDownloadInvoice function
                >
                  Download PDF
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteInvoice(invoice._id)}
                >
                  Delete
                </button>
                {/* <button className="btn btn-info">View</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
